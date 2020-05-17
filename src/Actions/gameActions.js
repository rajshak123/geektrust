
import { PUBLISH_RESULT, RESET_GAME } from './constants';
import { token, gameResult } from '../common/Service/api';

export const findFalconeResults = (data) => {
    return (dispatch) => {
        return token().then((token) => {
              data.token = token;
              return gameResult(data);
            }).catch(error => 
                (console.error(`Error while fetching token`, error)))
    };
};
export const publishResult = (data) => ({type: PUBLISH_RESULT, data});
export const resetGame = () => ({type: RESET_GAME});