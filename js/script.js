// Crear el mapa base
var map = L.map('map').setView([13.5, -85], 6);

// Fondo satelital de Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Función genérica para popups
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

// Capa WMS desde FAO
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_region_sica', // ✅ Asegurate que este sea el nombre correcto de la capa
  format: 'image/png',
  transparent: true,
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
  })
  .catch(err => console.error('Error cargando centroamerica.geojson', err));

fetch('datos/paises_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data))
  .catch(err => console.error('Error cargando paises_piloto.geojson', err));

// Agregar capas iniciales al mapa
centroamerica.addTo(map);
paisesPiloto.addTo(map);
corredorSecoFAO.addTo(map); // También mostrar WMS por defecto

// Control de visibilidad de capas desde el panel
document.getElementById('centroamerica').addEventListener('change', function () {
  this.checked ? centroamerica.addTo(map) : map.removeLayer(centroamerica);
});

document.getElementById('paises_piloto').addEventListener('change', function () {
  this.checked ? paisesPiloto.addTo(map) : map.removeLayer(paisesPiloto);
});

document.getElementById('corredor_seco_fao').addEventListener('change', function () {
  this.checked ? corredorSecoFAO.addTo(map) : map.removeLayer(corredorSecoFAO);
});

// Centrar el visor en un país por bandera
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

// Vista general para todo Centroamérica
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// Mostrar u ocultar panel lateral
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
