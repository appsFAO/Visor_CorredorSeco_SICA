// Inicializar mapa
const map = L.map('map').setView([13.5, -85], 6);

// Fondo satelital
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Función para popups
function popupGenerico(feature, layer) {
  let contenido = '';
  for (const key in feature.properties) {
    contenido += `<strong>${key}:</strong> ${feature.properties[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// Capas GeoJSON
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});
const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

// Capa WMS
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// Cargar datos
fetch('datos/centroamerica.geojson').then(r => r.json()).then(d => centroamerica.addData(d));
fetch('datos/paises_piloto.geojson').then(r => r.json()).then(d => paisesPiloto.addData(d));

// Agregar por defecto
centroamerica.addTo(map);
paisesPiloto.addTo(map);
corredorSecoFAO.addTo(map);

// Control de visibilidad
document.getElementById('centroamerica').addEventListener('change', e =>
  e.target.checked ? centroamerica.addTo(map) : map.removeLayer(centroamerica)
);
document.getElementById('paises_piloto').addEventListener('change', e =>
  e.target.checked ? paisesPiloto.addTo(map) : map.removeLayer(paisesPiloto)
);
document.getElementById('corredor_seco_fao').addEventListener('change', e =>
  e.target.checked ? corredorSecoFAO.addTo(map) : map.removeLayer(corredorSecoFAO)
);

// Botones por país
function centrarEnPais(pais) {
  const coords = {
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9]
  };
  if (coords[pais]) map.setView(coords[pais], 8);
}

function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// Panel flotante
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
