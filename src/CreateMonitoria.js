import React, { useState, useEffect } from 'react';
import './CreateMonitoria.css'; 
import './Task.css';
import { Link } from 'react-router-dom';
import VerticalNavbar from './VerticalNavbar';

function CreateMonitoria() {

    const [column, setColumn] = useState([]);
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 2;

    const [faculties, setFaculties] = useState([]); // State for Faculty options
    const [programs, setPrograms] = useState([]); // State for Program options
    const [subject, setSubject] = useState([]); // State for Subject options
    const [selectedFaculty, setSelectedFaculty] = useState(""); // Selected Faculty
    const [selectedProgram, setSelectedProgram] = useState(""); // Selected Program
    const [selectedSubject, setSelectedSubject] = useState(""); // Selected Subject

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

    // Fetch Subject options
    useEffect(() => {
        fetch('http://localhost:3000/Subject.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.subject) {
                    setSubject(data.subject);
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

    // Handle change for Subject dropdown
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(records.length / recordsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="cm-task-container">
            {/* Load file button starts */}
            <button className="top-right-button">Cargar datos</button>
            {/* Load file button ends */}

            <VerticalNavbar />
            <div className="cm-content">
                {/* Title begins */}
                <div className="cm-title-container">
                    <h2 className="cm-title">Crear monitoria</h2>
                </div>
                {/* Title ends */}

                <form className="cm-grid-container">

                    {/* Facultad */}
                    <label>Facultad</label>
                    <select className="cm-faculty"
                            id="faculty-dropdown" 
                            value={selectedFaculty} 
                            onChange={handleFacultyChange}>
                        <option value=""> Seleccionar </option>
                        {faculties.map(faculty => (
                            <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>

                    {/* Programa */}
                    <label>Programa</label>
                    <select className="cm-program"
                            id="program-dropdown" 
                            value={selectedProgram} 
                            onChange={handleProgramChange}>
                        <option value=""> Seleccionar </option>
                        {programs.map(program => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>

                    {/* Materia/Curso */}
                    <label>Curso</label>
                    <select className="cm-program"
                            id="subject-dropdown" 
                            value={selectedSubject} 
                            onChange={handleSubjectChange}>
                        <option value=""> Seleccionar </option>
                        {subject.map(subject => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>

                    {/* Periodo académico */}
                    <label>Periodo académico</label>
                    <select>
                        <option>Seleccionar</option>
                    </select>


                    {/* Inicio de convocatoria en dos columnas */}
                    <label>Inicio de convocatoria</label>
                    <input type="date" className="cm-input-date" />

                    {/* Fin de convocatoria */}
                    <label>Fin de convocatoria</label>
                    <input type="date" className="cm-input-date" />


                    {/* Requisitos */}
                    {/*
                    <label>Promedio acumulado:</label>
                    <input type="text" placeholder="4.5" className="cm-input-text-box"/>
                    <label>Promedio materia:</label>
                    <input type="text" placeholder="4.5" className="cm-input-text-box"/> */}

                    {/* Añadir nuevo requisito */}  
                   {/*  <label></label>
                    <Link to="#"></Link>

                    <label></label>
                    <Link to="#">¿Añadir nuevo requisito?</Link> */}
                    
                    {/* Botón de confirmación */}
                    <Link to="/" type="submit" className="cm-confirm-button">Confirmar</Link>
                </form>

            {/* Table starts */}

            <div className="main-container">
                <div className='table-main-container'>
                    <table className="table" id="table">
                        <thead>
                            <tr>
                                <th className="table-head"> Facultad </th>
                                <th className="table-head"> Programa </th>
                                <th className="table-head"> Materia/Curso </th>
                                <th className="table-head"> Periodo académico </th>
                                <th className="table-head"> Inicio de convocatoria</th>
                                <th className="table-head"> Fin de convocatoria</th>
                                <th className="table-head"> </th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td className="table-data"> Ingeniería, Diseño y Ciencias Aplicadas </td>
                                    <td className="table-data"> Ingeniería de Sistemas </td>
                                    <td className="table-data"> Computación en Internet I </td>
                                    <td className="table-data"> 2024-2 </td>
                                    <td className="table-data"> 01/11/2024 </td>
                                    <td className="table-data"> 20/11/2024 </td>
                                    <td className="table-data">
                                        <div className="requirement-container">
                                            <button className="edit-button">Editar</button>
                                            <button className="cancel-button">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                    </tbody>
                    </table>
                </div>

            <div className="div-pagination">
                <div className="pagination-info">
                    Mostrando {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, records.length)} de {records.length} resultados
                </div>

                <div className="main-pagination">
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Table ends */}

            </div>
        </div>
    );
}

export default CreateMonitoria;


