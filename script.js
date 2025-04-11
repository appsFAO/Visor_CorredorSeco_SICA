// Cargar mapa base
var map = L.map('map').setView([9.7489, -83.7534], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar capa GeoJSON desde GitHub
fetch('datos/Centroamerica.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });