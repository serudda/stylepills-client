/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../constants/action.types';


/************************************/
/*            INTERFACES            */
/************************************/

export interface ISearchAtomsAction {
    type: types.SEARCH_ATOMS;
    text: string;
    atomCategoryId: number;
    sortBy: string;
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
export const searchAtomsAction = ({text, atomCategoryId, sortBy}: ISearchAtomsAction): Action => {
    return {
        type: types.SEARCH_ATOMS,
        text,
        atomCategoryId,
        sortBy
    };
};