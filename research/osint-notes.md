# Source notes and boundaries

Research snapshot: 7 November 2026. Data in `osint.json` is mirrored as focused JSON and CSV under `data/`. No claim represents the entire market or replaces a live authority record.

## Population and economy

Population is an enumeration for the **whole Udupi district**, not city, town, municipal limit or the Udupi–Manipal–Malpe triad. The 2001 count is obtained from the [2001 District Census Handbook](https://censusindia.gov.in/nada/index.php/catalog/43808/download/47511/DH_29_2001_UDU.pdf) (literate plus illiterate district total); 2011 is Census Primary Census Abstract district total, accessible through the [Census population finder](https://censusindia.gov.in/census.website/en/data/population-finder). No official district projection was verified and none is presented.

District GDDP is assembled from the Government of Karnataka Economic Surveys (2019–20, 2021–22, 2022–23, 2023–24) and NABARD’s 2023–24 Udupi credit plan (2018–19). Values are whole-district INR crore. The 2019–20 source is in lakh and divided by 100. Constant price series uses 2011–12 prices; current price series includes price changes. Later entries are provisional; survey vintages can be revised. Missing 2020–21 is not zero. Per capita net domestic product uses official population estimates and is neither average salary nor household income. Do not draw conclusions about prices or growth from incomparable price bases or infer triad GDP.

MAHE’s 2024 town-level statement is an institutional demand proxy, not a rental or housing count. Its undated multi-campus figure covers more locations and must not be presented as a Manipal time series.

## Developer records

A registration number identifies a specific project, not a clean bill of health for its promoter. Statuses come from dated developer statements, historical legislative records or third-party reproductions, not a live authority search. Company history is marked as unverified unless specifically attributed. A review-page link gives a reader a place to inspect material; it is not a verified review score, endorsement or consensus. Recheck project registration, extension, construction, title and occupancy directly at [Karnataka RERA](https://rera.karnataka.gov.in/).

One material ambiguity was excluded from the project roster: Sai Radha Township is marketed in Manipal under registration `PRM/KA/RERA/1273/318/PR/300124/006597`, but [a RERA-data mirror](https://rera.watch/projects/11682-sai-radha-township) gives a conflicting Padubettu/Kaup project address. Resolve the authority record before associating that ID and locality. Third-party data can contain mismatches; Royal Embassy's mirror has inconsistent district/progress fields, and Grasslands Lakeside's proposed completion differs between listing portals.

## Night-time lights

The verified NASA GIBS `VIIRS_Black_Marble` EPSG:3857 service returned a real PNG for the z8 tile covering the triad. It supports fixed composites for 2012 and 2016 and maximum native zoom 8. It is a full rendered map, not a transparent layer or a current measurement. NASA’s [VNP46A4](https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/VNP46A4) is a separate annual 15-arc-second scientific product; no local raster has been downloaded, quality filtered or summarized here, and latest available year was not verified. Earthdata authentication is needed for acquisition. Local footfall, occupancy, rentals and year-on-year change cannot be inferred from this basemap. The coast, fishing vessels, roads, atmospheric effects and coarse pixels complicate interpretation.

## Modelled local population: WorldPop

The optional WorldPop Global2 R2025A data layer is a distinct series from the district Census counts. On 7 November 2026 the WorldPop v3 trend API returned 2015–2025 population estimates for the exact rectangle 74.65–74.85°E by 13.28–13.39°N (263.6863 km²). The request and WGS84 geometry are saved with every returned annual row in `data/macro/worldpop-analysis-box.json`; a separate 2020 population endpoint request returned the same 539,166.21 as the trend endpoint. The 2025 output is 554,575.41 modelled people. Display rounded values with a clear “model estimate; analysis box” label. This rectangle includes settlements beyond Udupi–Manipal–Malpe and sea, and is not a municipal or triad population boundary.

WorldPop describes Global2 as a spatial model based on census, official estimates and other inputs, with interpolations and projections and 100 m grids. National totals align to UN population estimates. The numerical output is not a headcount and its decimals are not accuracy; the smooth annual values do not establish observed local change. See the [WorldPop release statement](https://data.worldpop.org/repo/prj/Global_2015_2030/R2025A/doc/Global2_Release_Statement_R2025A_v1.pdf).

## Review evidence

Ratings are search-indexed snapshots viewed on 7 November 2026 and may be stale. Justdial explicitly describes its figures as a rating index across the web, not unique verified purchasers. The scopes are developer offices except for the separately labelled Prince Palace project, so none is a rating of another project. A small sample, duplicate or non-resident reviews, platform aggregation and unrelated service experiences can distort ratings. No reliable score was found for several companies. Housing.com reported no review to show for Royal Embassy; that is not evidence of good or bad performance. Any quoted or paraphrased individual experience is identified as a reviewer's account, not an established fact. For Mandavi, a [2016 SEAC agenda](https://environmentclearance.nic.in/writereaddata/FormB/Agenda/16062016VW16GVQRagenda_for_164thSEAC_meeting.pdf) connects the named Mandavi Real Estate Developers with Mandavi Palace's address and Prince Palace; the [developer's portfolio](https://mandavibuilders.com/completed-projects-residentail/) also lists that project. A separate aggregator's Google-sourced project score is not a live Google verification.
