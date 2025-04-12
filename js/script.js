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
  const props = feature.properties;
  const contenido = Object.entries(props)
    .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
    .join('<br>');
  layer.bindPopup(contenido);
}

// 📁 Capas vectoriales vacías
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
  onEachFeature: popupGenerico
});

// 🌐 Capa WMS
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/edit/rlc_corredorseco/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

// 📥 Cargar GeoJSON
fetch('datos/centroamerica.geojson')
  .then(res => res.json())
  .then(data => centroamerica.addData(data));

fetch('datos/paises_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data));

// 🗺️ Agregar capas por defecto
centroamerica.addTo(map);
paisesPiloto.addTo(map);
corredorSecoFAO.addTo(map);

// 📋 Leyenda dinámica
const leyenda = document.getElementById('leyenda-list');
function actualizarLeyenda() {
  leyenda.innerHTML = '';
  if (map.hasLayer(centroamerica)) leyenda.innerHTML += '<li class="leyenda-item"><span class="leyenda-color" style="background:#0033cc"></span>Centroamérica</li>';
  if (map.hasLayer(paisesPiloto)) leyenda.innerHTML += '<li class="leyenda-item"><span class="leyenda-color" style="background:#ffa500"></span>Países Piloto</li>';
  if (map.hasLayer(corredorSecoFAO)) leyenda.innerHTML += '<li class="leyenda-item"><img src="img/icono_wms.png" class="leyenda-color" style="object-fit:contain"> Corredor Seco FAO (WMS)</li>';
}

// 🎛️ Control de visibilidad
const layersCheckboxes = {
  centroamerica,
  paises_piloto: paisesPiloto,
  corredor_seco_fao: corredorSecoFAO
};

Object.keys(layersCheckboxes).forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('change', () => {
      input.checked ? layersCheckboxes[id].addTo(map) : map.removeLayer(layersCheckboxes[id]);
      actualizarLeyenda();
    });
  }
});

actualizarLeyenda();

// 📌 Zoom a país
function centrarEnPais(pais) {
  const coords = {
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9]
  };
  const nombres = {
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

// ☰ Mostrar/Ocultar panel
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}

// 🌐 Cambio de idioma (ES/EN)
document.getElementById('lang-switch').addEventListener('click', () => {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;
  document.getElementById('lang-switch').textContent = lang === 'es' ? 'English' : 'Español';

  document.getElementById('main-title').textContent = lang === 'es'
    ? 'Visor Corredor Seco y Zonas Áridas 🌱'
    : 'Dry Corridor and Arid Zones Viewer 🌱';
  document.getElementById('panel-title').textContent = lang === 'es' ? 'Capas' : 'Layers';

  const labels = [
    lang === 'es' ? 'Corredor Seco FAO (WMS)' : 'FAO Dry Corridor (WMS)',
    lang === 'es' ? 'Países Piloto' : 'Pilot Countries',
    lang === 'es' ? 'Centroamérica' : 'Central America'
  ];
  document.querySelectorAll('.cap-layer').forEach((el, i) => el.textContent = labels[i]);
});
