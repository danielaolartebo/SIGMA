import React from 'react';
import Navbar from './Navbar'; 
import { Link } from 'react-router-dom';
import './ApplyMonitoria.css';

function ApplyMonitoria() {
  return (
    <div className="apply-monitoria-content">
      <Navbar />
      <div className="apply-monitoria-content-apply-monitoria">
        {/* Title begins */}
        <div className="apply-monitoria-title-container">
          <h2 className="apply-monitoria-title">Postulación a monitor: Computación en Internet I</h2>
        </div>

        <form className="apply-monitoria-grid">
          {/* Nombre */}
          <label>Nombre</label>
          <input type="text" placeholder="" className="apply-monitoria-input-text-box" />

          {/* Apellido */}
          <label>Apellido</label>
          <input type="text" placeholder="" className="apply-monitoria-input-text-box" />

          {/* Genero */}
          <label>Género</label>
          <select>
            <option value="">Seleccionar</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>

          {/* Codigo */}
          <label>Código</label>
          <input type="text" placeholder="" className="apply-monitoria-input-text-box" />

          {/* Semestre */}
          <label>Semestre</label>
          <select>
            <option value="">Seleccionar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          {/* Cumple requisitos */}
          <label>¿Cumple requisitos?</label>
          <select>
            <option value="">Seleccionar</option>
            <option value="yes">Si</option>
            <option value="no">No</option>
          </select>
          
          {/* Botones de acción */}
          <div className="apply-monitoria-buttons-container">
            <Link to="/" className="apply-monitoria-cancel-button">Cancelar</Link>
            <Link to="/" className="apply-monitoria-confirm-button">Aplicar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyMonitoria;
