/************************************/
/*           DEPENDENCIES           */
/************************************/
import axios from 'axios';

import * as types from '../constants/action.types';

import { config } from './../config/config';

import { User } from '../models/user/user.model';


// -----------------------------------

// Get server config object
const serverConfig = config.getServerConfig();


/************************************/
/*            INTERFACES            */
/************************************/

export interface ISetCurrentUserAction {
    type: types.SET_CURRENT_USER;
    user: User;
}


export type Action =
    // Auth interaction
    ISetCurrentUserAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, SET_CURRENT_USER to set current user into Store
 * @function setCurrentUserAction
 * @returns {Action}
 */
export const setCurrentUserAction = (user: User): Action => {
    return {
        type: types.SET_CURRENT_USER,
        user
    };
};


/**
 * @desc Request access with Google Auth
 * @function logInWithGoogleAction
 * @returns {Promise<any>}
 */
export const logInWithGoogleAction = () => {
    return (dispatch: Function) => {
        return axios.get(serverConfig.authGoogleUrl)
        .then(
            (response) => {
                // tslint:disable-next-line:no-console
                console.log('RESPONSE: ', response);
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
};