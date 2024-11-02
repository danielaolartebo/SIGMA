import './Login.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';

function Login() {
    const navigate = useNavigate();

    const handleReturnClick = () => {
        navigate('/'); // Redirige a la página principal
    };

    const handleLoginClick = () => {
      navigate('/Task'); // Redirige a la página principal
  };

    useEffect(() => {
        // Añadir clase al body cuando el componente Login se monta
        document.body.classList.add('login-background');
        
        // Remover la clase cuando el componente Login se desmonta
        return () => {
          document.body.classList.remove('login-background');
        };
      }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar-login" id="navbar-login">
        <button className="return-btn-login" id="return-btn-login" onClick={handleReturnClick}> ← </button>
      </nav>
      
      {/* Main Login Form */}
      <div className="login-container">
        <div className="main-login">
            <form>
                <img src={logo} alt="Logo" className="logo-login"/>
                <div className="inputs-container">
                    <input className="inputs-login" type="text" name="user" placeholder=" Usuario" required />
                    <input className="inputs-login" type="password" name="pswd" placeholder=" Clave" required />
                </div>
                <div className="login-btn-container-login">
                    <button className="login-btn-login" id="login-btn-login" type="submit" onClick={handleLoginClick}>Iniciar sesión</button>
                </div>
            </form>
        </div>
       </div>
    </div>
  );
}

export default Login;
