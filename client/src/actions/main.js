import {GET_TRACK_INFO, TRACK_ERROR} from '../actions/actionTypes'
import axios from 'axios'

//Get Track Info
export const getTrackInfo = (trackNumber, isAuthenticated, userId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/main', {trackNumber, isAuthenticated, userId}, config );

        dispatch({
            type: GET_TRACK_INFO,
            payload: {info:res.data, trackID: trackNumber}
        })
    } catch (err) {
        dispatch({
            type: TRACK_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }


};