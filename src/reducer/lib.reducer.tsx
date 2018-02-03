/************************************/
/*           DEPENDENCIES           */
/************************************/
import { Action } from '../actions/ui.action';



/************************************/
/*            INTERFACES            */
/************************************/

export interface ILibState {}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: ILibState = {};

// -----------------------------------


/** 
 * @desc This function takes Lib actions and return a new state
 * @param {ILibState} [state=defaultState] 
 * @param {Action} action 
 * @returns {ILibState} 
 */
export default function (state: ILibState = defaultState, action: Action): ILibState {

    switch (action.type) {
            
        default:
            return state;  
    }
}