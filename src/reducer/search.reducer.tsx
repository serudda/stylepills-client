/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../constants/action.types';
import { Action } from '../actions/search.action';


/************************************/
/*            INTERFACES            */
/************************************/
/* TODO: Analizar por que ahora el Store tiene un search global, pero deberia tener un
   search por cada tipo: searchAtoms, searchCategories, searchUsers, etc. */
export interface ISearchState {
    searchTerm: string;
    atomCategoryId: number;
    sortBy: string;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: ISearchState = {
    searchTerm: '',
    atomCategoryId: null,
    sortBy: 'created_at'
};

// -----------------------------------


/** 
 * @desc This function takes Search actions and return a new state 
 * @param {ISearchState} [state=defaultState] 
 * @param {Action} action 
 * @returns {ISearchState} 
 */
export default function (state: ISearchState = defaultState, action: Action): ISearchState {

    switch (action.type) {

        /***********************************/
        /*       SEARCH ATOMS ACTIONS      */
        /***********************************/

        case types.SEARCH_ATOMS: {
            return {
                ...state, 
                searchTerm: action.searchTerm, 
                atomCategoryId: action.atomCategoryId, 
                sortBy: action.sortBy
            };
        }
            
        default:
            return state;  
    }
}
