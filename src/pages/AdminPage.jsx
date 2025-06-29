import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date('2025-06-27'));
  const [selectedDate, setSelectedDate] = useState('2025-06-27');
  const [reservas, setReservas] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit', 'delete'
  const [currentReserva, setCurrentReserva] = useState(null);
  const [formData, setFormData] = useState({
    mesa: '',
    hora: '',
    cliente: '',
    comensales: ''
  });

  // Datos iniciales 
  useEffect(() => {
    setReservas({
      '2025-06-27': [
        { id: 1, mesa: 1, hora: '15:00', cliente: 'Pedro', comensales: 2 },
        { id: 2, mesa: 2, hora: '15:00', cliente: 'Juan', comensales: 5 },
        { id: 3, mesa: 3, hora: '15:00', cliente: 'Ana', comensales: 3 }
      ]
    });
  }, []);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysInMonth = lastDay.getDate();
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    const weeks = [];
    let day = 1;
    let nextMonthDay = 1;
    
    for (let i = 0; i < 6; i++) {
      const days = [];
      
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          days.push(prevMonthLastDay - (startDay - j - 1));
        } else if (day > daysInMonth) {
          days.push(nextMonthDay++);
        } else {
          days.push(day++);
        }
      }
      
      if (i > 0 && days[0] > daysInMonth) break;
      weeks.push(days);
    }
    
    return weeks;
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  };

  const openModal = (type, reserva = null) => {
    setModalType(type);
    setCurrentReserva(reserva);
    
    if (type === 'edit' && reserva) {
      setFormData({
        mesa: reserva.mesa,
        hora: reserva.hora,
        cliente: reserva.cliente,
        comensales: reserva.comensales
      });
    } else if (type === 'create') {
      setFormData({
        mesa: '',
        hora: '',
        cliente: '',
        comensales: ''
      });
    }
    
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'create') {
      const newReserva = {
        id: Date.now(), // ID temporal
        mesa: parseInt(formData.mesa),
        hora: formData.hora,
        cliente: formData.cliente,
        comensales: parseInt(formData.comensales)
      };
      
      setReservas(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newReserva]
      }));
    } else if (modalType === 'edit' && currentReserva) {
      setReservas(prev => ({
        ...prev,
        [selectedDate]: prev[selectedDate].map(r => 
          r.id === currentReserva.id ? { ...r, ...formData } : r
        )
      }));
    }
    
    setShowModal(false);
  };

  const handleDelete = () => {
    if (currentReserva) {
      setReservas(prev => ({
        ...prev,
        [selectedDate]: prev[selectedDate].filter(r => r.id !== currentReserva.id)
      }));
      setShowModal(false);
    }
  };

  const weeks = generateCalendar();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Calendario de Reservas (Vista Administrador)</h1>
        <button onClick={() => navigate('/')}>Cerrar Sesión</button>
      </div>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <div>LUN</div>
          <div>MAR</div>
          <div>MIÉ</div>
          <div>JUE</div>
          <div>VIE</div>
          <div>SÁB</div>
          <div>DOM</div>
        </div>
        
        {weeks.map((week, i) => (
          <div key={i} className="calendar-week">
            {week.map((day, j) => {
              const isCurrentMonth = !((i === 0 && day > 7) || (i >= 4 && day < 7));
              const dayClass = isCurrentMonth ? 'calendar-day' : 'calendar-day other-month';
              
              return (
                <div 
                  key={j} 
                  className={dayClass}
                  onClick={() => isCurrentMonth && handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="reservas-container">
        <div className="reservas-header">
          <h2>Reservas para {selectedDate}</h2>
          <button 
            className="add-reserva-btn"
            onClick={() => openModal('create')}
          >
            Nueva Reserva
          </button>
        </div>
        
        {reservas[selectedDate]?.length > 0 ? (
          <div className="reservas-list">
            {reservas[selectedDate].map((reserva) => (
              <div key={reserva.id} className="reserva-item">
                <div className="reserva-info">
                  <span>Mesa {reserva.mesa} — {reserva.hora}</span>
                  <span>{reserva.cliente} ({reserva.comensales} personas)</span>
                </div>
                <div className="reserva-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => openModal('edit', reserva)}
                  >
                    Editar
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => openModal('delete', reserva)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay reservas para esta fecha.</p>
        )}
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>
                {modalType === 'create' && 'Nueva Reserva'}
                {modalType === 'edit' && 'Editar Reserva'}
                {modalType === 'delete' && 'Confirmar Eliminación'}
              </h3>
              <button 
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              {modalType === 'delete' ? (
                <div>
                  <p>¿Estás seguro de eliminar la reserva de {currentReserva?.cliente}?</p>
                  <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowModal(false)}>
                      Cancelar
                    </button>
                    <button className="confirm-delete-btn" onClick={handleDelete}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Mesa:</label>
                    <input
                      type="number"
                      name="mesa"
                      value={formData.mesa}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Hora:</label>
                    <input
                      type="time"
                      name="hora"
                      value={formData.hora}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Cliente:</label>
                    <input
                      type="text"
                      name="cliente"
                      value={formData.cliente}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Comensales:</label>
                    <input
                      type="number"
                      name="comensales"
                      value={formData.comensales}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="confirm-btn">
                      {modalType === 'create' ? 'Crear' : 'Actualizar'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;