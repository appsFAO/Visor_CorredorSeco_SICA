// 🌍 Inicializa el mapa
const map = L.map('map').setView([13.5, -85], 6);

// 🗺️ Mapas base
const baseMaps = {
  '🌍 Satélite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri, Maxar, Earthstar Geographics'
  }),
  '🗺️ OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }),
  '🧭 Light Gray': L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps'
  })
};

baseMaps['🌍 Satélite'].addTo(map);

// 🔍 Geocoder
L.Control.geocoder({ placeholder: 'Buscar lugar...' }).addTo(map);

// Función genérica para popups
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

// 🧱 Capas vectoriales
const centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

const paisesPiloto = L.geoJSON(null, {
  style: { color: '#ffa500', weight: 2, dashArray: '4', fillOpacity: 0.2 },
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

// 📥 Carga de datos
fetch('datos/centroamerica.geojson').then(res => res.json()).then(data => centroamerica.addData(data));
fetch('datos/paises_piloto.geojson').then(res => res.json()).then(data => paisesPiloto.addData(data));
fetch('datos/cs_munis.geojson').then(res => res.json()).then(data => csMunis.addData(data));

// ✅ Agrega por defecto
centroamerica.addTo(map);
paisesPiloto.addTo(map);
csMunis.addTo(map);
corredorSecoFAO.addTo(map);

// 🎯 Control de capas
const overlayMaps = {
  'Centroamérica': centroamerica,
  'Corredor Seco FAO': corredorSecoFAO,
  'Municipios CS': csMunis,
  'Países Piloto': paisesPiloto
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// 📚 Leyenda dinámica
const leyenda = document.getElementById('leyenda-list');
function actualizarLeyenda() {
  leyenda.innerHTML = '';
  if (map.hasLayer(centroamerica)) leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#0033cc"></span>Centroamérica</li>`;
  if (map.hasLayer(paisesPiloto)) leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#ffa500"></span>Países Piloto</li>`;
  if (map.hasLayer(csMunis)) leyenda.innerHTML += `<li class="leyenda-item"><span class="leyenda-color" style="background:#c215c2"></span>Municipios CS</li>`;
  if (map.hasLayer(corredorSecoFAO)) {
    leyenda.innerHTML += `<li class="leyenda-item" style="font-weight:bold;margin-top:10px;">Corredor Seco FAO</li>`;
    leyenda.innerHTML += `
      <ul style="padding-left: 10px; margin: 5px 0;">
        <li class="leyenda-item"><span class="leyenda-color" style="background:#d73027"></span> Severa</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#fc8d59"></span> Alta</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#fee08b"></span> Baja</li>
        <li class="leyenda-item"><span class="leyenda-color" style="background:#91bfdb"></span> Z=0</li>
      </ul>`;
  }
}
map.on('overlayadd overlayremove', actualizarLeyenda);
actualizarLeyenda();

// 🌍 Función para centrar en un país
function centrarEnPais(pais) {
  const coords = {
    honduras: [15.2, -86.4],
    guatemala: [15.5, -90.3],
    elsalvador: [13.8, -88.9],
    costarica: [9.7, -84.2],
    panama: [8.5, -80.1]
  };
  if (coords[pais]) map.setView(coords[pais], 8);
}

function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

// 🌐 Cambiar idioma
document.getElementById('lang-switch').addEventListener('click', function () {
  const lang = document.documentElement.lang === 'es' ? 'en' : 'es';
  document.documentElement.lang = lang;
  this.textContent = lang === 'es' ? 'English' : 'Español';
  document.getElementById('main-title').textContent = lang === 'es'
    ? '🌱 Visor Corredor Seco y Zonas Áridas'
    : '🌱 Dry Corridor and Arid Zones Viewer';
});
