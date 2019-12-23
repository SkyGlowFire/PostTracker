import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../actions/auth";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to = '/'/>
    }

    return (
        <Fragment>
            <h1 className="text-primary large">Sign In</h1>
            <p className="lead">Log into your account</p>
            <form className="form"
                  onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" name="email" placeholder='Email'
                           onChange={e => onChange(e)} value={email}/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder='Password'
                           onChange={e => onChange(e)} value={password}/>
                </div>
                <input type="submit" value="Log in" className="btn btn-primary"/>
            </form>
            <p className="my-1">Dont have an account? <Link to='/register'>Sign up</Link></p>
        </Fragment>
    );
};

Login.propTypes = {

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {login})(Login);

