/* ============================
   BASE GENERAL
============================ */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f8;
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
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

header h1 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}

.banderas img:hover {
  transform: scale(1.05);
}

/* ============================
   BOTÓN MENU PANEL CAPAS
============================ */
#menu-btn {
  position: fixed;
  top: 85px;
  right: 10px;
  z-index: 1100;
  background: #3498db;
  color: #fff;
  border: none;
  padding: 9px 14px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* ============================
   PANEL DE CAPAS
============================ */
#panel {
  position: fixed;
  top: 130px;
  right: 10px;
  background: #fff;
  padding: 16px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 1001;
  width: 240px;
  max-width: 90%;
}

#panel.hidden {
  display: none;
}

#panel h2 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #2c3e50;
  display: flex;
  align-items: center;
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

.cap-layer {
  margin-left: 6px;
}

/* ============================
   LEYENDA DINÁMICA
============================ */
#leyenda-dinamica {
  position: fixed;
  bottom: 70px;
  right: 10px;
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  font-size: 14px;
  max-width: 240px;
  z-index: 1001;
}

#leyenda-dinamica h3 {
  margin: 0 0 8px 0;
  font-size: 15px;
  color: #333;
}

.leyenda-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.leyenda-color {
  width: 16px;
  height: 16px;
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
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 8px 10px;
  z-index: 999;
}

/* ============================
   BOTÓN IDIOMA
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

/* ============================
   BUSCADOR LEAFLET
============================ */
.leaflet-control-geocoder {
  margin-top: 80px !important;
}

/* ============================
   RESPONSIVE
============================ */
@media screen and (max-width: 600px) {
  #panel, #leyenda-dinamica {
    right: 5px;
    width: 90%;
  }

  #menu-btn, #lang-switch {
    top: 75px;
    font-size: 12px;
  }

  header h1 {
    font-size: 16px;
  }
}
