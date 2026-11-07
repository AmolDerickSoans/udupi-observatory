# Coastal Ledger — development chronicle

This record documents the work requested on 7 November 2026: build a polished, useful real estate intelligence website for **Udupi, Manipal, and Malpe**, publish its source on GitHub, and host it on GitHub Pages. Entries describe observed work; a plan is not treated as a completed result.

## Impeccable refinement — 7 November 2026

The user requested an Impeccable pass with Terra to reduce visual clutter throughout the site. The team retained the dark, low-glare workspace and its real map, source distinctions and acquisition behavior. Typography and controls became more legible; navigation and panels became quieter; market records gained labelled mobile rows and explicit inspect/back navigation. The acquisition register now leads to separate capture, brief and intake tabs. The retained research briefs use local IBM Plex Sans, simpler headings and navigation, and the same photograph and research data.

In one bounded visual pass, the lead observed a 943 × 635 native viewport and a 390 × 844 child viewport in a responsive browser harness (the browser's viewport override did not take effect). The short desktop map revealed a legend covering basemap controls; a corrective CSS batch moved the legend and constrained the panel. On mobile, all six routes fit without horizontal document overflow; the health filter showed 37 places, keyboard inspect/back worked, three charts rendered with the ₹40,675 crore constant GDP value, and the Mandavi dossier → save → CRM → Diligence flow worked. Add property opened capture, and the public-intake deep link opened its intended tab with owner disclosure collapsed. The single confirmation pass then showed no horizontal overflow across all six routes at a 1440 × 1000 CSS child viewport; the evidence inspector was 340px within a 1166px parent. At the short 943px native viewport the map controls and legend were clear, and roads, coast and heatmap rendered. The latest 390 × 844 phone register fit its 382px client width, and the workspace title was 24px with 28.8px line height. A 901px retained-brief view also fit, with the local font and reading hierarchy visible. These are lead-reported observations of tested paths, not accessibility certification or user acceptance.

The build, eight tests, 11-document HTML check, OSINT check and diff check passed. Sampled contrast ratios were 15.87 for body, 8.63 secondary, 6.61 subtle, 9.60 primary, 7.89 placeholder and 9.20 map text. A manual detector reported 269 mostly raw-value advisories; the four flagged accent borders were removed, without claiming a clean scan. A stale-asset import error during a preview rebuild recovered on reload; an old harness observer log was not a product error, and a pristine console is not claimed. The refinement was published at commit `c034f639aad0d403d7f354c774bf367fc33cc373`; [GitHub Actions run 42399116353](https://github.com/AmolDerickSoans/udupi-observatory/actions/runs/42399116353) succeeded for build and deployment. The lead observed the updated [live site](https://amoldericksoans.github.io/udupi-observatory/) with all 471 map features, the revised navigation and Add property action, and the Acquisition desk Register empty state with capture and import actions. The live browser error log was empty for the tested map and acquisition paths. The live screenshot exposed a separate map-key overlap with native zoom controls on short desktop screens. The key now reserves 76px on the right for those controls. Earlier deployment observations below refer to their stated version; user acceptance is not assumed.

## Version 2 — independent work record, 7 November 2026

Following the rejection, the lead rebuilt the interface as a Vite application. The revision has a geographic explorer, filterable asking evidence, economic and modelled-population charts, developer dossiers, research sources and an acquisition desk. The current observations and open checks below supersede the historical status statements in the baseline log. This is a development record, not user acceptance.

### Pass 1: content and evidence

The research agent compiled five Udupi district GDDP observations (2018–19, 2019–20, 2021–22 through 2023–24), with FY 2020–21 deliberately absent; the 2019–20 source's lakh figures are divided by 100 to express crore. These are district estimates from differing publication vintages, not triad GDP. Census anchors cover the entire district in 2001 and 2011. The WorldPop Global2 R2025A API returned eleven annual modelled values for a documented 263.6863 km² rectangle for 2015–2025: this box includes surrounding settlements and sea and is not an administrative or triad boundary. The modelled values are not measured annual headcounts.

The data snapshot contains 471 OpenStreetMap amenity/shop/tourism features across three sampled cores: 269 Udupi, 125 Manipal, 77 Malpe. These are mapped features, not footfall or an exhaustive census. The property sample has 20 non-archival asking records, not closed transactions. Eight developer profiles preserve project-specific RERA references, sources and unknowns. Review-source snapshots identify business or project scope; Justdial describes its scores as an across-web index, and a separate project-review aggregator reproduces Google reviews. No independent verification of reviewer identity, residence or property completion is implied. The NASA Black Marble display is a fixed 2016 coarse image, not current activity; no local annual radiance statistics have been extracted.

Independent review identified missing structured alternative prices and conflict indicators in the filtered CSV, mixed sorting of monthly rents and sale asks, and a truncated WorldPop y-axis. The lead corrected all three: the export carries alternative amounts, conflict, rates, possession and evidence fields; sorting separates sale and rent groups; and the population axis starts at zero. The chronicle agent independently inspected the revised source. The points-layer description was also corrected. **Pass 1 is complete for the inspected evidence and reported fixes**, with the source limitations above; it is not a legal, valuation or user acceptance review.

### Pass 2: interface and runtime

The lead reports that three SVG charts rendered at 1440 × 1000 and that changing GDDP basis changed the latest value from ₹67,503 crore current to ₹40,675 crore constant. A first browser run exposed a CARTO raster `APIKEYREQUIRED` response and a MapLibre worker failure. The geospatial agent replaced the source with OpenFreeMap vector tiles and used a same-origin worker; the lead then observed coastlines, roads and the density layer in a production preview with no console errors. The health filter displayed 37 mapped features, and selecting Manipal exposed ten asking records. The lead saved listing M-A01 to the local acquisition inbox, changed it to Diligence and confirmed the stage persisted after reload. The Mandavi dossier showed business and other-project review scores with their separate scopes.

At 390 × 844, an initial test found overlapping map controls and an oversized lead heading. After mobile layout corrections, the lead reports a rendered map, initially collapsed Map layers control that opens, 27 education features, and no document overflow on map or acquisition views. These results are lead-reported rather than independently observed by the chronicle agent. **Pass 2 is complete for those tested paths**, subject to browser, network and accessibility variations; it does not establish comprehensive accessibility conformance or user acceptance.

### Pass 3: release and service

The lead reports a deployed Cloudflare Worker and D1 database, management returning 401 without a token and 200 with one, and a successful synthetic, contact-free intake submitted from the UI and read back through the authenticated API. The lead then reports deleting only that exact QA row using its UUID and title predicate, with one row affected. The owner secret is stored outside Git and the lead reports scanning publishable source for its absence. Eight core/backend tests and checks covering 11 brief links and OSINT data scope passed according to the lead.

The lead reports source published at commit `db6b54ab736c5355e60346fe4c4c2b41f0cc0f45`. [GitHub Actions run 42394615715](https://github.com/AmolDerickSoans/udupi-observatory/actions/runs/42394615715) completed build and deployment successfully. The lead then observed [the live Pages site](https://amoldericksoans.github.io/udupi-observatory/) rendering OpenFreeMap coastlines and roads, the deck.gl heatmap and all 471 sourced features without console errors. JavaScript, CSS, favicon, chronicle and both research JSON files returned HTTP 200. NASA’s fixed 2016 night imagery was also observed rendering in the preview, with its coarse and historical nature stated. **Pass 3 is complete for this verified deployment and tested paths.** User acceptance is not assumed.

## Historical status — first iteration rejected

The user rejected the initial site as too shallow. It failed the user's quality expectations for intelligence depth, geographic analysis and practical investigative value. The initial implementation is a baseline only, not a completed deliverable. At the time of this entry, no source code had been pushed and GitHub Pages had not been enabled or deployed.

The user expanded and clarified the target as an OSINT-grade geospatial intelligence platform: Mapbox/deck.gl heatmaps, property lead capture, developer reviews, population/GDP time series, and night aerial activity. The user explicitly requested Terra subagents for the revised work. The lead is replacing the architecture to address this correction. The technical checks below describe the rejected baseline and do not imply user acceptance or completion of the revised scope.

## Brief and scope

The site is branded **Coastal Ledger**; its project directory and planned repository slug are `udupi-observatory`.

The supplied brief calls for a multi-page static HTML/CSS/JavaScript site covering the overview, market dashboard, micro-markets, price discovery and returns, geography, playbooks, risks, and infrastructure scenarios. The audience includes local buyers, operators, and Gulf-based NRI families. Apartments, commercial space, and plots for house building all belong in scope.

The user also explicitly requested a separate agent to chronicle the work. This file is maintained by that agent, independently of the implementation owner.

## Team and responsibilities

| Role | Responsibility |
| --- | --- |
| Lead implementation and synthesis | Architecture, design, map and charts, calculations, interactions, integration, GitHub repository, and GitHub Pages publication |
| Market research agent | Current asking-price and rental evidence, source dates and units, evidence limitations, and clearly separated modeling assumptions |
| Risk and infrastructure research agent | CRZ/CZMP, NRI acquisition rules, durable institutional drivers, project status, and practical diligence |
| Chronicle and quality agent | Development record, independent critique, and evidence for the three requested improvement passes |

## Decisions recorded before implementation

- The deliverable is a **standalone site**, kept apart from the Helios Energy Cloud application. The existing Helios repository contains unrelated local changes; those are outside this work.
- GitHub Pages is the requested host. A static site avoids a server dependency and can also work when its HTML is opened directly.
- The parent agent consulted the existing Graphify knowledge graph before inspecting source structure.
- Public listing asks will not be presented as registered transaction prices or a representative market index.
- Projection charts must be labeled as modeled scenarios. No historical series will be invented to fill a visual gap.
- Any drawn map must identify its geographic precision and must not imply a surveyed CRZ boundary or parcel clearance.
- Proposed infrastructure is optionality, not a funded or operational asset merely because it appears in a news report.

## Work log

### 7 November 2026 — research and implementation started

The lead read the complete supplied brief and created the standalone project directory. Market and regulatory research began in parallel. The implementation uses vanilla HTML/CSS/JavaScript with zero runtime dependencies and local assets. A source library and public chronicle are included in the planned pages. The chronicle agent established the process record and reviewed the proposed evidence and interaction architecture before application files existed.

**Status at this entry:** research and implementation are underway. No browser, test, GitHub repository, or deployed-site result has yet been observed by the chronicle agent.

### Evidence concerns surfaced during research

Before integration, the lead reported these evidence distinctions from the research agents:

- A ₹96 lakh premium apartment listing with 2030 possession cannot be treated as ready rental stock or paired with a current tenant rent to imply an observed yield.
- Malpe cannot be reduced to a generic 50-metre coastal restriction; the applicable CRZ/CZMP classification and parcel conditions must be checked.
- Metro feasibility and an airport proposal are not operational infrastructure.
- Uttara Kannada island projects are not Malpe infrastructure and must not be used to imply a local tourism catalyst.

These research-stage findings were subsequently checked against the integrated publication. Future possession is displayed explicitly; the apartment chart excludes it. Coastal and infrastructure sections preserve the distinctions above.

## Improvement passes

The requested three full critique-and-improve passes are recorded below with concrete observations, changes, and verification. A pre-implementation critique alone does not count as a completed pass.

| Pass | Focus | Status |
| --- | --- | --- |
| 1 | Initial baseline content accuracy, source coverage, financial assumptions | Technically reviewed; baseline later rejected by user |
| 2 | Initial baseline navigation, interactions, responsive layout, accessibility | Technically reviewed; baseline later rejected by user |
| 3 | Initial baseline release review and reproducibility | Not completed; publication stopped after scope correction |

### Pass 1 — integrated content and evidence

The quality agent reviewed all main-page text, the source library, original research, and the generated data transform. The publication keeps 21 original observations, including one 2022 archive, while showing 20 non-archival dashboard records. Conflicting prices and future-possession supply are excluded from the apartment comparison chart. Listing asks, institutional demand proxies, model inputs, and dated project-status reporting remain visibly separate.

Critique identified four concrete presentation defects. The implementation owner corrected each and rebuilt the pages:

- Commercial rental rates now include the full denominator: rupees per square foot per month.
- The future-possession apartment now explicitly displays December 2030.
- CSV exports retain the review date, source label, evidence type, and conflict flag alongside listing dates and notes.
- The public chronicle renders real tables, strong text and inline code, and uses headings below the page title.

The quality agent independently checked the generated outputs after these changes. All 11 HTML documents have one primary heading. Pass 1 is complete.

### Pass 2 — behavior and practical usability

An independent arithmetic check verified acquisition and exit friction, vacancy and owner expenses, cumulative rent, negative terminal wealth, and rejection of invalid inputs. Code critique led to three corrections: closed mobile navigation is inert, negative chart bounds use range-based padding, and the rail can scroll in short viewports. These changes were inspected in the resulting source.

An independent static audit found no missing local asset/link targets, broken local fragments, duplicate element IDs, or images without alternative text across the 11 HTML files. The lead reported five calculator tests and the project static audit passing, and observed a coherent calculator layout with the default 2.9% net and 4.0% gross yield in a 1440 × 1000 browser. The lead then exercised the full interface in the Pages-subpath preview:

- Malpe plots filter to two records; Malpe apartments show a clear no-sample state. The filtered CSV downloads successfully.
- Market selection changes the brief and its dashboard deep link preserves the selected market.
- The calculator rejects zero purchase price and recovers after correction. Its land-only preset shows no gross rental yield and negative carrying yield.
- Coastal map overlays retain the explicit non-CRZ warning; the Malpe hotspot changes its detail panel.
- Downside and catalyst scenarios update their paths and index table. The risk checklist increments correctly.
- At 390 × 844, the overview, dashboard and calculator fit a 390-pixel document width. The wide data table scrolls within its container.
- Closed mobile navigation is inert; Menu opens it; Escape closes it and returns focus to the trigger. No browser console errors were observed.

The chronicle agent independently read the downloaded CSV: exactly two Malpe plot rows, 16 fields, and the review date, source, evidence type and conflict metadata intact.

A direct `file://` browser attempt was rejected by the browser's protocol policy. No workaround was attempted. Relative URLs, local assets and script-loaded data support portability structurally; direct-file runtime is not claimed as tested. Pass 2 is complete.

### Pass 3 — release readiness

The quality agent reviewed the README, build transform, preview server, test files, ignore rules, publishing approach and licensing. The documented commands reproduce the build and checks using Python and Node built-ins. Relative URLs support the repository subpath; `.nojekyll` selects static publication; local runtime assets avoid CDN dependencies. The code license excludes third-party material and the photograph has specific CC BY-SA attribution.

The technical release review found no additional baseline source blocker. However, the user rejected the product before final release checks or publication. Pass 3 was not completed, and the baseline was not shipped.

### User rejection and scope correction

The first iteration concentrated on a small public-listing evidence desk, transparent return assumptions, playbooks and schematic geography. The user asked for substantially deeper OSINT-grade intelligence. A schematic relationship diagram, sparse asking-price sample and general diligence guidance did not satisfy that target, despite the functional checks passing.

The revised direction includes real geospatial layers and heatmaps, property lead capture, developer reviews, economic and demographic time series, and aerial activity signals. These additions require a new architecture and appropriate evidence sourcing. That was the state at the time of the correction; the version 2 entry above records the subsequent implementation and remaining checks.

## Publication and handoff

The lead confirmed creation of the public source repository: https://github.com/AmolDerickSoans/udupi-observatory. At the time of this baseline entry, the repository existed but no code had been pushed and GitHub Pages had not been enabled or deployed. See the version 2 release record above for the current verification status.
