import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from '../actions/actionTypes'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated:true,
                loading:false
            };
        default: return state;
    }
}

