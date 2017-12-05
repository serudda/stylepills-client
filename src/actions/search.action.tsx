/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { IAtomQueryArgs } from '../models/atom/atom.query';

import * as appConfig from '../core/constants/app.constants';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearSearchAction {
    type: types.CLEAR_SEARCH;
    searchAtoms: {
        filter: {
            text: string,
            atomCategoryId: null
        },
        sortBy: string
    };
}

export interface ISearchAtomsAction {
    type: types.SEARCH_ATOMS;
    searchAtoms: IAtomQueryArgs;
}


export type Action = 
    // Search interaction
    IClearSearchAction
|   ISearchAtomsAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_SEARCH to reset Search states
 * @function clearSearchAction
 * @returns {Action}
 */
export const clearSearchAction = (): Action => {
    return {
        type: types.CLEAR_SEARCH,
        searchAtoms: {
            filter: {
                text: '',
                atomCategoryId: null
            },
            sortBy: appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT
        }
    };
};


/**
 * @desc Return an action type, SEARCH_ATOMS 
 * to pass the search atoms filter parameters
 * @function searchAtomsAction
 * @returns {Action}
 */
export const searchAtomsAction = ({ searchAtoms }: ISearchAtomsAction): Action => {
    return {
        type: types.SEARCH_ATOMS,
        searchAtoms: {
            filter: {
                text: searchAtoms.filter.text,
                atomCategoryId: searchAtoms.filter.atomCategoryId
            },
            sortBy: searchAtoms.sortBy
        }
    };
};