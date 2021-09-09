import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños!',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'comprar pastel!',
//     user: {
//         uid: 'sdf5g4sd5f4g8',
//         name: 'Carlos Gil'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.calendarAddNew:
            return{
                ...state,
                events: [...state.events, action.payload]
            }

        case types.calendarSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.calendarCleanActive:
            return {
                ...state,
                activeEvent: null
            }
        case types.calendarCleanAll:
            return {
                ...initialState
            }
        case types.calendarUpdateEvent:
            return {
                ...state,
                events: state.events.map( event => {
                    return event.id === action.payload.id ? action.payload : event
                })
            }
        case types.calendarDeleteEvent:
            return {
                ...state,
                events: state.events.filter( event => {
                    return event.id !== state.activeEvent.id 
                }),
                activeEvent: null
            }
        case types.calendarLoaded:
        return{
            ...state,
            events: [...action.payload]
        }
    
        default:
            return state;
    }
}