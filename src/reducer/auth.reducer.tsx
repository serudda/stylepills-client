/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/auth.action';
import { User } from '../models/user/user.model';

/************************************/
/*            INTERFACES            */
/************************************/

export interface IAuthState {
    loading: boolean;
    isAuthenticated: boolean;
    user?: User;
    message?: string;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IAuthState = {
    loading: false,
    isAuthenticated: !!localStorage.getItem('token')
};

// -----------------------------------


/** 
 * @desc This function takes Auth actions and return a new state 
 * @param {IAuthState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IAuthState} 
 */
export default function (state: IAuthState = defaultState, action: Action): IAuthState {

    switch (action.type) {

        /***********************************/
        /*           AUTH ACTIONS          */
        /***********************************/

        case types.LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        }

        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.user
            };
        }

        case types.LOGOUT_REQUEST: {
            return {
                ...state,
                loading: true,
                isAuthenticated: true
            };
        }

        case types.LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };
        }

        case types.LOGOUT_FAILURE: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.message
            };
        }
            
        default:
            return state;  
    }
}