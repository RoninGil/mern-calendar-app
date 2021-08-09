import React from 'react';
import { useDispatch } from 'react-redux';
import { calendarCleanActive, calendarDeleteEvent } from '../../actions/calendar';

export const DeleteEventFab = () => {

    // const {activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const handleDeleteEvent = () => {
        dispatch(calendarDeleteEvent());
    }

    return (
        <button 
        onClick={handleDeleteEvent}
        className="btn btn-danger fab-danger"
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    )
}
