// Inicializar el mapa
var map = L.map('map').setView([13.5, -85], 6);

// Capa base satelital de ESRI
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Función para mostrar popups y tooltips
function popupGenerico(feature, layer) {
  let props = feature.properties;
  let contenido = '';
  for (let key in props) {
    contenido += `<strong>${key}:</strong> ${props[key]}<br>`;
  }
  layer.bindPopup(contenido);

  // Tooltip con nombre
  if (props.nombre || props.Name || props.NAME_0) {
    const etiqueta = props.nombre || props.Name || props.NAME_0;
    layer.bindTooltip(etiqueta, {
      direction: 'center',
      sticky: true
    });
  }
}

// Capas GeoJSON
var centroamerica = L.geoJSON(null, {
  style: { color: '#0033cc', weight: 2, fillOpacity: 0.1 },
  onEachFeature: popupGenerico
});

var paisesPiloto = L.geoJSON(null, {
 
::contentReference[oaicite:0]{index=0}
