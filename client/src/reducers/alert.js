import {REMOVE_ALERT, ADD_ALERT} from '../actions/actionTypes'

const initialState = [];

export default function (state = initialState, {type, payload}) {
    switch (type){
        case ADD_ALERT:
            return ([
                ...state,
                payload
            ]);
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state
    }
}