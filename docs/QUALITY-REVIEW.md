# Coastal Ledger — independent quality review

Review owner: chronicle and quality agent. Review date: 7 November 2026.

## Version 2 review — 7 November 2026

The first iteration was rejected. The revised application is under active independent review, not accepted or release-certified. These current findings supersede the historical baseline review below.

| Review pass | Evidence observed | Remaining work / finding |
| --- | --- | --- |
| Content and evidence — complete for reviewed scope | Independently inspected v2 signals, developer and market evidence against source data. Counted 471 OSM elements: Udupi 269, Manipal 125 and Malpe 77. Verified source corrections retain alternative price fields and conflict flags in CSV, separate rent/sale sorting, and set WorldPop's y-axis minimum to zero. | Source vintages, modeled estimates and reviewer identities remain qualified. This does not certify title, value or completion. |
| UX and runtime — complete for tested paths | Lead reports desktop charts and price toggle, actual OpenFreeMap coast/roads and heatmap, no console errors, category filtering, Manipal's ten records, scoped developer reviews and a saved acquisition stage that persisted after reload. At 390 × 844 the corrected collapsed Map layers control opened, education filter showed 27 features, and map/acquisition views had no document overflow. | Browser checks were reported by the lead, not independently reproduced by the chronicle agent. Results are not an accessibility certification. |
| Release and service — pending | Lead reports Worker/D1 deployed, authorized management 200 and unauthenticated 401, a successful contact-free synthetic intake and authenticated readback, then deletion of that exact QA row (one affected). Eight core/backend tests, 11 brief-link checks and OSINT scope checks passed; the publishable source was scanned for the owner secret. | Source push, successful GitHub Actions, live Pages paths and final release remain unverified. |

Specific data cautions: the 20 advertisements are asks, not verified sales. WorldPop's 263.6863 km² rectangle is an arbitrary analytical area containing surrounding settlements and sea, not a city or the triad; its annual numbers are model outputs, not Census. NASA's 2016 Black Marble is coarse fixed imagery, not current pedestrian activity. OSM mapped density is conditional on mapping coverage. RERA records, review aggregations and developer self-reports require fresh source checks, and review scores cannot certify delivery, quality or title.

## Historical baseline — product acceptance outcome

The user rejected the first iteration as too shallow. It failed the user's expected intelligence depth and geospatial usefulness. The passing technical checks below apply only to that rejected baseline; they do not establish product acceptance or completion.

The revised request calls for OSINT-grade geospatial intelligence using Mapbox/deck.gl heatmaps, property lead capture, developer reviews, population/GDP time series, and night aerial activity, with explicitly requested Terra subagents. At the time of this baseline entry, the lead was replacing the architecture and no revised capability had been certified. See the version 2 review above for current status.

## Pre-implementation critique

The architecture is appropriate: a standalone static multi-page site can make a dense subject navigable while remaining portable and inexpensive to host. The central quality risk is false confidence in thin property evidence, rather than lack of decorative polish.

The following requirements were raised before integrated application files existed:

| Concern | Required treatment |
| --- | --- |
| Listing asks and actual transactions differ | Label observed asks; do not claim a verified negotiation spread or transaction median without records |
| Sparse and mixed samples | Show source date, asset type, area basis, and sample limitations; do not infer representative averages from a few listings |
| Historical data may be unavailable | Use an explicitly modeled forward index, or omit history; never label synthetic history as observed |
| Plot area units can mislead | State that one cent is 435.6 square feet and show the unit next to every plot price |
| Rental yield can hide costs | Distinguish gross and net yield; model vacancy, owner costs, acquisition costs, and exit costs explicitly |
| Commercial evidence may be especially thin | Expose uncertainty rather than importing apartment economics into a commercial panel |
| Coastal maps can appear authoritative | Keep geographic maps distinct from legal CRZ/CZMP maps; link to official parcel diligence |
| Infrastructure news can become an investment promise | Separate proposed, studied, sanctioned, funded, under construction, and operational status |
| NRI interest is not a measured capital-flow series | Describe evidence limits and do not manufacture a Gulf-flow narrative or numerical forecast |
| Static-file portability | Use relative URLs and avoid reliance on fetch for essential content when opening HTML directly |
| Dense interface accessibility | Provide keyboard access, visible focus, labeled controls, readable contrast, and non-color cues |
| GitHub Pages subpath | Test navigation and assets under a repository subpath, not only the localhost root |

## Pass 1 — integrated content and calculations

Complete after review, correction, and independent recheck of the integrated site.

