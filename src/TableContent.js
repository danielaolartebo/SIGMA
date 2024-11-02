import './App.css';
import { useState, useEffect} from 'react';
import React from 'react';

function TableContent() {
    const [column, setColumn] = useState([]);
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6; // Número de registros por página

    // Mapeo de claves originales a nombres personalizados
    const columnNames = {
        id: "NRC",
        name: "Nombre de Monitoria",
        startPostulation: "Inicio de Convocatoria",
        endPostulation: "Fin de Convocatoria",
        requirement: "Requisitos"
    };

    useEffect(() => {
        fetch('http://localhost:3000/Data.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.monitoria && data.monitoria.length > 0) {
                    setColumn(Object.keys(data.monitoria[0]));
                    setRecords(data.monitoria); 
                } else {
                    console.error("Data format is incorrect or 'monitoria' is empty.");
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Calcula los registros de la página actual
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calcula el número total de páginas
    const totalPages = Math.ceil(records.length / recordsPerPage);

    // Función para ir a la página siguiente
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Función para ir a la página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="main-container">
            <div className='table-main-container'>
                <table className="table" id="table">
                    <thead>
                        <tr>
                            {column.map((c, i) => (
                                <th className="table-head" key={i}>
                                    {columnNames[c] || c}
                                </th>
                            ))}
                            <th className="table-head"> Aplicar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, i) => (
                            <tr key={i}>
                                <td className="table-data">{record.id}</td>
                                <td className="table-data">{record.name}</td>
                                <td className="table-data">{record.startPostulation}</td>
                                <td className="table-data">{record.endPostulation}</td>
                                <td className="table-data">
                                    <div className="requirement-container">
                                        <button className="view-button">Ver</button>
                                        <span className="requirement-text">
                                            {record.requirement.split('\n').map((line, index) => (
                                                <span key={index}>{line}<br /></span>
                                            ))}
                                        </span>
                                    </div>
                                </td>
                                <td className="table-data">
                                    <button className='apply-button'>Aplicar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="div-pagination">
                {/* Mostrar número de resultados */}
                <div className="pagination-info">
                    Mostrando {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, records.length)} de {records.length} resultados
                </div>

                {/* Controles de paginación */}
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
    );
}

export default TableContent;
