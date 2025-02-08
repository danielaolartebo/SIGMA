import React from 'react';
import { Link } from 'react-router-dom';

function VerticalNavbar() {
  return (
    <div className="vertical-navbar">
      <div className="menu-items">
        <Link to="/Login" className="logout-button">Cerrar sesión</Link>
        <Link to="/Task">Actividades</Link>
        <Link to="">Mi perfil</Link>
        <Link to="/CreateMonitoria">Crear monitoria</Link>
        <Link to="/">Postulaciones</Link>
        <Link to="/Applicants">Mis postulantes</Link>
        <Link to="">Reportes</Link>
      </div>
    </div>
  );
}

export default VerticalNavbar;

