import {REMOVE_ALERT, ADD_ALERT} from '../actions/actionTypes'
import uuid from 'uuid'

export const setAlert = (msg, type, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch ({
        type: ADD_ALERT,
        payload: {msg, type, id}
    });
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout)
};
