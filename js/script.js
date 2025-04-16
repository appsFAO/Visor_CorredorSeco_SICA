// 🌍 Inicializar el mapa
const map = L.map('map', {
  center: [13.5, -85],
  zoom: 6,
  zoomControl: true
});

// 🛰️ Mapas base
const baseMaps = {
  "🌍 Satélite (Esri)": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri, Maxar, Earthstar Geographics'
  }),
  "🗺️ OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }),
  "🌫️ Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© Carto, OpenStreetMap'
  })
};

baseMaps["🌍 Satélite (Esri)"].addTo(map);

// 🔍 Geocoder
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Buscar lugar...'
}).addTo(map);

// 🔁 Función para mostrar popups con propiedades
function popupGenerico(feature, layer) {
  const props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// 📁 Capas vectoriales
const centroamerica = L.geoJSON(null, {
  style: { color: '#2196f3', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});
const paisesPiloto = L.geoJSON(null, {
  style: { color: '#fbc02d', weight: 2, fillOpacity: 0.15 },
  onEachFeature: popupGenerico
});
const csMunis = L.geoJSON(null, {
  style: { color: '#ba68c8', fillColor: '#ba68c8', weight: 1, dashArray: '2', fillOpacity: 0.25 },
  onEachFeature: popupGenerico
});

// 🌾 Capa WMS
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// 📥 Cargar archivos GeoJSON locales
fetch('datos/centroamerica.geojson').then(res => res.json()).then(data => centroamerica.addData(data));
fetch('datos/paises_piloto.geojson').then(res => res.json()).then(data => paisesPiloto.addData(data));
fetch('datos/cs_munis.geojson').then(res => res.json()).then(data => csMunis.addData(data));

// ✅ Overlays y control de capas
const overlays = {
  "🟦 Centroamérica": centroamerica,
  "🟧 Corredor Seco FAO": corredorSecoFAO,
  "🟪 Municipios CS": csMunis,
  "🟨 Países Piloto": paisesPiloto
};

L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(map);

// Agregar overlays por defecto
Object.values(overlays).forEach(layer => map.addLayer(layer));

// 🖍️ Leyenda dinámica
const leyenda = document.getElementById('leyenda-list');
function actualizarLeyenda() {
  if (!leyenda) return;
  leyenda.innerHTML = '';

  if (map.hasLayer(centroamerica))
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#2196f3"></span>Centroamérica</li>`;
  if (map.hasLayer(paisesPiloto))
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#fbc02d"></span>Países Piloto</li>`;
  if (map.hasLayer(csMunis))
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#ba68c8"></span>Municipios CS</li>`;
  if (map.hasLayer(corredorSecoFAO)) {
    leyenda.innerHTML += `<li class="leyenda-item" style="margin-top:8px; font-weight:bold;">Corredor Seco FAO (WMS)</li>
      <li class="leyenda-item"><span class="leyenda-color" style="background:#d73027"></span>Severa</li>
      <li class="leyenda-item"><span class="leyenda-color" style="background:#fc8d59"></span>Alta</li>
      <li class="leyenda-item"><span class="leyenda-color" style="background:#fee08b"></span>Baja</li>
      <li class="leyenda-item"><span class="leyenda-color" style="background:#91bfdb"></span>Z=0</li>`;
  }
}
map.on('overlayadd', actualizarLeyenda);
map.on('overlayremove', actualizarLeyenda);
actualizarLeyenda();

// 📌 Centrado por país
function centrarEnPais(pais) {
  const coords = {
    costarica: [9.8, -84.2],
    panama: [8.6, -80],
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9]
  };
  const nombres = {
    costarica: "Costa Rica 🇨🇷",
    panama: "Panamá 🇵🇦",
    honduras: "Honduras 🇭🇳",
    guatemala: "Guatemala 🇬🇹",
    elsalvador: "El Salvador 🇸🇻"
  };
  if (coords[pais]) {
    map.setView(coords[pais], 8);
    const popup = L.popup().setLatLng(coords[pais]).setContent(`<b>${nombres[pais]}</b>`).openOn(map);
    setTimeout(() => map.closePopup(popup), 3000);
  }
}

// 🌍 Vista general
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// 🌐 Cambio idioma
document.getElementById('lang-switch')?.addEventListener('click', () => {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;

  document.getElementById('main-title').textContent =
    lang === 'es' ? '🌱 Visor Corredor Seco y Zonas Áridas' : '🌱 Dry Corridor and Arid Zones Viewer';

  document.querySelector('h3').textContent = lang === 'es' ? 'Simbología' : 'Legend';
  document.getElementById('lang-switch').textContent = lang === 'es' ? 'English' : 'Español';
});
