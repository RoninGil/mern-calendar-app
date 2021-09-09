import React, { useEffect } from 'react';
import { LoginPage } from '../components/auth/LoginPage';
import { CalendarPage } from '../components/calendar/CalendarPage';
import {
    Switch
  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const {checking, uid} = useSelector(state => state.auth)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking){
        return <h5>Hold on...</h5>
    }

    return (
        <div>
            <Switch>
                
                <PublicRoute 
                exact 
                path ="/login" 
                component = {LoginPage}
                isAuthenticated={!!uid}
                />
                <PrivateRoute exact path ="/" component = {CalendarPage} isAuthenticated={!!uid}/>
            </Switch>
            
        </div>
    )
}
