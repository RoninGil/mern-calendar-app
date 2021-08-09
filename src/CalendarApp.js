import React from 'react'
import { AppRouter } from './router/AppRouter'
import {
    BrowserRouter as Router
  } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from './store/store';

export const CalendarApp = () => {
    return (
        <Provider store = {store}>
            <Router>
                <AppRouter/>
            </Router>
        </Provider>
        
    )
}
