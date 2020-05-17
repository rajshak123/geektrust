import { getVehicles } from '../common/Service/api';
import { LOAD_VEHICLE_SUCCESS } from './constants';

export const loadVehiclesSuccess = (data) => ({ type: LOAD_VEHICLE_SUCCESS, data });

export const loadVehicles = () => {
    return (dispatch) => {
        return getVehicles().then((vehicles) => 
        dispatch(loadVehiclesSuccess(vehicles)))
        .catch(error => {throw(error);
        });
    };
};
