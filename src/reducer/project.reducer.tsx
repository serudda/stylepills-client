/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/project.action';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IProjectState {
    created: {
        projectId?: number;
        isCreated: boolean;
    };
    message?: string;
}


/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IProjectState = {
    created: {
        projectId: null,
        isCreated: false
    }
};

// -----------------------------------


/** 
 * @desc This function takes Project actions and return a new state 
 * @param {IProjectState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IProjectState} 
 */
export default function (state: IProjectState = defaultState, action: Action): IProjectState {

    switch (action.type) {

        /***********************************/
        /*           ATOM ACTIONS          */
        /***********************************/

        case types.CLEAR_PROJECT_STATE: {
            return {
                ...state,
                created: {
                    ...state.created,
                    projectId: null,
                    isCreated: false
                }
            };
        }

        case types.CREATE_PROJECT_REQUEST: {
            return {
                ...state,
                created: { 
                    isCreated: false
                }
            };
        }

        case types.CREATE_PROJECT_SUCCESS: {
            return {
                ...state,
                created: {
                    ...state.created,
                    projectId: action.created.projectId,
                    isCreated: true
                }
            };
        }

        case types.CREATE_PROJECT_FAILURE: {
            return {
                ...state,
                created: {
                    isCreated: false
                },
                message: action.message
            };
        }
            
        default:
            return state;  
    }
}
