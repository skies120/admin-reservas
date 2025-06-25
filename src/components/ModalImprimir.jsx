import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Modal.css';

const ModalImprimir = ({ visible, onClose, data }) => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Imprimir Datos</h3>
        <div ref={printRef} style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Personas</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.nombre}</td>
                  <td>{r.fechaLlegada}</td>
                  <td>{r.horaLlegada}</td>
                  <td>{r.personas}</td>
                  <td>{r.email}</td>
                  <td>{r.telefono}</td>
                  <td>{r.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handlePrint}>Imprimir</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalImprimir;