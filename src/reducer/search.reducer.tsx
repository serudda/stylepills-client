/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/search.action';

import * as appConfig from '../core/constants/app.constants';

import { IAtomQueryArgs } from '../models/atom/atom.query';


/************************************/
/*            INTERFACES            */
/************************************/
export interface ISearchState {
    searchAtoms: IAtomQueryArgs;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: ISearchState = {
    searchAtoms: {
        filter: {
            text: '',
            atomCategoryId: null
        },
        sortBy: appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT
    }
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

        case types.CLEAR_SEARCH: {
            return {
                ...state,
                searchAtoms: {
                    filter: {
                        text: '',
                        atomCategoryId: null
                    },
                    sortBy: appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT
                }
            };
        }

        case types.SEARCH_ATOMS: {
            return {
                ...state,
                searchAtoms: {
                    filter: {
                        text: action.searchAtoms.filter.text, 
                        atomCategoryId: action.searchAtoms.filter.atomCategoryId, 
                    },
                    sortBy: action.searchAtoms.sortBy
                } 
            };
        }
            
        default:
            return state;  
    }
}
