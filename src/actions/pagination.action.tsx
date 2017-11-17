/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { IAtomPaginationArgs } from '../models/atom/atom.query';


/************************************/
/*            INTERFACES            */
/************************************/

export interface INextPageAtomAction {
    type: types.NEXT_PAGE_ATOMS;
    paginationAtoms: IAtomPaginationArgs;
}

export interface IPrevPageAtomAction {
    type: types.PREV_PAGE_ATOMS;
    paginationAtoms: IAtomPaginationArgs;
}


export type Action = 
    // Pagination interaction
    INextPageAtomAction
|   IPrevPageAtomAction;


/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, NEXT_PAGE_ATOMS 
 * to pass the next atoms page pagination parameters
 * @function nextPageAtomAction
 * @returns {Action}
 */
export const nextPageAtomAction = ({ paginationAtoms }: INextPageAtomAction): Action => {
    return {
        type: types.NEXT_PAGE_ATOMS,
        paginationAtoms: {
            first: paginationAtoms.first,
            after: paginationAtoms.after,
            last: null,
            before: null
        }
    };
};


/**
 * @desc Return an action type, PREV_PAGE_ATOMS 
 * to pass the next atoms page pagination parameters
 * @function nextPageAtomAction
 * @returns {Action}
 */
export const prevPageAtomAction = ({ paginationAtoms }: IPrevPageAtomAction): Action => {
    return {
        type: types.PREV_PAGE_ATOMS,
        paginationAtoms: {
            first: null,
            after: null,
            last: paginationAtoms.last,
            before: paginationAtoms.before
        }
    };
};