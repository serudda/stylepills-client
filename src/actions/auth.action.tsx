/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import axios from 'axios';

import * as types from '../constants/action.types';

import { config } from './../config/config';

// import { setAuthorizationToken } from '../auth/auth';



// -----------------------------------

// Get server config object
const serverConfig = config.getServerConfig();


/************************************/
/*            INTERFACES            */
/************************************/

export interface IRequestLoginAction {
    type: types.LOGIN_REQUEST;
    loading: boolean;
    isAuthenticated: boolean;
    meta: {
        analytics: {
            eventType: string,
            eventPayload: {
                event: string,
                properties: {
                    isAuthenticated: boolean
                },
            },
        },
    };
}

export interface IReceiveLoginAction {
    type: types.LOGIN_SUCCESS;
    loading: boolean;
    isAuthenticated: boolean;
    userId: string;
    meta: {
        analytics: {
            eventType: string,
            eventPayload: {
                userId: string
            }
        },
    };
}

export interface IRequestLogoutAction {
    type: types.LOGOUT_REQUEST;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface IReceiveLogoutAction {
    type: types.LOGOUT_SUCCESS;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface ILogoutFailureAction {
    type: types.LOGOUT_FAILURE;
    loading: boolean;
    isAuthenticated: boolean;
    message: string;
}


export type Action =
    // Auth interaction
    IRequestLoginAction
|   IReceiveLoginAction
|   IRequestLogoutAction
|   IReceiveLogoutAction
|   ILogoutFailureAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Request access with Google Auth (Axios version)
 * @function logInWithGoogleAction
 * @returns {Promise<any>}
 */
/* export const logInWithGoogleAction = () => {
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
};*/


/**
 * @desc Return an action type, LOGIN_REQUEST to start log in process
 * @function requestLoginAction
 * @returns {Action}
 */
export const requestLoginAction = (): Action => {
    return {
        type: types.LOGIN_REQUEST,
        loading: true,
        isAuthenticated: false,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.LOGIN_REQUEST,
                    properties: {
                        isAuthenticated: false
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, LOGIN_SUCCESS after a successful log in process
 * @function receiveLoginAction
 * @returns {Action}
 */
export const receiveLoginAction = (userId: string): Action => {
    return {
        type: types.LOGIN_SUCCESS,
        loading: false,
        isAuthenticated: true,
        userId,
        meta: {
            analytics: {
                eventType: EventTypes.identify,
                eventPayload: {
                    userId
                }
            }
        }
    };
};


/**
 * @desc Run action to set token and user id on Store
 * @function setTokenAndIdAction
 * @returns {Promise<any>}
 */
export const setTokenAndIdAction = (token: string, id: string) => {
    return (dispatch: Function) => {
        dispatch(requestLoginAction());
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        dispatch(receiveLoginAction(id));
    };
};


/**
 * @desc Return an action type, LOGOUT_REQUEST to start logout process
 * @function requestLogoutAction
 * @returns {Action}
 */
export const requestLogoutAction = (): Action => {
    return {
        type: types.LOGOUT_REQUEST,
        loading: true,
        isAuthenticated: true
    };
};


/**
 * @desc Return an action type, LOGOUT_SUCCESS after a successful logout process
 * @function receiveLogoutAction
 * @returns {Action}
 */
export const receiveLogoutAction = (): Action => {
    return {
        type: types.LOGOUT_SUCCESS,
        loading: false,
        isAuthenticated: false
    };
};


/**
 * @desc Return an action type, LOGOUT_FAILURE after a failure logout process
 * @function logoutFailureAction
 * @returns {Action}
 */
export const logoutFailureAction = (message: string): Action => {
    return {
        type: types.LOGOUT_FAILURE,
        loading: false,
        isAuthenticated: true,
        message
    };
};


/**
 * @desc Current user requested Log out 
 * @function logoutAction
 * @returns {Promise<any>}
 */

export const logoutAction = () => {
    return (dispatch: Function) => {

        // Request Logout
        dispatch(requestLogoutAction());
        
        // Remove Access Token and currentId in localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Remove Access Token from header requests
        // setAuthorizationToken(false);

        // Request logout on server side
        return axios.get(serverConfig.authLogoutUrl)
        .then(
            (response: any) => {

                if (response.data.status !== 'OK') {
                    // Logout Failure
                    dispatch(logoutFailureAction(response.message));
                } else {
                    // Logout Received
                    dispatch(receiveLogoutAction());
                    return response;
                }
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