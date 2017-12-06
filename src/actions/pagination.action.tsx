/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as appConfig from '../core/constants/app.constants';

import * as types from '../core/constants/action.types';
import { IAtomPaginationArgs } from '../models/atom/atom.query';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/

interface IPaginationEventPayLoad {
    event: string;
    properties: {
        paginationAtoms: IAtomPaginationArgs;
    };
}

export interface IClearPaginationAction {
    type: types.CLEAR_PAGINATION;
    paginationAtoms: {
        first: number,
        after: null,
        last: null,
        before: null
    };
}

export interface INextPageAtomAction {
    type: types.NEXT_PAGE_ATOMS;
    paginationAtoms: IAtomPaginationArgs;
    meta: IAnalyticsTrack<IPaginationEventPayLoad>;
}

export interface IPrevPageAtomAction {
    type: types.PREV_PAGE_ATOMS;
    paginationAtoms: IAtomPaginationArgs;
    meta: IAnalyticsTrack<IPaginationEventPayLoad>;
}


export type Action = 
    // Pagination interaction
    IClearPaginationAction
|   INextPageAtomAction
|   IPrevPageAtomAction;


/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_PAGINATION to reset Pagination states
 * @function clearPaginationAction
 * @returns {Action}
 */
export const clearPaginationAction = (): Action => {
    return {
        type: types.CLEAR_PAGINATION,
        paginationAtoms: {
            first: appConfig.ATOM_SEARCH_LIMIT,
            after: null,
            last: null,
            before: null
        }
    };
};


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
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.NEXT_PAGE_ATOMS,
                    properties: {
                        paginationAtoms: {
                            first: paginationAtoms.first,
                            after: paginationAtoms.after,
                            last: null,
                            before: null
                        }
                    },
                },
            },
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
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.NEXT_PAGE_ATOMS,
                    properties: {
                        paginationAtoms: {
                            first: null,
                            after: null,
                            last: paginationAtoms.last,
                            before: paginationAtoms.before
                        }
                    },
                },
            },
        }
    };
};