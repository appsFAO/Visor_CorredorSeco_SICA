// Crear mapa base
var map = L.map('map').setView([13.5, -85], 6);

// Fondo base (puede ser OSM o Esri)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Popup genérico
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// Capas GeoJSON vacías
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

// Capa WMS FAO - Corredor Seco
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'rlc_corredorseco:corredor_seco_region_sica',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// Cargar archivos GeoJSON
fetch('datos/centroamerica.geojson')
  .then(res => res.json())
  .then(data => {
    centroamerica.addData(data);
    if (centroamerica.getLayers().length > 0) {
      map.fitBounds(centroamerica.getBounds());
    }
  });

fetch('datos/paises_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data));

// Mostrar todas las capas al cargar
centroamerica.addTo(map);
paisesPiloto.addTo(map);
corredorSecoFAO.addTo(map);

// Checkbox de visibilidad
document.getElementById('centroamerica').addEventListener('change', function () {
  this.checked ? centroamerica.addTo(map) : map.removeLayer(centroamerica);
});

document.getElementById('paises_piloto').addEventListener('change', function () {
  this.checked ? paisesPiloto.addTo(map) : map.removeLayer(paisesPiloto);
});

document.getElementById('corredor_seco_fao').addEventListener('change', function () {
  this.checked ? corredorSecoFAO.addTo(map) : map.removeLayer(corredorSecoFAO);
});

// Función para centrar el mapa por país
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

// Vista general para la región
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// Mostrar/ocultar panel lateral
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
