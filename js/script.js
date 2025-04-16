/* 🌍 BASE GENERAL */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f9;
}

#map {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

/* 🧭 NAVBAR */
header.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #2c3e50;
  color: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.titulo-contenedor {
  flex-grow: 1;
  text-align: center;
}

.titulo-contenedor h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.banderas {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.banderas button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.banderas img {
  width: 28px;
  height: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
}

/* 🧱 LAYERS CONTROL CUSTOM */
.leaflet-control-layers {
  margin-top: 100px !important; /* Posición debajo del zoom */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 13px;
  padding: 8px;
  background-color: white;
  max-height: 300px;
  overflow-y: auto;
}

.leaflet-control-layers label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

/* 📍 FOOTER */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
  color: white;
  font-size: 12px;
  text-align: center;
  padding: 10px 12px;
  z-index: 999;
}

/* 🌐 SWITCH IDIOMA */
#lang-switch {
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

#lang-switch:hover {
  background-color: #cf711a;
}

/* 📱 RESPONSIVE */
@media (max-width: 768px) {
  header.navbar {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .banderas {
    position: static;
    margin-top: 10px;
    justify-content: center;
  }

  .titulo-contenedor h1 {
    font-size: 20px;
  }

  footer {
    font-size: 11px;
  }
}
