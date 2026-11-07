export function calculate(input) {
    const { price, entry, rent, vacancy, costs, growth, rentGrowth, years, exit } = input;
    const values = [price, entry, rent, vacancy, costs, growth, rentGrowth, years, exit];
    if (values.some(v => !Number.isFinite(v)) || price <= 0 || years < 1 || years > 30 || !Number.isInteger(years) || entry < 0 || entry > 30 || rent < 0 || rent > 10000000 || vacancy < 0 || vacancy > 100 || costs < 0 || costs > 10000000 || growth < -30 || growth > 30 || rentGrowth < -30 || rentGrowth > 30 || exit < 0 || exit > 30) {
      throw new Error('Enter valid amounts. Hold 1–30 whole years; vacancy 0–100%; appreciation and rent growth −30% to 30%; entry and exit costs 0–30%.');
    }
    const acquisition = price * (1 + entry / 100);
    const firstNetRent = rent * 12 * (1 - vacancy / 100) - costs;
    let totalRent = 0;
    const series = [{ year: 0, value: acquisition, saleValue: price, totalRent: 0 }];
    for (let year = 1; year <= years; year++) {
      // Fixed nominal owner costs; collected rent grows annually. No reinvestment assumed.
      totalRent += rent * 12 * Math.pow(1 + rentGrowth / 100, year - 1) * (1 - vacancy / 100) - costs;
      const saleValue = price * Math.pow(1 + growth / 100, year) * (1 - exit / 100);
      series.push({ year, value: saleValue + totalRent, saleValue, totalRent });
    }
    const terminal = series[series.length - 1].value;
    return { acquisition, firstNetRent, totalRent, terminal, profit: terminal - acquisition,
      grossYield: rent * 12 / price * 100, netYield: firstNetRent / acquisition * 100,
      cagr: terminal > 0 ? (Math.pow(terminal / acquisition, 1 / years) - 1) * 100 : null, series };
  }
