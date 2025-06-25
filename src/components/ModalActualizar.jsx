import React, { useState } from 'react';
import './Modal.css';

const ModalActualizar = ({ visible, onClose, onBuscar, reserva, onActualizar }) => {
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(null);

  if (!visible) return null;

  const buscar = () => {
    onBuscar(id);
    setEdit(reserva);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onActualizar(edit);
    setId('');
    setEdit(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {!edit ? (
          <>
            <h3>Actualizar Usuario</h3>
            <input
              type="text"
              placeholder="Ingrese ID a actualizar"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={buscar}>Buscar</button>
            <button onClick={onClose}>Cerrar</button>
          </>
        ) : (
          <>
            <h3>Editar Información</h3>
            <input name="nombre" value={edit.nombre} onChange={handleChange} />
            <input name="fechaLlegada" value={edit.fechaLlegada} onChange={handleChange} />
            <input name="horaLlegada" value={edit.horaLlegada} onChange={handleChange} />
            <input name="personas" value={edit.personas} onChange={handleChange} />
            <input name="email" value={edit.email} onChange={handleChange} />
            <input name="telefono" value={edit.telefono} onChange={handleChange} />
            <textarea name="notas" value={edit.notas} onChange={handleChange} />
            <button onClick={handleUpdate}>Actualizar</button>
            <button onClick={onClose}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalActualizar;
