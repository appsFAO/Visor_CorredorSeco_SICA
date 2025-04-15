// Inicializar el mapa base
const map = L.map('map').setView([13.5, -85], 6);

// Fondo satelital
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Geocoder
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Buscar lugar...'
}).addTo(map);

// Funciones de popup
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
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

// Cargar datos
fetch('datos/centroamerica.geojson').then(res => res.json()).then(data => centroamerica.addData(data));
fetch('datos/paises_piloto.geojson').then(res => res.json()).then(data => paisesPiloto.addData(data));
fetch('datos/cs_munis.geojson').then(res => res.json()).then(data => csMunis.addData(data));

// Agregar al mapa
centroamerica.addTo(map);
paisesPiloto.addTo(map);
csMunis.addTo(map);
corredorSecoFAO.addTo(map);

// Leyenda
function actualizarLeyenda() {
  const leyenda = document.getElementById('leyenda-list');
  leyenda.innerHTML = '';

  if (map.hasLayer(centroamerica)) {
    leyenda.innerHTML += `
      <li class="leyenda-item">
        <span class="leyenda-color" style="background:#0033cc"></span>Centroamérica
      </li>`;
  }

  if (map.hasLayer(paisesPiloto)) {
    leyenda.innerHTML += `
      <li class="leyenda-item">
        <span class="leyenda-color" style="background:#ffa500"></span>Países Piloto
      </li>`;
  }

  if (map.hasLayer(csMunis)) {
    leyenda.innerHTML += `
      <li class="leyenda-item">
        <span class="leyenda-color" style="background:#e74c3c"></span>Municipios CS
      </li>`;
  }

  if (map.hasLayer(corredorSecoFAO)) {
    leyenda.innerHTML += `
      <li class="leyenda-item" style="flex-direction: column; align-items: flex-start;">
        <strong>Corredor Seco FAO (WMS)</strong>
        <img src="img/leyenda_corredor_seco_fao.png" alt="Leyenda CS FAO" style="margin-top: 6px; width: 160px; border: 1px solid #ccc; border-radius: 4px;" />
      </li>`;
  }
}

// Checkboxes de capas
const layersCheckboxes = {
  centroamerica: centroamerica,
  paises_piloto: paisesPiloto,
  cs_munis: csMunis,
  corredor_seco_fao: corredorSecoFAO
};

Object.keys(layersCheckboxes).forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('change', function () {
    this.checked ? layersCheckboxes[id].addTo(map) : map.removeLayer(layersCheckboxes[id]);
    actualizarLeyenda();
  });
});

actualizarLeyenda();

// Centrado por país
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

// Vista general
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// Mostrar/ocultar panel
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}

// Cambio de idioma
document.getElementById('lang-switch').addEventListener('click', function () {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;
  this.textContent = lang === 'es' ? 'English' : 'Español';

  document.getElementById('main-title').textContent = lang === 'es'
    ? 'Visor Corredor Seco y Zonas Áridas 🌱'
    : 'Dry Corridor and Arid Zones Viewer 🌱';
  document.getElementById('panel-title').textContent = lang === 'es' ? 'Capas' : 'Layers';

  document.querySelectorAll('.cap-layer')[0].textContent = lang === 'es' ? 'Corredor Seco FAO (WMS)' : 'FAO Dry Corridor (WMS)';
  document.querySelectorAll('.cap-layer')[1].textContent = lang === 'es' ? 'Países Piloto' : 'Pilot Countries';
  document.querySelectorAll('.cap-layer')[2].textContent = lang === 'es' ? 'Centroamérica' : 'Central America';
  document.querySelectorAll('.cap-layer')[3].textContent = lang === 'es' ? 'Municipios CS' : 'CS Municipalities';
});

