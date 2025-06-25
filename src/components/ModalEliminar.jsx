import React, { useState } from 'react';
import './Modal.css';

const ModalEliminar = ({ visible, onClose, onDelete }) => {
  const [id, setId] = useState('');

  if (!visible) return null;

  const handleEliminar = () => {
    onDelete(id);
    setId('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Eliminar Usuario</h3>
        <input
          type="text"
          placeholder="Ingrese ID a eliminar"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleEliminar}>Eliminar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalEliminar;