import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../actions/auth";

const Navbar = ({isAuthenticated, logout}) => {
    const guestLinks = (
        <ul>
            <li>
                <Link to='/api/login'>Login</Link>
            </li>
            <li>
                <Link to='/api/register'>Register</Link>
            </li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li>
                <a href='' onClick={e => {e.preventDefault(); logout()}}>Logout</a>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>Main</Link>
            </h1>
            {!isAuthenticated ? guestLinks : authLinks}
        </nav>
    );
};

Navbar.propTypes = {

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Navbar);
