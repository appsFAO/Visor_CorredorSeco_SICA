// 🌍 Inicializar el mapa base
const map = L.map('map', {
  center: [13.5, -85],
  zoom: 6
});

// 🗺️ Mapas base
const satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '© Esri, Maxar, Earthstar Geographics'
}).addTo(map);

const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
});

const cartoLight = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '© CartoDB'
});

// 📁 Capas vectoriales
const centroamerica = L.geoJSON(null, {
  style: { color: '#007bff', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#f39c12', weight: 2, fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

const csMunis = L.geoJSON(null, {
  style: { color: '#c215c2', fillColor: '#c215c2', weight: 1, dashArray: '3', fillOpacity: 0.3 },
  onEachFeature: popupGenerico
});

const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// 📥 Cargar datos GeoJSON
fetch('datos/centroamerica.geojson').then(res => res.json()).then(data => centroamerica.addData(data));
fetch('datos/paises_piloto.geojson').then(res => res.json()).then(data => paisesPiloto.addData(data));
fetch('datos/cs_munis.geojson').then(res => res.json()).then(data => csMunis.addData(data));

// 🧭 Control de capas fusionado
const baseMaps = {
  '🛰️ Satélite (Esri)': satelite,
  '🗺️ OpenStreetMap': openStreetMap,
  '🧾 Carto Light': cartoLight
};

const overlayMaps = {
  '🟦 Centroamérica': centroamerica,
  '🟧 Corredor Seco FAO': corredorSecoFAO,
  '🟪 Municipios CS': csMunis,
  '🟨 Países Piloto': paisesPiloto
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false,
  position: 'topright'
}).addTo(map);

// 🔍 Geocoder
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Buscar lugar...'
}).addTo(map);

// 📌 Popups genéricos
function popupGenerico(feature, layer) {
  const props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// 🇨🇷🇵🇦🇭🇳🇬🇹🇸🇻 Centrado por país
function centrarEnPais(pais) {
  const coords = {
    costarica: [10, -84],
    panama: [8.5, -80],
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

function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// 🌐 Cambio de idioma
document.getElementById('lang-switch')?.addEventListener('click', function () {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;
  this.textContent = lang === 'es' ? 'English' : 'Español';

  document.getElementById('main-title').textContent = lang === 'es'
    ? '🌱 Visor Corredor Seco y Zonas Áridas'
    : '🌱 Dry Corridor and Arid Zones Viewer';
});
