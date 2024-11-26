import React from 'react';
import { Link } from 'react-router-dom';
import './Task.css'; 

function VerticalNavbar() {

  const handleClose= () =>{
    localStorage.setItem('role','')
  }
  return (
    <div className="vertical-navbar">
      <div className="menu-items">
        <Link to="/Login" className="logout-button" onClick={handleClose}>Cerrar sesión</Link>
        <Link to="">Inicio</Link>
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

