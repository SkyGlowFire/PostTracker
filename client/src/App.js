import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Navbar from './components/layout/Navbar'
import Routes from './components/routing/Routes'
import {loadUser} from "./actions/auth";


//Redux
import {Provider} from 'react-redux';
import store from './store'

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store = {store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Routes/>
                </Fragment>
            </Router>
        </Provider>
    );
};



export default App