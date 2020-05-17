import { getPlanets } from '../common/Service/api';
import { LOAD_PLANET_SUCCESS } from './constants';

export const loadPlanetsSuccess = (data) => ({ type: LOAD_PLANET_SUCCESS, data });

export const loadPlanets = () => {
    return (dispatch) => {
        return getPlanets().then( (planets) => 
        dispatch(loadPlanetsSuccess(planets)))
        .catch(error => {throw(error);
        });
    };
};
