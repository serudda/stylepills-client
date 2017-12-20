/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';
import { IAtomQueryArgs } from '../models/atom/atom.query';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import * as appConfig from '../core/constants/app.constants';


/************************************/
/*            INTERFACES            */
/************************************/
interface ISearchEventPayLoad {
    event: string;
    properties?: {
        filter: {
            type: {
                isDuplicated: boolean,
                isPrivate: boolean
            }
            text: string,
            atomCategoryId: number
        },
        sortBy: string
    };
}

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
    searchAtoms: {
        filter: {
            type: {
                isDuplicated: boolean,
                isPrivate: boolean
            },
            text: string,
            atomCategoryId: null
        },
        sortBy: string
    };
}

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
    meta: IAnalyticsTrack<ISearchEventPayLoad>;
}


export type Action = 
    // Search interaction
    ILocationChangeAction
|   IClearSearchAction
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
                type: {
                    isDuplicated: null,
                    isPrivate: null
                },
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
                type: {
                    isDuplicated: searchAtoms.filter.type.isDuplicated,
                    isPrivate: searchAtoms.filter.type.isPrivate
                },
                text: searchAtoms.filter.text,
                atomCategoryId: searchAtoms.filter.atomCategoryId
            },
            sortBy: searchAtoms.sortBy
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.SEARCH_ATOMS,
                    properties: {
                        filter: {
                            type: {
                                isDuplicated: searchAtoms.filter.type.isDuplicated,
                                isPrivate: searchAtoms.filter.type.isPrivate
                            },
                            text: searchAtoms.filter.text,
                            atomCategoryId: searchAtoms.filter.atomCategoryId
                        },
                        sortBy: searchAtoms.sortBy
                    },
                },
            },
        }
    };
};