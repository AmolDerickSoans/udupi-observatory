# Coastal Ledger

An evidence-based property intelligence and acquisition workspace for **Udupi, Manipal and Malpe**.

**[Open the workspace](https://amoldericksoans.github.io/udupi-observatory/)** · [Build chronicle](docs/CHRONICLE.md) · [Quality review](docs/QUALITY-REVIEW.md)

The rejected first edition was an editorial briefing site. Version 2 makes geography, evidence inspection and acquisition the primary workflow. Three Terra agents built the map, collected the OSINT datasets and implemented the acquisition desk; an agent maintains the candid chronicle.

## What works

- **Geographic explorer:** real MapLibre/OpenFreeMap geography with deck.gl heatmaps, individual places, coverage boxes and market anchors. The cached OSM snapshot has 471 amenity/shop/tourism features across three sampled core areas. Category filters and place inspection link to OSM originals. Mapbox satellite tiles are supported when the visitor supplies their own public token.
- **Night observation:** NASA Black Marble 2016 imagery, explicitly a coarse historical activity proxy. No pedestrian footfall or extracted annual radiance is claimed.
- **Market evidence:** 20 non-archival asking records, inspectable dates, area bases, contradictions, source URLs, filtered CSV export, return underwriting and one-click saving to the acquisition desk. The original JSON retains one additional archived record.
- **Economic signals:** five sourced district GDDP observations (missing FY2020–21 left blank), current/constant-price and per-capita views; two district Census counts; a separately labeled annual 2015–2025 WorldPop spatial model for a disclosed analysis box.
- **Developer dossiers:** eight promoter/project records with RERA references, source identity/status limits, scoped review-platform evidence, original review links, local research notes and diligence checks. Ratings are not synthesized into a developer-quality score.
- **Acquisition desk:** property-wanted brief, portal sourcing links, source capture, stage changes, follow-ups, editing, URL deduplication, CSV/JSON import/export and browser-local persistence.
- **Shared intake:** real Cloudflare Worker + D1 storage. The public form validates and submits properties; owner-only retrieval requires a session-memory admin secret. Contacts require consent. Secrets are never bundled or committed.
- **Research library:** detailed micro-market, CRZ, NRI, house-building, commercial, price discovery and infrastructure briefs retained as secondary pages.

## Local development

Node 24 and Python 3 are recommended. All frontend dependencies are pinned in the lockfile.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4174/udupi-observatory/>. The interactive application needs an HTTP server, WebGL and a network connection for external map tiles. After building, the portable research briefs are also available in `public/briefs/`; their essential assets are local.

```sh
npm run build
npm run preview
node --test tests/calculator.test.cjs backend/worker.test.mjs
python3 tests/check_site.py
python3 tests/check_osint.py
```

`scripts/build.py` generates the detailed briefs and their CSV/data assets. Vite builds the workspace and copies those briefs into `dist/briefs/`. All frontend hash routes and assets work under the GitHub repository subpath.

## Shared intake service

The API origin is in `src/config.js`; no management credential belongs there. See [LEADS-API.md](docs/LEADS-API.md) for the public and owner contracts. The backend deploys separately from GitHub Pages; GitHub CI does not require Cloudflare credentials.

```sh
npx wrangler deploy --dry-run --config backend/wrangler.jsonc
npx wrangler deploy --config backend/wrangler.jsonc
```

Schema is in `backend/schema.sql`. New schema changes should use reviewed D1 migrations. Owner credentials created during setup are stored locally outside this repository with restricted permissions; enter the token in the owner panel only when retrieving shared submissions. No contact data is included in this repository.

## Publication

The pinned GitHub Actions workflow builds, runs calculator/backend/data/portability checks, uploads `dist/`, and deploys GitHub Pages. The source branch is `main`; the Pages source is **GitHub Actions**, not direct root-branch publication.

## Evidence boundaries

OSM density measures mapped features and mapper coverage, not visits. Market anchors are not property coordinates. No drawn map is a CRZ, title, hazard or parcel boundary. WorldPop is modeled spatial disaggregation/projection for a custom 263.7 km² box, not a triad headcount. GDP and Census describe the district. Developer ratings can concern a business or another project and remain attributed opinions. Property asks, synthetic return assumptions and verified administrative observations are kept distinct.

## Credits

OSM data: © OpenStreetMap contributors, ODbL; basemap: OpenFreeMap / OpenMapTiles, with visible map attribution. NASA imagery: EOSDIS GIBS / VIIRS Black Marble. WorldPop, Census and Karnataka survey sources are linked in the datasets.

Brief photograph: KshitizBathwal / Skyscape Photography, 21 November 2018, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Malpe_Beach_2.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized locally and cropped for display; it is contextual, not current-condition evidence.

Original code is MIT licensed; third-party data, imagery, fonts and libraries retain their own licenses. Original editorial synthesis is CC BY 4.0; third-party source content is excluded from that grant.
