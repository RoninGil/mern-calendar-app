import React from 'react';
import { LoginPage } from '../components/auth/LoginPage';
import { CalendarPage } from '../components/calendar/CalendarPage';
import {
    Switch,
    Route
  } from "react-router-dom";

export const AppRouter = () => {
    return (
        <div>
            <Switch>
                
                <Route exact path ="/login" component = {LoginPage}>

                </Route>
                <Route exact path ="/" component = {CalendarPage}>

                </Route>
            </Switch>
            
        </div>
    )
}
