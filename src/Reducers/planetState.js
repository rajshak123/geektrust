import { initialAppState } from './initialState';
import { LOAD_PLANET_SUCCESS } from '../Actions/constants';


export default function PlanetReduer(state  = initialAppState.planets, action) {
    switch (action.type) {
        case LOAD_PLANET_SUCCESS:
        return Object.assign([], action.data);
        default:
        return state;
    }
}