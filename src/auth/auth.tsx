/************************************/
/*           DEPENDENCIES           */
/************************************/
import { config } from './../config/config';
import axios from 'axios';

// -----------------------------------

// Get server config object
const serverConfig = config.getServerConfig();


/************************************/
/*            INTERFACES            */
/************************************/

export interface IAuth {
    logInWithGoogle: () => Promise<any>;
}


/************************************/
/*            FUNCTIONS             */
/************************************/


/**
 * @desc Request access with Google Auth
 * @function logInWithGoogle
 * @returns {Promise<any>}
 */
export function logInWithGoogle() {
    return (dispatch: Function) => {
        return axios.get(serverConfig.authGoogleUrl)
        .then(
            (response) => {
                return response;
            }
        ).catch(
            (err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
                return err;
            }
        );
    };
}