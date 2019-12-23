import {GET_TRACK_INFO, TRACK_ERROR} from '../actions/actionTypes'

const initialState = {
    info: {
        status: null
    },
    error: {},
    trackID: ''
};

export default function(state = initialState, {type, payload}) {
    switch (type){
        case GET_TRACK_INFO:
            return ({
                ...state,
                info:payload.info,
                trackID:payload.trackID
            });
        case TRACK_ERROR:
            return ({
                ...state,
                error:payload
            });
        default:
            return state
    }
}