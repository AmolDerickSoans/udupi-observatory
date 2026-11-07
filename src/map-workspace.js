import * as maplibregl from 'maplibre-gl';
import mapWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ScatterplotLayer, TextLayer, PathLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import marketData from '../research/market.json';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map-workspace.css';

const MARKETS = [
  { name: 'Udupi', position: [74.7461, 13.3409], note: 'District centre' },
  { name: 'Manipal', position: [74.791, 13.350] },
  { name: 'Malpe', position: [74.703, 13.349] },
];

const activeSamples = marketData.samples.filter(s => !/archiv/i.test(`${s.id} ${s.transaction}`));
const categoryFor = tags => {
  const amenity = tags.amenity || '';
  if (['hospital', 'clinic', 'doctors', 'dentist', 'pharmacy', 'veterinary'].includes(amenity)) return 'health';
  if (['school', 'college', 'university', 'kindergarten', 'library', 'training'].includes(amenity)) return 'education';
  if (tags.shop || ['marketplace', 'bank', 'atm'].includes(amenity)) return 'retail';
  if (tags.tourism || ['restaurant', 'cafe', 'fast_food', 'bar', 'pub', 'food_court'].includes(amenity)) return 'hospitality';
  return 'other';
};
maplibregl.setWorkerUrl(mapWorkerUrl);
const coverageBoxes = [
  [[74.73,13.33],[74.76,13.33],[74.76,13.36],[74.73,13.36],[74.73,13.33]],
  [[74.77,13.34],[74.80,13.34],[74.80,13.36],[74.77,13.36],[74.77,13.34]],
  [[74.69,13.34],[74.72,13.34],[74.72,13.38],[74.69,13.38],[74.69,13.34]],
];
const scopeBounds = [[74.675, 13.315], [74.825, 13.375]];
const rasterStyle = (tiles, attribution) => ({ version: 8, sources: { base: { type: 'raster', tiles: [tiles], tileSize: 256, attribution } }, layers: [{ id: 'base', type: 'raster', source: 'base' }] });
const styles = {
  dark: () => 'https://tiles.openfreemap.org/styles/dark',
  light: () => 'https://tiles.openfreemap.org/styles/positron',
  night: () => { const style = rasterStyle('https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2016-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png', 'NASA EOSDIS GIBS / VIIRS Black Marble 2016'); style.sources.base.maxzoom = 8; return style; },
  satellite: token => rasterStyle(`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${encodeURIComponent(token)}`, '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'),
};

