import './App.css';
import React from 'react';
import Navbar from './Navbar'; 
import TableContent from './TableContent';
import Dropdown from './Filters';
import Login from './Login'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  // Hook para obtener la ruta actual
  const location = useLocation();

  return (
    <div className="App">
      {/* Mostrar Navbar solo si no estamos en /Login */}
      {location.pathname !== '/Login' && <Navbar />}
      
      <Routes>
        {/* Ruta predeterminada */}
        <Route path="/" element={
          <>
            {/* Title begins */}
            <div className="title-container" id="title-container">
              <div className="title" id="title">
                  Postulación a Monitor
              </div>
            </div>
            {/* Title ends */}

            {/* Filter starts */}
            <Dropdown />
            {/* Filter ends */}

            {/* TableContent begins */}
            <TableContent />
            {/* TableContent ends */}
          </>
        } />

        {/* Ruta para Login */}
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

// Envolver App en Router para que useLocation funcione correctamente
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}


