import { combineReducers } from "redux";
import greeting from './greeting';
import menu from './menu';

export default combineReducers({
    greeting,
    menu
})