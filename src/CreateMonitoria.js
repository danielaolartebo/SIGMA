import React, { useState, useEffect } from 'react';
import './CreateMonitoria.css'; 
import './Task.css';
import { Link } from 'react-router-dom';
import VerticalNavbar from './VerticalNavbar';

function CreateMonitoria() {

    const [faculties, setFaculties] = useState([]); // State for Faculty options
    const [programs, setPrograms] = useState([]); // State for Program options
    const [selectedFaculty, setSelectedFaculty] = useState(""); // Selected Faculty
    const [selectedProgram, setSelectedProgram] = useState(""); // Selected Program

    // Fetch Faculty options
    useEffect(() => {
        fetch('http://localhost:3000/Faculty.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.faculty) {
                    setFaculties(data.faculty);
                } else {
                    console.error("Faculty data format is incorrect.");
                }
            })
            .catch(error => console.error('Error fetching faculty data:', error));
    }, []);

    // Fetch Program options
    useEffect(() => {
        fetch('http://localhost:3000/Program.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.program) {
                    setPrograms(data.program);
                } else {
                    console.error("Program data format is incorrect.");
                }
            })
            .catch(error => console.error('Error fetching program data:', error));
    }, []);

    // Handle change for Faculty dropdown
    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };

    // Handle change for Program dropdown
    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
    };

  return (
    <div className="task-container">
      <VerticalNavbar />
      <div className="content">
        {/* Title begins */}
        <div className="title-container">
          <h2 className="title">Postulación a Monitor</h2>
        </div>
        {/* Title ends */}

        <form className="grid-container">
          {/* Nombre */}
          <label>Nombre</label>
            <input type="text" placeholder="Nombre" className="input-text-box" />

          {/* Facultad */}
          <label>Facultad</label>
          <select className="faculty"
                    id="faculty-dropdown" 
                    value={selectedFaculty} 
                    onChange={handleFacultyChange}
                >
                    <option value=""> Seleccionar </option>
                    {faculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                        </option>
                    ))}
           </select>

          {/* Programa */}
          <label>Programa</label>
          <select className="program"
                    id="program-dropdown" 
                    value={selectedProgram} 
                    onChange={handleProgramChange}
                >
                    <option value=""> Seleccionar </option>
                    {programs.map(program => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
           </select>

          {/* Materia/Curso */}
          <label>Materia/Curso</label>
          <select>
            <option>Seleccionar</option>
          </select>

          {/* Periodo académico */}
          <label>Periodo académico</label>
          <select>
            <option>Seleccionar</option>
          </select>

          {/* Grupo */}
          <label>Grupo</label>
          <select>
            <option>Seleccionar</option>
          </select>

            {/* Inicio de convocatoria en dos columnas */}
          <label>Inicio de convocatoria</label>
          <input type="date" className="input-date" />

          {/* Fin de convocatoria */}
          <label>Fin de convocatoria</label>
          <input type="date" className="input-date" />

            {/* Requisitos */}
            <label>Promedio acumulado:</label>
                <input type="text" placeholder="4.5" className="input-text-box"/>
            <label>Promedio materia:</label>
                    <input type="text" placeholder="4.5" className="input-text-box"/>

            {/* Añadir nuevo requisito */}  
            <label></label>
                <Link to="#"></Link>

            <label></label>
                <Link to="#">¿Añadir nuevo requisito?</Link>
            
            {/* Botón de confirmación */}
            <Link to="/" type="submit" className="confirm-button">Confirmar</Link>
        </form>
      </div>
    </div>
  );
}

export default CreateMonitoria;

