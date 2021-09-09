import Swal from "sweetalert2";
import { fetchNoToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";
import { calendarCleanAll } from "./calendar";



export const startLogin = (email, password) => {
    return async(dispatch) => {
        const resp = await fetchNoToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(userLogin({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetchNoToken('auth/new', {name, email, password}, 'POST');
        const body = await resp.json();

        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(userLogin({
                uid: body.uid,
                name: body.name
            }))
        } else{
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(userLogin({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinished())
        }
    }
}
export const checkingFinished = () => {
    return {
        type: types.authCheckingFinish
    }
}

export const userLogin = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(userLogout());
        dispatch(calendarCleanAll());
    }
}

export const userLogout = () => {
    return {
        type: types.authLogout
    }
}