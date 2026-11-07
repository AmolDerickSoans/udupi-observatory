---
name: Coastal Ledger
description: A low-glare workspace and reading library for inspectable coastal market research.
colors:
  bg: "#10191f"
  panel: "#18252d"
  panel-2: "#20313b"
  line: "#344852"
  text: "#edf3f5"
  muted: "#b2c3cc"
  subtle: "#91a8b3"
  accent: "#92ddc1"
  warning: "#e4bf85"
  danger: "#f0a899"
typography:
  headline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.35
  subsection:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  control:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  mobile-title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  small: "4px"
  field: "5px"
  control: "6px"
  surface: "8px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#102b21"
    rounded: "{rounded.control}"
    padding: "8px 14px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.panel-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
    height: "40px"
---
# Design System: Coastal Ledger

## Overview

The main surface is an Operate workspace for geographic investigation, market evidence and acquisition work. Keep it quiet and legible: the map, records, charts and their source context carry the hierarchy. The retained research briefs are Read surfaces on a light paper canvas, using the same type family and a more generous reading size.

## Colors

Dark blue-grey canvas and panels reduce glare; muted text and borders separate secondary information. Mint identifies actions and selected states; amber and coral distinguish caution and conflict. Source confidence and geographic precision must also be expressed in text, not color alone.

## Typography

IBM Plex Sans is the interface and reading family. Workspace body text is 14px with 1.6 line height; controls are 13px and supporting labels generally 12px. Page titles are 28px (24px on mobile), section titles 19px, and subsection headings 15px in the workspace or 16px in the briefs. Icon-font glyphs and labels embedded in illustrations are sized for their visual context, not as body copy. Use tabular figures for measurements. Briefs use 16px body text and locally bundled fonts. Prefer sentence case and descriptive headings over decorative labels and oversized marketing typography.

## Layout

The workspace has a sticky 64px header, 48px context bar and 202px sidebar. At widths up to 1080px the sidebar compacts to 88px; at 640px and below, navigation moves to a 72px bottom bar plus safe-area inset. Respect shell height variables for viewport-sized content. Records reflow into labelled mobile rows, with an explicit inspect and back path. The acquisition desk opens on its register, with separate capture, brief and intake tabs.

## Elevation & Depth

Panels rely on tonal contrast and fine borders. Shadows are reserved for floating overlays, such as map controls and selections. The reading briefs use a light paper background and flat bordered panels.

## Shapes

Use restrained 4–8px radii (4–5px for small controls and fields) and thin borders. Keep controls at least 40px high, increasing to 44px on mobile where specified by the workspace styles.

## Components

Buttons have clear primary and secondary treatments, hover, disabled and visible focus states. Inputs use dark surfaces and the same focus accent. Navigation identifies the active route. Map layers, basemaps, market anchors and category filters expose their selected states; overlays should leave the geography usable on small screens. Evidence labels, source links and relevant limitations stay near the information they qualify.

## Do's and Don'ts

- **Do** preserve real values, source dates, map precision and distinctions between observations, proxies and models.
- **Do** keep reading paths, filters, inspection and capture usable by keyboard and touch.
- **Don't** add decorative numbering, all-caps eyebrows or extra card borders where they do not aid the task.
- **Don't** imply that mapped amenity density is footfall, or that market-centre anchors are property locations.
