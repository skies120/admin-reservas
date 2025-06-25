import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservas as datosIniciales } from '../data/reservasData';
import ModalEliminar from '../components/ModalEliminar';
import ModalActualizar from '../components/ModalActualizar';
import ModalImprimir from '../components/ModalImprimir';
import './AdminPage.css';
import '../components/Modal.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [datos, setDatos] = useState(datosIniciales);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);
  const [showImprimir, setShowImprimir] = useState(false);
  const [reservaActualizar, setReservaActualizar] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const eliminarReserva = (id) => {
    setDatos(prev => prev.filter(r => r.id !== parseInt(id)));
    setShowEliminar(false);
    setSelectedId(null);
  };

  const buscarReserva = (id) => {
    const r = datos.find(r => r.id === parseInt(id));
    if (r) {
      setReservaActualizar(r);
    }
  };

  const actualizarReserva = (reservaActualizada) => {
    setDatos(prev => prev.map(r => r.id === reservaActualizada.id ? reservaActualizada : r));
    setShowActualizar(false);
    setReservaActualizar(null);
  };

  const filtered = datos.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.telefono.includes(search) ||
    r.id.toString().includes(search)
  );

  return (
    <div className="admin-page">
      <div className="navbar">
        <span>Reservas</span>
        <button onClick={() => navigate('/')}>Cerrar Sesión</button>
      </div>

      <input className="search" placeholder="BUSCAR" value={search} onChange={e => setSearch(e.target.value)} />

      <div className="table">
        <div className="header">
          <span>ID</span><span>NOMBRE</span><span>F. LLEGADA</span><span>H. LLEGADA</span>
          <span>PERSONAS</span><span>EMAIL</span><span>TELEFONOS</span><span>NOTAS</span>
        </div>
        {filtered.map(r => (
          <div
            className={`row ${selectedId === r.id ? 'selected-row' : ''}`}
            key={r.id}
            onClick={() => setSelectedId(r.id)}
          >
            <span>{r.id}</span>
            <span>{r.nombre}</span>
            <span>{r.fechaLlegada}</span>
            <span>{r.horaLlegada}</span>
            <span>{r.personas}</span>
            <span>{r.email}</span>
            <span>{r.telefono}</span>
            <span>{r.notas}</span>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="blue" onClick={() => setShowEliminar(true)}>Eliminar</button>
        <button className="blue" onClick={() => setShowActualizar(true)}>Actualizar</button>
        <button className="blue" onClick={() => setShowImprimir(true)}>Imprimir</button>
      </div>

      <ModalEliminar visible={showEliminar} onClose={() => setShowEliminar(false)} onDelete={eliminarReserva} />
      <ModalActualizar visible={showActualizar} onClose={() => { setShowActualizar(false); setReservaActualizar(null); }} onBuscar={buscarReserva} reserva={reservaActualizar} onActualizar={actualizarReserva} />
      <ModalImprimir visible={showImprimir} onClose={() => setShowImprimir(false)} data={datos} />
    </div>
  );
};

export default AdminPage;