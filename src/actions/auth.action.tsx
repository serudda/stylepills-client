/************************************/
/*           DEPENDENCIES           */
/************************************/
import axios from 'axios';

import * as types from '../constants/action.types';

import { config } from './../config/config';

import { setAuthorizationToken } from '../auth/auth';

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


/**
 * @desc request Log out 
 * @function logoutAction
 * @returns {Promise<any>}
 */
export const logoutAction = () => {
    return (dispatch: Function) => {
        
        // Remove Access Token and currentId in localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('currentId');

        // Remove Access Token from header requests
        setAuthorizationToken(false);

        // Remove User information in Store
        dispatch(setCurrentUserAction(null));

        // Request logout on server side
        return axios.get(serverConfig.authLogoutUrl)
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