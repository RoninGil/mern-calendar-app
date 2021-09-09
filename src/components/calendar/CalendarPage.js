import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-esp';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { calendarCleanActive, calendarSetActive, calendarStartLoading } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const myEventsList = [{
//     title: 'Cumpleaños!',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'comprar pastel!',
//     user: {
//         uid: 'sdf5g4sd5f4g8',
//         name: 'Carlos Gil'
//     }
// }];

export const CalendarPage = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calendarStartLoading())
    }, [dispatch])
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        dispatch(calendarSetActive(e));
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const onSelectSlot = (e) => {
        dispatch(calendarCleanActive());
    }
    
    const eventStyleGetter = ( event, start, end, isSelected ) => {
    

        const style={
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <NavBar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent= {onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot = {onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view = {lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal/>
            {activeEvent && <DeleteEventFab/>}
            <AddNewFab/>
            
        </div>
    )
}
