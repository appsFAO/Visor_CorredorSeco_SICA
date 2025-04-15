// 🌍 Inicializar el mapa base
const map = L.map('map').setView([13.5, -85], 6);

// 🛰️ Fondo satelital
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// 🔍 Geocoder
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Buscar lugar...'
}).addTo(map);

// 🔁 Función para popups
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// 📁 Capas vacías
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

const csMunis = L.geoJSON(null, {
  style: { color: '#e74c3c', weight: 1.5, dashArray: '3', fillOpacity: 0.1 },
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

// 📌 Agregar al mapa por defecto
centroamerica.addTo(map);
paisesPiloto.addTo(map);
csMunis.addTo(map);
corredorSecoFAO.addTo(map);

// 🎯 Visibilidad y leyenda dinámica
const leyenda = document.getElementById('leyenda-list');
function actualizarLeyenda() {
  leyenda.innerHTML = '';
  if (map.hasLayer(centroamerica)) leyenda.innerHTML += '<li class="leyenda-item"><span class="leyenda-color" style="background:#0033cc"></span>Centroamérica</li>';
  if (map.hasLayer(paisesPiloto)) leyenda.innerHTML += '<li class="leyenda-item"><span class="leyenda-color" style="background:#ffa500"></span>Países Piloto</li>';
  if (map.hasLayer(csMunis)) leyenda.innerHTML += '<li class="leyenda-item"><span class="leyenda-color" style="background:#e74c3c"></span>Municipios CS</li>';
  if (map.hasLayer(corredorSecoFAO)) leyenda.innerHTML += '<li class="leyenda-item"><img src="img/icono_wms.png" class="leyenda-color" style="object-fit:contain"> Corredor Seco FAO (WMS)</li>';
}

// 📌 Control de visibilidad
const layersCheckboxes = {
  centroamerica: centroamerica,
  paises_piloto: paisesPiloto,
  cs_munis: csMunis,
  corredor_seco_fao: corredorSecoFAO
};

Object.keys(layersCheckboxes).forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('change', function () {
    this.checked ? layersCheckboxes[id].addTo(map) : map.remove
