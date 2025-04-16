// 🌍 Inicializar mapa
const map = L.map('map').setView([13.5, -85], 6);

// 🗺️ Capas base
const baseLayers = {
  "Satélite (Esri)": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  }).addTo(map),
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }),
  "Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB, OpenStreetMap contributors'
  })
};

L.control.layers(baseLayers).addTo(map);

// 🔍 Geocoder
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Buscar ubicación...'
}).addTo(map);

// 📦 Capas vectoriales
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: bindPopup
});

// ✅ Capa WMS corregida
const corredorSecoFAO = L.tileLayer.wms("https://data.apps.fao.org/map/gsrv/wms", {
  layers: 'corredor_seco_fao',
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  attribution: '© FAO GeoNetwork'
});

const csMunis = L.geoJSON(null, {
  style: {
    color: '#c215c2',
    fillColor: '#c215c2',
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.3
  },
  onEachFeature: bindPopup
});

const paisesPiloto = L.geoJSON(null, {
  style: {
    color: '#ffa500',
    weight: 2,
    dashArray: '4',
    fillOpacity: 0.2
  },
  onEachFeature: bindPopup
});

// 📥 Cargar datos GeoJSON
fetch('datos/centroamerica.geojson').then(r => r.json()).then(d => centroamerica.addData(d));
fetch('datos/cs_munis.geojson').then(r => r.json()).then(d => csMunis.addData(d));
fetch('datos/paises_piloto.geojson').then(r => r.json()).then(d => paisesPiloto.addData(d));

// ➕ Capas por defecto
map.addLayer(centroamerica);
map.addLayer(corredorSecoFAO);
map.addLayer(csMunis);
map.addLayer(paisesPiloto);

// 🔁 Popups
function bindPopup(feature, layer) {
  let content = '';
  for (const key in feature.properties) {
    content += `<strong>${key}:</strong> ${feature.properties[key]}<br>`;
  }
  layer.bindPopup(content);
}

// 🎯 Leyenda dinámica
const leyenda = document.getElementById('leyenda-list');
function actualizarLeyenda() {
  leyenda.innerHTML = '';

  if (map.hasLayer(centroamerica)) {
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#0033cc"></span>Centroamérica</li>`;
  }

  if (map.hasLayer(paisesPiloto)) {
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#ffa500"></span>Países Piloto</li>`;
  }

  if (map.hasLayer(csMunis)) {
    leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#c215c2"></span>Municipios CS</li>`;
  }

  if (map.hasLayer(corredorSecoFAO)) {
    leyenda.innerHTML += `
      <li class="leyenda-item" style="font-weight: bold;">Corredor Seco FAO (WMS)</li>
      <ul style="margin-top: 5px; padding-left: 10px;">
        <li class="leyenda-item"><span class="leyenda-color" style="background:#d73027"></span> Severa</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#fc8d59"></span> Alta</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#fee08b"></span> Baja</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#91bfdb"></span> Z=0</li>
      </ul>`;
  }
}

actualizarLeyenda();

// 📌 Control de visibilidad
const capas = {
  centroamerica,
  corredor_seco_fao: corredorSecoFAO,
  cs_munis: csMunis,
  paises_piloto: paisesPiloto
};

for (const id in capas) {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('change', () => {
      input.checked ? map.addLayer(capas[id]) : map.removeLayer(capas[id]);
      actualizarLeyenda();
    });
  }
}

// 🇸🇻 Centrado por país
function centrarEnPais(pais) {
  const coords = {
    costarica: [10.0, -84.2],
    panama: [8.5, -80.0],
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9]
  };

  const nombre = pais.charAt(0).toUpperCase() + pais.slice(1);
  if (coords[pais]) {
    map.setView(coords[pais], 8);
    const popup = L.popup().setLatLng(coords[pais]).setContent(`<strong>${nombre}</strong>`).openOn(map);
    setTimeout(() => map.closePopup(popup), 3000);
  }
}

// 🔁 Vista general
function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// ☰ Mostrar/Ocultar panel
function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}

// 🌐 Cambio de idioma
document.getElementById('lang-switch').addEventListener('click', () => {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;
  document.getElementById('lang-switch').textContent = lang === 'es' ? 'English' : 'Español';
  document.getElementById('main-title').textContent = lang === 'es'
    ? '🌱 Visor Corredor Seco y Zonas Áridas'
    : '🌱 Dry Corridor and Arid Zones Viewer';
  document.getElementById('panel-title').textContent = lang === 'es' ? 'Capas' : 'Layers';

  const labels = document.querySelectorAll('.cap-layer');
  const traducciones = [
    ['Corredor Seco FAO', 'FAO Dry Corridor'],
    ['Países Piloto', 'Pilot Countries'],
    ['Centroamérica', 'Central America'],
    ['Municipios CS', 'CS Municipalities']
  ];

  labels.forEach((el, i) => {
    el.textContent = lang === 'es' ? traducciones[i][0] : traducciones[i][1];
  });
});
