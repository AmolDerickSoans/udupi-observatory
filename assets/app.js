/* Coastal Ledger: local, dependency-free interactions and transparent scenario math. */
(() => {
  'use strict';
  function calculate(input) {
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
  globalThis.CoastalLedger = { calculate };
  if (typeof module !== 'undefined') module.exports = { calculate };
  if (typeof document === 'undefined') return;
  const D = globalThis.LEDGER_DATA || { listings: [], sources: [] };
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const number = n => Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  const money = n => n < 0 ? '−' + money(-n) : n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + 'Cr' : n >= 100000 ? '₹' + (n / 100000).toFixed(1) + 'L' : '₹' + number(n);
  const pct = n => n === null ? 'N/A' : n.toFixed(1) + '%';

  const toggle = $('#menu-toggle'), rail = $('#rail');
  if (toggle && rail) {
    const mobile = window.matchMedia('(max-width:700px)');
    const syncRail = () => { rail.inert = mobile.matches && !rail.classList.contains('is-open'); };
    mobile.addEventListener('change', syncRail);
    syncRail();
    toggle.addEventListener('click', () => {
      const open = rail.classList.toggle('is-open');
      syncRail();
      toggle.setAttribute('aria-expanded', String(open));
      if (open) $('nav a', rail).focus();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { rail.classList.remove('is-open'); syncRail(); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
    document.addEventListener('click', e => { if (!rail.contains(e.target) && !toggle.contains(e.target)) { rail.classList.remove('is-open'); syncRail(); toggle.setAttribute('aria-expanded', 'false'); } });
    // Return focus to the menu trigger when tabbing out of the mobile navigation.
    rail.addEventListener('focusout', e => { if (mobile.matches && !rail.contains(e.relatedTarget)) { rail.classList.remove('is-open'); syncRail(); toggle.setAttribute('aria-expanded', 'false'); } });
  }
  $$('.print-button').forEach(b => b.addEventListener('click', () => window.print()));

  const profiles = {
    Manipal: { title: 'Manipal', sub: 'The education & healthcare engine', text: 'Recurring academic and clinical activity creates several tenant pools. Price the walk, furnishing and building operations separately; university scale alone does not establish a flat’s occupancy.', anchor: 'MAHE + Kasturba', question: 'Who is your repeat tenant?', driver: 'Students, staff, clinical visitors', friction: 'Academic turnover & supply', facts: [['Demand check', 'Term dates + tenant roster'], ['Property check', 'Water, lift + association'], ['Rent check', 'Achieved leases, not ads'], ['Exit check', 'Resale age + furnishing']], insights: [['A rental market within a rental market', 'A shared student apartment, faculty family home and clinical visitor stay have different lease lengths, fit-outs and management costs.'], ['The walking premium must be earned', 'Inspect the actual route after dark and in the monsoon. Campus proximity on a listing is a claim to verify.'], ['Separate resale from future supply', 'An apartment with a distant possession date has delivery risk and no current rent. Do not capitalize an existing-building rent into its headline yield.']] },
    Udupi: { title: 'Udupi', sub: 'The town economy', text: 'The family-home and services market rewards access to established daily needs. Town-wide averages blur meaningful differences in road width, parking, age, access and usable area.', anchor: 'Civic + services economy', question: 'Does the building work every day?', driver: 'Families, services, local trade', friction: 'Street-level access & parking', facts: [['Demand check', 'Family budgets + commute'], ['Property check', 'OC, parking + drainage'], ['Rent check', 'Like-for-like area basis'], ['Exit check', 'Comparable completed sales']], insights: [['The street outranks the locality label', 'Commercial visibility and access can change over a few doors. Count footfall and loading access at trading hours.'], ['Usable area is a price variable', 'Normalize carpet and built-up area before comparing ₹/sq ft. A lower advertised rate can mask a less efficient floor plan.'], ['Family demand rewards maintenance', 'Lift reliability, water, association collections and monsoon drainage belong in the underwriting, alongside location.']] },
    Malpe: { title: 'Malpe', sub: 'The coastal option', text: 'Beach access is an amenity, not a development approval. The investment case begins with lawful land use, access and parcel-specific coastal clearance, then tests seasonal operating cash flow.', anchor: 'Working coast + visitors', question: 'What can this parcel legally become?', driver: 'Local households + visitor demand', friction: 'CRZ, seasonality + execution', facts: [['Demand check', 'Month-by-month bookings'], ['Property check', 'Survey + approved CZMP'], ['Rent check', 'Net of host operations'], ['Exit check', 'Buyer pool + buildability']], insights: [['Scarcity is conditional', 'A coastal plot may be scarce yet constrained. Value the lawful permitted use, not the image of a future resort.'], ['Tourism is an operating business', 'Budget commissions, housekeeping, staff, maintenance, monsoon downtime and permissions before comparing with a residential lease.'], ['The transaction unit matters', 'One cent is 435.6 sq ft. Convert the quote and deduct access or unusable portions before comparing the effective site cost.']] }
  };
  function setProfile(name) {
    const p = profiles[name]; if (!p) return;
    const root = $('#market-profile');
    if (root) root.innerHTML = `<div><div class="eyebrow">${esc(p.sub)}</div><h2 class="profile-name">${name}</h2><p class="muted">${p.text}</p><div class="profile-facts">${p.facts.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join('')}</div></div><div class="panel tint"><h3>${p.question}</h3><ul class="feature-list">${p.insights.map(([a,b])=>`<li><strong>${a}</strong><p>${b}</p></li>`).join('')}</ul><a class="text-link" href="dashboard.html?market=${name}">Inspect ${name} listing samples →</a></div>`;
    $$('.market-tabs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.market === name)));
  }
  $$('.market-tabs button').forEach(b => b.addEventListener('click', () => setProfile(b.dataset.market)));
  if ($('#market-profile')) setProfile(new URLSearchParams(location.search).get('market') || 'Manipal');
  function setMap(name) {
    const detail = $('#map-detail'); const p = profiles[name];
    if (detail && p) detail.innerHTML = `<h3>${name} <span class="badge">${p.anchor}</span></h3><p>${p.driver}. Main underwriting friction: ${p.friction.toLowerCase()}. <a href="markets.html?market=${name}">Open market brief →</a></p>`;
    $$('.map .location').forEach(n => n.setAttribute('aria-pressed', String(n.dataset.place === name)));
  }
  $$('.map .location').forEach(n => {
    n.addEventListener('click', () => setMap(n.dataset.place));
    n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMap(n.dataset.place); } });
  });
  if ($('#map-detail')) setMap('Manipal');
  $$('[data-layer]').forEach(b => b.addEventListener('click', () => {
    $$('[data-layer]').forEach(n => n.setAttribute('aria-pressed', String(n === b)));
    $$('.map [data-overlay]').forEach(n => { n.style.display = n.dataset.overlay === b.dataset.layer ? '' : 'none'; });
    const captions = { demand: 'Demand anchors are schematic: campus/clinical activity, town services and coastal visitor activity. No occupancy or demand volume is inferred.', access: 'Connections show the relationship between the three markets, not surveyed road alignments or travel times. Verify routes, access rights and monsoon conditions on site.', constraints: 'Coastal diligence priority is a qualitative flag. The shaded area is NOT a CRZ line, flood map or legal boundary. Obtain parcel-specific approved mapping.' };
    if ($('#layer-caption')) $('#layer-caption').textContent = captions[b.dataset.layer];
  }));

  let visibleListings = [];
  function renderListings() {
    const body = $('#listing-body'); if (!body) return;
    const place = $('#filter-market').value, asset = $('#filter-asset').value, deal = $('#filter-deal').value;
    visibleListings = D.listings.filter(x => (place === 'All' || x.market === place) && (asset === 'All' || x.asset === asset) && (deal === 'All' || x.deal === deal));
    body.innerHTML = visibleListings.map(x => `<tr><td><strong>${esc(x.market)}</strong><small>${esc(x.locality)}</small></td><td>${esc(x.asset)}<small>${esc(x.description)}</small></td><td><strong>${esc(x.askDisplay)}</strong><small>${esc(x.unitDisplay)}</small></td><td>${esc(x.areaDisplay)}<small>${esc(x.areaBasis)}</small></td><td><span class="badge ${x.caution ? 'caution' : 'observed'}">${x.caution ? 'Check conflict' : 'Asking only'}</span><small>${esc(x.note)}</small></td><td><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.sourceLabel)} ↗</a><small>${esc(x.listingDate || 'Listing date unavailable')}<br>Reviewed 07 Nov 2026</small></td></tr>`).join('');
    if (!visibleListings.length) body.innerHTML = '<tr><td colspan="6" class="empty">No sourced sample in this combination. A missing sample does not imply no market.</td></tr>';
    $('#listing-count').textContent = `${visibleListings.length} sourced listing${visibleListings.length === 1 ? '' : 's'} • unweighted, non-random sample`;
    renderSampleChart(visibleListings);
  }
  function renderSampleChart(listings) {
    const root = $('#sample-chart'); if (!root) return;
    const points = listings.filter(x => x.deal === 'Sale' && x.asset === 'Apartment' && x.pricePerSqft > 0 && !x.caution);
    if (!points.length) { root.innerHTML = '<p class="empty">No comparable apartment sale sample in this filter. Change the filters to view asking rates.</p>'; return; }
    const h = points.length * 43 + 55, max = Math.max(...points.map(x => x.pricePerSqft)) * 1.2;
    root.innerHTML = `<svg class="chart" viewBox="0 0 620 ${h}" role="img" aria-label="Individual apartment sale asking rates in rupees per square foot; no market median">${[0, .25, .5, .75, 1].map(f=>`<line class="gridline" x1="155" x2="${155 + f*370}" y1="15" y2="${h-35}" opacity="${f===0?1:0}"/><line class="gridline" x1="${155+f*370}" x2="${155+f*370}" y1="15" y2="${h-35}"/><text x="${155+f*370}" y="${h-12}" text-anchor="middle">${number(max*f)}</text>`).join('')}${points.map((p,i)=>`<text x="145" y="${35+i*43}" text-anchor="end">${esc(p.market)} · ${esc(p.shortLabel || p.id)}</text><rect x="155" y="${20+i*43}" width="${p.pricePerSqft/max*370}" height="22" rx="2" fill="${p.market==='Manipal'?'#426d50':'#ad6e4f'}"/><text x="${165+p.pricePerSqft/max*370}" y="${35+i*43}">${number(p.pricePerSqft)}</text>`).join('')}</svg>`;
  }
  if ($('#listing-body')) {
    const selected = new URLSearchParams(location.search).get('market');
    if (profiles[selected]) $('#filter-market').value = selected;
    $$('.listing-filter').forEach(el => el.addEventListener('change', renderListings));
    renderListings();
    $('#export-listings').addEventListener('click', () => {
      const cols = ['id','market','locality','asset','deal','askDisplay','unitDisplay','areaDisplay','areaBasis','note','url','listingDate','reviewedDate','sourceLabel','evidenceType','caution'];
      const quote = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
      const csv = '\uFEFF' + [cols.join(','), ...visibleListings.map(x => cols.map(k => quote(x[k])).join(','))].join('\r\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      const a = document.createElement('a'); a.href = url; a.download = 'coastal-ledger-listing-sample.csv'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    });
  }

  function lineChart(root, datasets, label, years) {
    const all = datasets.flatMap(d => d.values), low = Math.min(...all), high = Math.max(...all), padding = Math.max((high-low)*.12, Math.abs(high)*.05, 1), min = low - padding, max = high + padding;
    const x = i => 55 + i / Math.max(1,years) * 495, y = v => 230 - (v-min) / (max-min || 1) * 195;
    root.innerHTML = `<svg class="chart" viewBox="0 0 590 270" role="img" aria-label="${esc(label)}">${[0,.25,.5,.75,1].map(f=>`<line class="gridline" x1="55" x2="550" y1="${230-f*195}" y2="${230-f*195}"/><text x="45" y="${234-f*195}" text-anchor="end">${number(min+(max-min)*f)}</text>`).join('')}${datasets.map(d=>`<polyline points="${d.values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" stroke="${d.color}" fill="none" stroke-width="2.5" ${d.dash?'stroke-dasharray="5 4"':''}/>`).join('')}${Array.from({length:years+1},(_,i)=>i).filter(i=>i===0||i===years||i%Math.ceil(years/5)===0).map(i=>`<text x="${x(i)}" y="252" text-anchor="middle">${i===0?'Today':'Y'+i}</text>`).join('')}</svg>`;
  }
  function calculatorInput() {
    return Object.fromEntries(['price','entry','rent','vacancy','costs','growth','rentGrowth','years','exit'].map(k=>[k,Number($('#calc-'+k).value) * (k === 'price' ? 100000 : 1)]));
  }
  function renderCalculator() {
    if (!$('#calculator')) return;
    const root = $('#calculator-result');
    try {
      const input = calculatorInput(), r = calculate(input);
      $('#calc-error').textContent = '';
      root.innerHTML = `<span class="badge model">Illustrative • unlevered • pre-tax</span><div class="result-label" style="margin-top:20px">Year-one net rental yield on acquisition cash</div><strong class="result-primary">${pct(r.netYield)}</strong><div class="small muted">${money(r.firstNetRent)} net rent / ${money(r.acquisition)} all-in entry</div><div class="result-pair"><div><strong>${pct(r.grossYield)}</strong><span>Gross yield on purchase price</span></div><div><strong>${pct(r.cagr)}</strong><span>Annualized terminal wealth • ${input.years} years</span></div><div><strong>${money(r.totalRent)}</strong><span>Cumulative net rent</span></div><div><strong>${money(r.profit)}</strong><span>Total nominal gain after selling costs</span></div></div><div id="return-chart"></div><div class="chart-caption">Terminal wealth in ₹ lakh = net sale proceeds + accumulated net rent. Rent held as cash; no reinvestment. This annualized wealth measure is not cash-flow IRR.</div><div class="formula" style="margin-top:15px">Entry = price × (1 + entry cost %)<br>Net rent = rent × 12 × (1 − vacancy %) − owner costs<br>Sale = price × (1 + appreciation %) ^ years × (1 − exit %)<br>Annualized wealth = (terminal wealth / entry) ^ (1 / years) − 1</div>`;
      lineChart($('#return-chart'),[{values:r.series.map(x=>x.value/100000),color:'#315d44'}], 'Modeled wealth in lakh rupees over holding period', input.years);
      $('#calculator-assumptions').textContent = `Assumptions: ${input.growth}% annual price change; ${input.rentGrowth}% annual rent change; ${input.vacancy}% vacancy; fixed annual owner costs ${money(input.costs)}; ${input.entry}% entry and ${input.exit}% exit friction. No debt, tax, inflation, major capex or plot construction costs included.`;
    } catch (error) {
      $('#calc-error').textContent = error.message;
      root.innerHTML = '<p class="empty">Update the invalid inputs to calculate a result.</p>';
      $('#calculator-assumptions').textContent = '';
    }
  }
  const presets = {
    apartment: { price:60,entry:8,rent:20000,vacancy:10,costs:30000,growth:4,rentGrowth:3,years:7,exit:2 },
    plot: { price:50,entry:8,rent:0,vacancy:0,costs:15000,growth:4,rentGrowth:0,years:7,exit:2 },
    commercial: { price:80,entry:8,rent:35000,vacancy:15,costs:45000,growth:3,rentGrowth:3,years:7,exit:2 }
  };
  if ($('#calculator')) {
    $$('#calculator input').forEach(el=>el.addEventListener('input',renderCalculator));
    $('#asset-preset').addEventListener('change', () => { const p=presets[$('#asset-preset').value]; Object.entries(p).forEach(([k,v])=>$('#calc-'+k).value=v); renderCalculator(); });
    renderCalculator();
  }
  function renderScenario(name = 'base') {
    const root = $('#scenario-chart'); if (!root) return;
    const data = { downside:{ rates:[-2,-1,-1], title:'Liquidity and execution stress', copy:'A modeled drawdown, not a prediction: slower resale, weak realized rents and persistent carrying costs. Negative price paths can coexist with positive quoted asks.' }, base:{ rates:[4,4,3], title:'Underwrite the existing economy', copy:'A deliberately assumed path based on ordinary demand, not on an airport or metro opening. These are sensitivity inputs, not estimates of the local market’s future growth.' }, optionality:{ rates:[6,6,5], title:'Test a catalyst; do not prepay it', copy:'An assumed higher-growth path if independently verified access and demand improve. No opening date, project probability or parcel-level benefit is embedded.' } }[name];
    const colors=['#315d44','#aa573b','#8e9d6c'];
    const names=['Apartment','Plot / land only','Commercial'];
    lineChart(root,data.rates.map((r,i)=>({values:Array.from({length:8},(_,y)=>100*Math.pow(1+r/100,y)),color:colors[i],dash:true})),`Illustrative price paths indexed to 100; ${name} scenario`,7);
    $('#scenario-title').textContent=data.title; $('#scenario-copy').textContent=data.copy;
    $('#scenario-rates').innerHTML=names.map((n,i)=>`<tr><td>${n}</td><td>${data.rates[i]}% / year</td><td>${(100*Math.pow(1+data.rates[i]/100,7)).toFixed(1)}</td></tr>`).join('');
    $$('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===name)));
  }
  $$('[data-scenario]').forEach(b=>b.addEventListener('click',()=>renderScenario(b.dataset.scenario)));
  if ($('#scenario-chart')) renderScenario();
  const checklist = $$('.checklist input');
  function updateChecks() { if($('#check-status')) $('#check-status').textContent = `${checklist.filter(x=>x.checked).length} of ${checklist.length} diligence steps checked in this session. Checks are not proof of compliance.`; }
  checklist.forEach(x=>x.addEventListener('change',updateChecks)); updateChecks();
})();