/** Mount the map; call destroy before removing its container. */
export function initMapWorkspace(container, callbacks = {}) {
  let activeMarket = null;
  let filter = 'all';
  let layer = 'amenities';
  let category = 'all';
  let currentBase = 'dark';
  let pois = [];
  let disposed = false;
  let tileErrors = 0;
  let map;
  let overlay;
  let resizeObserver;
  let token = '';
  try { token = localStorage.getItem('udupi-mapbox-token') || ''; } catch { /* storage may be unavailable */ }
  const counts = Object.fromEntries(MARKETS.map(m => [m.name, activeSamples.filter(s => s.market === m.name).length]));
  container.classList.add('geo-workspace');
  container.innerHTML = `<button class="geo-mobile-toggle" type="button" aria-expanded="false">Map layers</button><div class="geo-map" aria-label="Interactive map of Udupi, Manipal and Malpe"></div>
    <div class="geo-topline"><div><span class="geo-live"><i></i> GEOSPATIAL INTELLIGENCE</span><h1>Udupi coastal markets</h1><p>UDUPI &nbsp; / &nbsp; MANIPAL &nbsp; / &nbsp; MALPE</p></div><button class="geo-reset" type="button" title="Reset map extent">⌖ <span>Reset view</span></button></div>
    <div class="geo-controls"><div class="geo-control-label">MAP LAYERS <span>01 / 03</span></div><div class="geo-layer-group" role="group" aria-label="Map overlay"><button type="button" data-layer="amenities" class="is-active"><span class="geo-dot heat"></span>Amenity density</button><button type="button" data-layer="points"><span class="geo-dot listing"></span>Individual places</button><button type="button" data-layer="listings"><span class="geo-dot listing"></span>Listing anchors</button></div><label class="geo-category-label">PLACE CATEGORY<select aria-label="Place category"><option value="all">All mapped places</option><option value="health">Health</option><option value="education">Education</option><option value="retail">Retail & services</option><option value="hospitality">Hospitality & tourism</option><option value="other">Other amenities</option></select></label><p class="geo-layer-description">OSM amenities, shops & tourism · three outlined core areas; not footfall</p><div class="geo-divider"></div><div class="geo-control-label">BASEMAP</div><div class="geo-base-group" role="group" aria-label="Basemap"><button type="button" data-base="dark" class="is-active">Dark</button><button type="button" data-base="light">Light</button><button type="button" data-base="satellite">Satellite</button><button type="button" data-base="night">Night ’16</button></div><div class="geo-token" hidden><label>Mapbox public token<input type="password" autocomplete="off" placeholder="pk.…" aria-label="Mapbox public token"></label><button type="button" data-save-token>Use satellite</button><small>Stored only in this browser. Your Mapbox account and usage terms apply.</small></div></div>
    <div class="geo-market-panel"><div class="geo-control-label">MARKET ANCHORS <span>3 AREAS</span></div><p>Listings are grouped at market centres, not property locations.</p><div class="geo-markets">${MARKETS.map((m, i) => `<button type="button" data-market="${m.name}"><span class="geo-index">0${i + 1}</span><span class="geo-market-name">${m.name}<small>Market centroid</small></span><span class="geo-count">${counts[m.name]} <small>asks</small></span><span class="geo-arrow">↗</span></button>`).join('')}</div></div>
    <div class="geo-legend"><div class="geo-control-label">MAP KEY <span class="geo-legend-state">AMENITIES</span></div><div class="geo-gradient"></div><div class="geo-gradient-labels"><span>LOWER DENSITY</span><span>HIGHER DENSITY</span></div><p class="geo-data-status">Loading OSM snapshot…</p><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors ↗</a></div>
    <div class="geo-error" role="status" hidden></div>`;
  const q = selector => container.querySelector(selector);
  const status = q('.geo-data-status');
  const error = q('.geo-error');
  const description = q('.geo-layer-description');
  const legend = q('.geo-legend-state');
  const marketButtons = [...container.querySelectorAll('[data-market]')];
  const showError = message => { error.textContent = message; error.hidden = false; };
  const points = () => MARKETS.map(m => ({ ...m, count: activeSamples.filter(s => s.market === m.name && (filter === 'all' || s.asset === filter || s.transaction === filter)).length }));
  const renderLayers = () => {
    if (!overlay) return;
    const anchors = points();
    const layers = [];
    const visiblePois = category === 'all' ? pois : pois.filter(p => p.category === category);
    if (layer === 'amenities' && visiblePois.length) layers.push(new HeatmapLayer({ id: 'osm-density', data: visiblePois, getPosition: d => d.position, getWeight: 1, radiusPixels: 45, intensity: 1.15, threshold: 0.04, colorRange: [[23, 58, 80, 0], [31, 110, 128, 100], [56, 164, 161, 155], [190, 194, 110, 190], [247, 165, 83, 220], [255, 112, 77, 235]] }));
    if (layer !== 'listings') layers.push(new PathLayer({ id: 'coverage-boundaries', data: coverageBoxes, getPath: d => d, getColor: [148, 198, 188, 145], getWidth: 1, widthUnits: 'pixels', widthMinPixels: 1 }));
    if (layer !== 'listings' && map?.getZoom() >= 13) layers.push(new ScatterplotLayer({ id: 'osm-points', data: visiblePois, getPosition: d => d.position, getRadius: 4, radiusUnits: 'pixels', radiusMinPixels: 4, getFillColor: [111, 230, 195, 230], getLineColor: [9, 30, 31, 240], lineWidthMinPixels: 1, stroked: true, pickable: true, onClick: info => { if (!info.object) return; const p = info.object; const detail = document.createElement('div'); detail.className = 'geo-popup'; const title = document.createElement('strong'); title.textContent = p.name || 'Unnamed mapped place'; const type = document.createElement('p'); type.textContent = `${p.type.replaceAll('_', ' ')} · ${p.osmType === 'way' ? 'Approximate way center' : 'OSM node'}`; const link = document.createElement('a'); link.href = `https://www.openstreetmap.org/${p.osmType}/${p.id}`; link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'View source on OpenStreetMap ↗'; detail.append(title, type, link); new maplibregl.Popup({ offset: 10 }).setLngLat(p.position).setDOMContent(detail).addTo(map); callbacks.onFeatureSelect?.(p); } }));
    layers.push(new ScatterplotLayer({ id: 'market-halos', data: anchors, getPosition: d => d.position, getRadius: d => activeMarket === d.name ? 390 : 290, radiusMinPixels: 17, radiusMaxPixels: 34, getFillColor: d => activeMarket === d.name ? [247, 190, 91, 45] : [89, 199, 190, 35], getLineColor: d => activeMarket === d.name ? [247, 190, 91, 235] : [105, 218, 205, 210], lineWidthMinPixels: 1.5, stroked: true, pickable: true, onClick: info => info.object && focusMarket(info.object.name) }));
    layers.push(new ScatterplotLayer({ id: 'market-dots', data: anchors, getPosition: d => d.position, getRadius: 5, radiusUnits: 'pixels', getFillColor: [219, 251, 233, 255], pickable: true, onClick: info => info.object && focusMarket(info.object.name) }));
    layers.push(new TextLayer({ id: 'market-labels', data: anchors, getPosition: d => d.position, getText: d => `${d.name.toUpperCase()}  ·  ${d.count} ASKS`, getSize: 11, sizeUnits: 'pixels', getPixelOffset: [0, 28], getColor: [237, 245, 240, 255], fontFamily: 'Arial, sans-serif', fontWeight: 700, background: true, getBackgroundColor: [11, 24, 29, 220], backgroundPadding: [5, 3], getTextAnchor: 'middle' }));
    overlay.setProps({ layers });
  };
  const motionDuration = ms => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : ms;
  const mapPadding = () => container.clientWidth < 800 ? { top: 105, bottom: 155, left: 20, right: 20 } : { top: 120, bottom: 100, left: 260, right: 245 };
  const focusMarket = name => {
    const market = MARKETS.find(m => m.name.toLowerCase() === String(name || '').toLowerCase());
    if (!market || !map) return;
    activeMarket = market.name;
    marketButtons.forEach(button => button.classList.toggle('is-active', button.dataset.market === market.name));
    map.flyTo({ center: market.position, zoom: 13.2, duration: motionDuration(900) });
    renderLayers();
    callbacks.onMarketSelect?.(market.name);
  };
  try {
    map = new maplibregl.Map({ container: q('.geo-map'), style: styles.dark(), center: [74.752, 13.344], zoom: 11.2, minZoom: 8, maxZoom: 18, attributionControl: false });
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    overlay = new MapboxOverlay({ interleaved: false, layers: [] });
    map.addControl(overlay);
    map.on('load', () => { if (!disposed) { map.fitBounds(scopeBounds, { padding: mapPadding(), duration: 0, maxZoom: 12 }); renderLayers(); } });
    map.on('zoomend', renderLayers);
    map.on('style.load', renderLayers);
    map.on('error', event => { if (event.error && ++tileErrors === 4) showError('Some map tiles could not load. Check your connection or choose another basemap.'); });
    resizeObserver = new ResizeObserver(() => map?.resize());
    resizeObserver.observe(container);
  } catch (err) { showError('The interactive map could not start. WebGL and a network connection are required.'); console.error(err); }
  q('.geo-mobile-toggle').addEventListener('click', () => { const open=container.classList.toggle('geo-controls-open'); q('.geo-mobile-toggle').setAttribute('aria-expanded',String(open)); });
  q('.geo-reset').addEventListener('click', () => { activeMarket = null; marketButtons.forEach(button => button.classList.remove('is-active')); map?.fitBounds(scopeBounds, { padding: mapPadding(), duration: motionDuration(700) }); renderLayers(); });
  marketButtons.forEach(button => button.addEventListener('click', () => focusMarket(button.dataset.market)));
  container.querySelectorAll('[data-layer]').forEach(button => button.addEventListener('click', () => {
    layer = button.dataset.layer;
    container.querySelectorAll('[data-layer]').forEach(b => b.classList.toggle('is-active', b === button));
    description.textContent = layer === 'listings' ? 'Public asking samples grouped by market · not parcel locations' : 'OSM amenities, shops & tourism · three outlined core areas; not footfall. Zoom in to inspect places.';
    q('.geo-category-label').hidden = layer === 'listings';
    if (currentBase === 'night') description.textContent += ' NASA night imagery: 2016, coarse proxy.';
    legend.textContent = layer === 'listings' ? 'MARKET ANCHORS' : layer === 'points' ? 'MAPPED PLACES' : 'AMENITIES';
    q('.geo-gradient').hidden = layer !== 'amenities';
    q('.geo-gradient-labels').hidden = layer !== 'amenities';
    updateStatus();
    renderLayers();
  }));
  const updateStatus = () => { const n = category === 'all' ? pois.length : pois.filter(p => p.category === category).length; status.textContent = layer === 'listings' ? `${activeSamples.length} observed asks · not closed transactions` : `${n.toLocaleString()} OSM features · 3 core boxes; zoom to inspect`; };
  q('.geo-category-label select').addEventListener('change', event => { category = event.target.value; updateStatus(); renderLayers(); });
  const setBase = base => {
    if (base === 'satellite' && !token) { q('.geo-token').hidden = false; q('.geo-token input').focus(); return; }
    q('.geo-token').hidden = true;
    currentBase = base;
    description.textContent = base === 'night' ? 'NASA VIIRS Black Marble 2016 · coarse night-light imagery, not footfall' : (layer === 'amenities' ? 'OSM amenities, shops & tourism · three outlined core areas; not footfall' : 'Public asking samples grouped by market · not parcel locations');
    container.querySelectorAll('[data-base]').forEach(b => b.classList.toggle('is-active', b.dataset.base === base));
    error.hidden = true; tileErrors = 0;
    map?.setStyle(styles[base](token));
  };
  container.querySelectorAll('[data-base]').forEach(button => button.addEventListener('click', () => setBase(button.dataset.base)));
  q('[data-save-token]').addEventListener('click', () => {
    const input = q('.geo-token input');
    if (!input.value.trim().startsWith('pk.')) { input.setCustomValidity('Enter a Mapbox public token beginning with pk.'); input.reportValidity(); return; }
    input.setCustomValidity(''); token = input.value.trim();
    try { localStorage.setItem('udupi-mapbox-token', token); } catch { /* use token for this session */ }
    input.value = ''; setBase('satellite');
  });
  fetch(new URL('../data/geo/udupi-osm-amenities.json', import.meta.url)).then(response => { if (!response.ok) throw new Error('snapshot unavailable'); return response.json(); }).then(data => {
    if (disposed) return;
    pois = (data.elements || []).map(e => ({ position: [e.lon ?? e.center?.lon, e.lat ?? e.center?.lat], type: e.tags?.amenity || e.tags?.shop || e.tags?.tourism || 'place', name: e.tags?.name || '', category: categoryFor(e.tags || {}), osmType: e.type, id: e.id })).filter(d => d.position.every(Number.isFinite));
    updateStatus();
    renderLayers();
  }).catch(() => { if (!disposed) status.textContent = 'OSM snapshot unavailable · density layer not shown'; });
  return { destroy() { disposed = true; resizeObserver?.disconnect(); map?.remove(); container.innerHTML = ''; container.classList.remove('geo-workspace'); }, focusMarket, setFilter(value) { filter = value || 'all'; renderLayers(); }, resize() { map?.resize(); } };
}
