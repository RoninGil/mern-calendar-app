import { types } from "../types/types"
import {fetchWithToken} from "../helpers/fetch.js"
import { prepareEvents } from "../helpers/prepareEvents"
import Swal from "sweetalert2"

export const calendarSetActive = (event) => {
    return {
        type: types.calendarSetActive,
        payload: event
    }
}

export const startCalendarAddNew = (event) => {
    return async(dispatch, getState) => {

        const{uid, name} = getState().auth;
        try {
            const resp = await fetchWithToken(`events`, event, 'POST');
            const body = await resp.json();
            
            if (body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(calendarAddNew(event));
            }
        } catch (error) {
            
        }
    }
}

export const calendarAddNew = (event) => {
    return {
        type: types.calendarAddNew,
        payload: event
    }
}

export const calendarCleanActive = () => {
    return {
        type: types.calendarCleanActive
    }
}

export const calendarCleanAll = () => {
    return {
        type: types.calendarCleanAll
    }
}

export const startCalendarUpdateEvent = (event) => {
    return async (dispatch, getState)=>{
        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            if (body.ok){
                dispatch(calendarUpdateEvent(event));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            
        }
    }
}

export const calendarUpdateEvent = (event) => {
    return {
        type: types.calendarUpdateEvent,
        payload: event
    }
}

export const startCalendarDeleteEvent = (event) => {
    return async (dispatch, getState) =>{
        const {id}=getState().calendar.activeEvent;
        try {
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            
            if(body.ok){
                dispatch(calendarDeleteEvent())
            }else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const calendarDeleteEvent = () => {
    return {
        type: types.calendarDeleteEvent
    }
}

export const calendarStartLoading = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.eventos);
            
            dispatch(calendarLoaded(events));
        } catch (error) {
            
        }
    }
}

export const calendarLoaded = (events) => {
    return {
        type: types.calendarLoaded,
        payload: events
    }
}