/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../constants/action.types';
import { Action } from '../actions/auth.action';
import { User } from '../models/user/user.model';
import * as lodash from 'lodash';

/************************************/
/*            INTERFACES            */
/************************************/

export interface IAuthState {
    isAuthenticated: boolean;
    user: User;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IAuthState = {
    isAuthenticated: false,
    user: null
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
        /*            UI ACTIONS           */
        /***********************************/

        case types.SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !lodash.isEmpty(action.user), 
                user: action.user
            };
        }
            
        default:
            return state;  
    }
}