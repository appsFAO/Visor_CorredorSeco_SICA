var map = L.map('map').setView([13.5, -85], 6);

// Fondo satelital
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Capas
var centroamerica = L.geoJSON(null, {
  style: { color: 'blue', weight: 2 },
  onEachFeature: popupGenerico
});

var paisesPiloto = L.geoJSON(null, {
  style: { color: 'orange', weight: 2, dashArray: '4' },
  onEachFeature: popupGenerico
});

fetch('datos/Centroamérica.geojson')
  .then(res => res.json())
  .then(data => centroamerica.addData(data));

fetch('datos/Países_piloto.geojson')
  .then(res => res.json())
  .then(data => paisesPiloto.addData(data));

centroamerica.addTo(map);
paisesPiloto.addTo(map);

document.getElementById('centroamerica').addEventListener('change', function () {
  if (this.checked) {
    centroamerica.addTo(map);
  } else {
    map.removeLayer(centroamerica);
  }
});

document.getElementById('paises_piloto').addEventListener('change', function () {
  if (this.checked) {
    paisesPiloto.addTo(map);
  } else {
    map.removeLayer(paisesPiloto);
  }
});

function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);
}

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

function vistaGeneral() {
  map.setView([13.5, -85], 6);
}

function togglePanel() {
  document.getElementById('panel').classList.toggle('hidden');
}