The quality agent read all main-page copy, the source library, original research data, and the build transform. The publication distinguishes selected asking evidence from closed transactions, modeled sensitivity from observed history, institutional activity from rental occupancy, and infrastructure reporting from operating assets. The original dataset contains 21 records; the 2022 archive is excluded from the 20-record dashboard. The clean apartment chart excludes contradictory price records and future-possession supply.

Concrete findings and resolutions:

| Finding | Correction and verification |
| --- | --- |
| Commercial rent rates lacked the monthly denominator | Generated data now shows ₹25 and ₹75 per square foot per month |
| Future-possession date disappeared from the data transform | The ₹96 lakh listing now explicitly says December 2030 in its note |
| Detached CSVs lost provenance and conflict metadata | Static and filtered exports include review date, source label, evidence type and caution flag |
| Public chronicle showed raw Markdown pipes and formatting | Generated page now has actual tables, strong text, inline code and headings below its single primary title |

The three selected Manipal 2 BHK rental asks include a furnishing-description conflict. The overview explicitly states that condition rather than treating the sample as a clean or representative rent range. No universal bargaining discount, verified Gulf capital-flow estimate, historical index or Malpe buildability claim was found in the public copy.

## Pass 2 — interaction and presentation

Complete after code corrections, static checks, independent arithmetic checks, and browser exercises reported by the lead.

An independent arithmetic case passed: price 100, entry cost 10%, rent 1/month, 25% vacancy, owner cost 2/year, flat price, 5% exit, and a two-year hold give acquisition cash 110, annual net rent 7, terminal wealth 109, and a nominal loss of 1. A negative-terminal case returns no annualized CAGR. Fractional holding years, vacancy above 100%, and zero price are rejected. These checks verify business outcomes rather than restating implementation steps.

| Code finding | Resolution inspected |
| --- | --- |
| Closed mobile links remained keyboard-focusable off screen | Mobile rail synchronizes its inert state with open/closed state and viewport changes |
| Negative chart values could fall below an incorrectly padded minimum | Chart bounds use data-range padding above and below the true extrema |
| Fixed navigation could exceed a short viewport | Rail allows vertical scrolling |

An independent static audit covered all 11 HTML files: local assets and links exist, fragment targets resolve, IDs are unique, images have alternative text, and every document has exactly one primary heading. Visible focus, reduced-motion support, keyboard activation of map hotspots, and explicit non-regulatory map descriptions are present.

The lead reported five calculator tests and the project static audit passing. The lead also observed the 1440 × 1000 calculator layout, including 2.9% modeled net and 4.0% gross default yields, without overflow. The lead subsequently confirmed:

- Two-record Malpe plot filter, no-sample Malpe apartment state, and a working filtered CSV download.
- Market-tab content updates with a market-preserving dashboard deep link.
- Zero-price calculator error and successful recovery; land-only gross yield of zero with negative carrying yield.
- Coastal overlay warning, Malpe hotspot detail, downside and catalyst scenario updates, and checklist count updates.
- A 390 × 844 mobile overview, dashboard and calculator with no document overflow; the dashboard table scrolls inside its container.
- Inert closed mobile navigation, opening via Menu, and Escape closing with focus returned to the trigger.
- No browser console errors.

The chronicle agent independently checked the actual browser-downloaded CSV: two Malpe plot rows, 16 fields, and review date, source, evidence type and caution metadata retained.

A direct `file://` navigation was rejected by browser protocol policy. Direct-file runtime was not tested. Structural compatibility is supported by local assets, relative links, script-loaded data and no required fetch calls.

## Pass 3 — release readiness

Not completed. The user rejected the product before final release checks and publication.

Reviewed README instructions, build transform, preview server, test files, ignore rules, publishing approach and licensing. The README identifies the source of generated pages and documents the exact standard-library build and test commands. It explains the evidence contract, archive separation, calculation limitations and schematic mapping. GitHub Pages root-branch publication and `.nojekyll` match the portable relative-URL design.

The repository remote is the intended standalone project. The ignore rules exclude dependency, cache, test-result, graph and archive output. The local photograph has a source, creator, license and modification note. Third-party material is excluded from the original-code license.

The baseline technical review found no additional source blocker, but it did not assess the depth now demanded by the user. The initial scope and product execution were insufficient. A release-ready static evidence desk is not equivalent to the OSINT-grade platform the user expects.

Publication of the baseline is stopped. Revised work needs direct geospatial utility, deeper source coverage, defensible time-series provenance, transparent developer-review methodology, and clear distinctions between observed signals and inferred economic activity. These are requirements for the next iteration, not completed work. Pass 3 and initial release are not marked complete.

## Verification limits

This document is a work record, not a title opinion, valuation report, legal opinion, or certification of a property's buildability. No test or deployment is marked successful until evidence is available.
