import { initialAppState } from './initialState';
import { LOAD_VEHICLE_SUCCESS } from '../Actions/constants';

export default function VehicleReduer(state  = initialAppState.vehicles, action) {
    switch (action.type) {
        case LOAD_VEHICLE_SUCCESS:
        return Object.assign([], action.data);
        default:
        return state;
    }
}