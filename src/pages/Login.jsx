import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (correo === 'admin' && clave === 'admin123') {
      navigate('/admin');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <label>Correo de Admin</label>
        <input
          type="text"
          placeholder="admin"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="admin123"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default Login;