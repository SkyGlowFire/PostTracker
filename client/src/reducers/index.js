import {combineReducers} from 'redux'
import main from './main'
import alert from './alert'
import auth from './auth'

export default combineReducers({
    main,
    alert,
    auth
})