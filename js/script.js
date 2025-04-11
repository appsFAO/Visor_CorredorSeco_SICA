// Crear mapa base
var map = L.map('map').setView([13.5, -85], 6);

// Fondo satelital
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Función para mostrar propiedades en popups
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// Definir capas vacías
var centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

var paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

// Cargar datos
fetch('datos/Centroamérica.geojson')
  .then(res => res.json())
  .then(data => centroamerica.addData(data));

fetch('datos/Países_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data));

// Agregar inicialmente al mapa
centroamerica.addTo(map);
paisesPiloto.addTo(map);

// Control de visibilidad
document.getElementById('centroamerica').addEventListener('change', function () {
  this.checked ? centroamerica.addTo(map) : map.removeLayer(centroamerica);
});

document.getElementById('paises_piloto').addEventListener('change', function () {
  this.checked ? paisesPiloto.addTo(map) : map.removeLayer(paisesPiloto);
});

// Centrado por país
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

// Mostrar/ocultar panel
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
