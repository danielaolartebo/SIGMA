import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';

function TableContent() {
    const [column, setColumn] = useState([]);
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;

    const columnNames = {
        id: "ID - CRN",
        school: "Facultad",
        program: "Programa",
        course: "Curso",
        start: "Inicio de Convocatoria",
        finish: "Fin de Convocatoria",
        averageGrade: "Promedio General",
        courseGrade: "Promedio de la Materia",
        semester: "Semestre",
        requirement: "Requisitos"
    };

    useEffect(() => {
        fetch('http://localhost:5433/monitoring/getA')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    setColumn(Object.keys(data[0]));
                    setRecords(data); 
                } else {
                    console.error("Data format is incorrect or 'monitoria' is empty.");
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleApplyClick = async (monitoringId,status) => {
        const data = {
            monitoringId:monitoringId,
            userId:localStorage.getItem('userId')
        }
        try{
            if(status === "Activo"){
                const response = await fetch('http://localhost:5433/candidature/create', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  });
                  
                if(response.ok){
                    console.log('A candidature have been created')
                }  
            }
            else{
                console.log('The time has expired')
            }
        }
        catch(error){
            console.error('Error in fetching', error)
        }
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

    const checkStatus = (startPostulation, endPostulation) => {
        const currentDate = new Date();
        const startDate = new Date(startPostulation?.split('/').reverse().join('-'));
        const endDate = new Date(endPostulation?.split('/').reverse().join('-'));
    
        if (currentDate >= startDate && currentDate <= endDate) {
            return { className: "status-active", text: "Activo" };
        } else {
            return { className: "status-inactive", text: "Vencido" };
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
                            <th className="table-head"> Estado </th>
                            <th className="table-head"> ¿Interesad@? </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, i) => {
                            const status = checkStatus(record.start, record.end);
                            return (
                                <tr key={i}>
                                    <td className="table-data">{record.id}</td>
                                    <td className="table-data">{record.school.name}</td>
                                    <td className="table-data">{record.program.name}</td>
                                    <td className="table-data">{record.course.name}</td>
                                    <td className="table-data">{Date(record.start)}</td>
                                    <td className="table-data">{Date(record.end)}</td>
                                    <td className="table-data">{record.averageGrade}</td>
                                    <td className="table-data">{record.courseGrade}</td>
                                    <td className="table-data">{record.semester}</td>
                        
                                    <td className="table-data">
                                        <div className={status.className}>
                                            {status.text}
                                        </div>
                                    </td>
                                    <td className="table-data">
                                        <div className="apply-button" onClick={() => handleApplyClick(record.id, status.text)}>Aplicar</div>
                                    </td>
                                </tr>
                            );
                        })}
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
    );
}

export default TableContent;


