import React from 'react';
import {Switch, Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import Main from "../Main";
import Register from '../auth/Register'
import Alert from '../layout/Alert'
import Login from "../auth/Login";

const Routes = props => {
    return (
        <section className="container">
            <Alert/>
            <Switch>
                <Route exact path='/' component = {Main}/>
                <Route exact path='/api/register' component = {Register}/>
                <Route exact path='/api/login' component = {Login}/>
            </Switch>
        </section>
    );
};

Routes.propTypes = {

};

export default Routes;
