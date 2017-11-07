/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../constants/action.types';
import { IAtomQueryArgs } from '../models/atom/atom.query';


/************************************/
/*            INTERFACES            */
/************************************/

export interface ISearchAtomsAction {
    type: types.SEARCH_ATOMS;
    searchAtoms: IAtomQueryArgs;
}


export type Action = ISearchAtomsAction;



/************************************/
/*             ACTIONS              */
/************************************/


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
            sortBy: searchAtoms.sortBy,
            limit: searchAtoms.limit
        }
    };
};