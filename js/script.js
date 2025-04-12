/* ============================
   BASE GENERAL
============================ */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background: #f4f6f8;
}

#map {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

/* ============================
   HEADER NAVBAR
============================ */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

header h1 {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.banderas button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
}

.banderas img {
  width: 34px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* ============================
   BOTÓN PANEL DE CAPAS
============================ */
#menu-btn {
  position: fixed;
  top: 85px;
  right: 10px;
  z-index: 1100;
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}

/* ============================
   PANEL DE CAPAS
============================ */
#panel {
  position: fixed;
  top: 130px;
  right: 10px;
  background: white;
  padding: 14px 20px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  z-index: 1001;
  width: 220px;
  min-height: auto;
}

#panel.hidden {
  display: none;
}

#panel h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

#panel .emoji {
  margin-right: 6px;
}

#panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#panel li {
  margin-bottom: 10px;
  font-size: 14px;
}

/* ============================
   LEYENDA DINÁMICA
============================ */
#leyenda-dinamica {
  position: fixed;
  bottom: 70px;
  right: 10px;
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 1001;
  font-size: 14px;
  max-width: 240px;
}

#leyenda-dinamica h3 {
  margin: 0 0 8px 0;
  font-size: 15px;
}

.leyenda-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.leyenda-color {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

/* ============================
   FOOTER
============================ */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #2c3e50;
  color: white;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  z-index: 999;
}

/* ============================
   BOTÓN SWITCH IDIOMA
============================ */
#lang-switch {
  position: fixed;
  top: 85px;
  left: 10px;
  z-index: 1100;
  background: #e67e22;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
}

/* ============================
   BUSCADOR (Leaflet Control)
============================ */
.leaflet-control-geocoder {
  margin-top: 80px !important;
}

/* ============================
   RESPONSIVE PARA MÓVIL
============================ */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    height: auto;
    padding: 10px;
    align-items: flex-start;
  }

  header h1 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .banderas {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
  }

  #menu-btn,
  #lang-switch {
    font-size: 12px;
    padding: 6px 10px;
  }

  #panel,
  #leyenda-dinamica {
    right: 5px;
    width: 90%;
  }

  #leyenda-dinamica {
    bottom: 100px;
  }

  .leaflet-control-geocoder {
    margin-top: 100px !important;
  }
}
