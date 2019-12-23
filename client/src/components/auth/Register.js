import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";

const Register = ({register, setAlert, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        confirmPass:''
    });

    const {email, password, confirmPass} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmPass) {setAlert('Пароли должны совпадать', 'danger')}
        else {
            const newUser = {
                email, password
            };
            register(newUser)
        }
    };

    if (isAuthenticated) {
        return <Redirect to = '/'/>
    }

    return (
        <Fragment>
            <h1 className="text-primary large">Sign Up</h1>
            <p className="lead">Create your account</p>
            <form className="form"
                  onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" name="email" placeholder='Email'
                           onChange={e => onChange(e)} value={email}/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder='Password'
                           onChange={e => onChange(e)} value={password}/>
                    <small className="form-text">Password should be minimum 6 characters length</small>
                </div>
                <div className="form-group">
                    <input type="password" name="confirmPass" placeholder='Confirm your password'
                           onChange={e => onChange(e) } value={confirmPass}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary"/>
            </form>
            <p className="my-1">Already have an account? <Link to='/login'>Sign in</Link></p>
        </Fragment>
    );
};

Register.propTypes = {

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, setAlert})(Register);
