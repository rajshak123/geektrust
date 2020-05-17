import  { initialAppState } from './initialState';
import {  PUBLISH_RESULT, RESET_GAME } from '../Actions/constants';


export default function result(state = initialAppState.result, action) {
    switch (action.type) {
        case PUBLISH_RESULT: {
            return action.data;
        }
        case RESET_GAME:
            return initialAppState.result;
        default:
            return state;
    }
}
