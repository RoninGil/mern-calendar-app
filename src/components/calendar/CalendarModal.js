import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { calendarAddNew, calendarCleanActive, calendarUpdateEvent } from '../../actions/calendar';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endTime = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endTime.toDate()
}

//FUNCTION
export const CalendarModal = () => {
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

   const [dateStart, setDateStart] = useState(now.toDate());
   const [dateEnd, setDateEnd] = useState(endTime.toDate());
   const [titleValid, setTitleValid] = useState(true);

   const [formValues, setFormValues] = useState(initEvent);
   const { notes, title, start, end } = formValues;

   const momentStart = moment(start);
   const momentEnd = moment(end)

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent)
        }
        else{
            setFormValues( initEvent )
        }
    }, [activeEvent])

   const handleSubmitForm = (e) => {
       e.preventDefault();
       console.log(formValues)
       if (momentStart.isSameOrAfter(momentEnd)){
           console.log(momentStart, momentEnd)
           Swal.fire('Error', 'End date must be after Start date', 'error')
           return closeModal();
       }

       if (title.trim().length < 2){
           return setTitleValid(false);
       }

       if(activeEvent){
            dispatch(calendarUpdateEvent(formValues))
        } else{
           dispatch(calendarAddNew({
                ...formValues,
                id: new Date().getTime(),
                user:{
                    uid: '3as1df8asdf8',
                    name: 'Colosio'
                }
        }));
        }
       setTitleValid(true);
       closeModal();
   }

   const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
   }
   
    const closeModal = () => {
        //TODO: CERRAR MODAL
        dispatch(uiCloseModal());
        setFormValues(initEvent);
        dispatch(calendarCleanActive());
    }
    const handleStartDate = (e) => {
        console.log(e);
        setDateStart(e);
        setFormValues( {
            ...formValues,
            start: e
        } );
    }
    const handleEndDate = (e) => {
        console.log(e);
        setDateEnd(e);
        setFormValues( {
            ...formValues,
            end : e
        } );
    }

    return (
        <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
            <h1> {activeEvent ? 'Editar Evento' : 'Crear Evento'} </h1>
            <hr />
            <form 
            onSubmit={handleSubmitForm}
            className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDate}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDate}
                        value={dateEnd}
                        className="form-control"
                        minDate = {dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}
