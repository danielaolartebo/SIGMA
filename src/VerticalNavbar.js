import React from 'react';
import './Task.css'; 

function VerticalNavbar() {
  return (
    <div className="vertical-navbar">
      <div className="menu-items">
        <a>Inicio</a>
        <a>Mi perfil</a>
        <a href="/create_monitoria">Crear monitoria</a>
        <a>Postulaciones</a>
        <a>Reportes</a>
      </div>
      <div className="logout-container">
        <a href="/Login" className="logout-button">Cerrar sesión</a>
      </div>
    </div>
  );
}

export default VerticalNavbar;

