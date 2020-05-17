import { combineReducers } from 'redux';
import result  from './resultState';
import planets  from './planetState';
import vehicles  from './vehicleState';



export const reducers = combineReducers({
    result,
    planets,
    vehicles
});
