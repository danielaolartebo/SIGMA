import React, { useState, useEffect } from 'react';

function Dropdown() {
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
        <div className="filter">
            <div className="filter-container">
                {/* Faculty Dropdown */}
                <select className="faculty"
                    id="faculty-dropdown" 
                    value={selectedFaculty} 
                    onChange={handleFacultyChange}
                >
                    <option value=""> Facultad </option>
                    {faculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                        </option>
                    ))}
                </select>

                {/* Program Dropdown */}
                <select className="program"
                    id="program-dropdown" 
                    value={selectedProgram} 
                    onChange={handleProgramChange}
                >
                    <option value=""> Programa </option>
                    {programs.map(program => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Dropdown;