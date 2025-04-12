// 🌍 Inicializar el mapa base
var map = L.map('map').setView([13.5, -85], 6);

// 🛰️ Fondo satelital de Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// 🔍 Función para popups genéricos
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// ============================
// 📁 Capas GeoJSON vacías
// ============================
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

// 📡 Capa WMS de FAO: Corredor Seco
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// ============================
// 🔄 Cargar GeoJSON desde carpeta /datos
// ============================
fetch('datos/centroamerica.geojson')
  .then(res => res.json())
  .then(data => centroamerica.addData(data))
  .catch(err => console.error('Error cargando centroamerica.geojson', err));

fetch('datos/paises_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data))
  .catch(err => console.error('Error cargando paises_piloto.geojson', err));

// ============================
// 🗺️ Agregar todas por defecto
// ============================
centroamerica.addTo(map);
paisesPiloto.addTo(map);
corredorSecoFAO.addTo(map);

// ============================
// ✅ Control de visibilidad (panel derecho)
// ============================
document.getElementById('centroamerica').addEventListener('change', function () {
  this.checked ? centroamerica.addTo(map) : map.removeLayer(centroamerica);
});

document.getElementById('paises_piloto').addEventListener('change', function () {
  this.checked ? paisesPiloto.addTo(map) : map.removeLayer(paisesPiloto);
});

document.getElementById('corredor_seco_fao').addEventListener('change', function () {
  this.checked ? corredorSecoFAO.addTo(map) : map.removeLayer(corredorSecoFAO);
});

// ============================
// 🇭🇳 🇬🇹 🇸🇻 Botones de país
// ============================
function centrarEnPais(pais) {
  const coords = {
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9]
  };
  if (coords[pais]) {
    map.setView(coords[pais], 8);
  }
}

// Vista general
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// ============================
// ☰ Mostrar / Ocultar Panel
// ============================
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
