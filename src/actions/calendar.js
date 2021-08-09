import { types } from "../types/types"


export const calendarSetActive = (event) => {
    return {
        type: types.calendarSetActive,
        payload: event
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

export const calendarUpdateEvent = (event) => {
    return {
        type: types.calendarUpdateEvent,
        payload: event
    }
}

export const calendarDeleteEvent = () => {
    return {
        type: types.calendarDeleteEvent
    }
}