import './Task.css';
import VerticalNavbar from './VerticalNavbar';
import './Login.css';
import React, { useEffect, useState } from 'react';

function Task() {
  // Estado para almacenar las actividades
  const [activities, setActivities] = useState([]);

  // Estado para controlar qué fila está expandida
  const [expandedRow, setExpandedRow] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8; // Número de filas por página

  // Función para alternar filas expandibles
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Función para manejar el cambio de página
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await fetch('http://localhost:3000/Activities.json'); 
      const jsonData = await data.json();
      setActivities(jsonData);
    };

    fetchActivities();
  }, []);

  

  // Calcular el índice de las filas a mostrar
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = activities.slice(indexOfFirstRow, indexOfLastRow);
  const [records, setRecords] = useState([]);
  const recordsPerPage = 2;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(activities.length / rowsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

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

   // Estados para los filtros
   const [semesterFilter, setSemesterFilter] = useState('');
   const [courseFilter, setCourseFilter] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('');
   const [assignedToFilter, setAssignedToFilter] = useState('');
   const [statusFilter, setStatusFilter] = useState('');

  // Generar opciones únicas para cada filtro
  const semesters = [...new Set(activities.map(activity => activity.semestre))];
  const courses = [...new Set(activities.map(activity => activity.curso))];
  const categories = [...new Set(activities.map(activity => activity.categoria))];
  const assignedTos = [...new Set(activities.map(activity => activity.asignadoA))];
  const statuses = [...new Set(activities.map(activity => activity.estado))];

  // Filtrar actividades según los filtros seleccionados
  const filteredActivities = activities.filter(activity => {
    return (
      (semesterFilter === '' || activity.semestre === semesterFilter) &&
      (courseFilter === '' || activity.curso === courseFilter) &&
      (categoryFilter === '' || activity.categoria === categoryFilter) &&
      (assignedToFilter === '' || activity.asignadoA === assignedToFilter) &&
      (statusFilter === '' || activity.estado === statusFilter)
    );
  });

  return (
    <div className="task-container">
      <VerticalNavbar />
      <div className="content">

        {/* Title starts*/}
        <div className="title-container" id="title-container">
          <div className="title" id="title">
            Historial de Actividades
          </div>
        </div>
        {/* Title ends*/}

        {/* Button create activity starts */}
        <div className="button-create-activity-container" id="button-create-activity-container">
          <button className="create-activity-btn" id="create-activity-btn">
            Crear actividad
          </button>
        </div>
        {/* Button create activity ends */}

        {/* Filter starts */}
        <div className="filter-container-activities">
          <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)}>
            <option value="">Semestre</option>
            {semesters.map((semestre, index) => (
              <option key={index} value={semestre}>{semestre}</option>
            ))}
          </select>

          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="">Curso</option>
            {courses.map((curso, index) => (
              <option key={index} value={curso}>{curso}</option>
            ))}
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">Categoría</option>
            {categories.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>

          <select value={assignedToFilter} onChange={(e) => setAssignedToFilter(e.target.value)}>
            <option value="">Asignado a</option>
            {assignedTos.map((asignadoA, index) => (
              <option key={index} value={asignadoA}>{asignadoA}</option>
            ))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Estado</option>
            {statuses.map((estado, index) => (
              <option key={index} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        {/* Filter ends */}

        {/* Tabla de actividades starts */}
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              <tr>
                <th>Nombre</th>
                <th>Curso</th>
                <th>Categoría</th>
                <th>Fecha Creación</th>
                <th>Fecha Entrega</th>
                <th>Creado por</th>
                <th>Asignado a</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((activity) => (
                <React.Fragment key={activity.id}>
                  <tr>
                    <td>{activity.nombre}</td>
                    <td>{activity.curso}</td>
                    <td>{activity.categoria}</td>
                    <td>{activity.fechaCreacion}</td>
                    <td>{activity.fechaEntrega}</td>
                    <td>{activity.creadoPor}</td>
                    <td>{activity.asignadoA}</td>
                    <td>{activity.estado}</td>
                    <td>
                      <span
                        className="table-actions"
                        onClick={() => toggleRow(activity.id)}
                      >
                        {expandedRow === activity.id ? "Ocultar" : "Ver más"}
                      </span>
                    </td>
                  </tr>
                  {expandedRow === activity.id && (
                    <tr>
                      <td colSpan="9" className="table-details">
                        <strong>Detalles:</strong> {activity.detalles}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
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
        {/* Tabla de actividades ends */}

      </div>
    </div>
  );
}

export default Task;


