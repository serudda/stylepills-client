/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';


/************************************/
/*            INTERFACES            */
/************************************/

interface IAtomEditProperties {
    atomId: number;
    name: string;
    atomCode?: {codeType: string, codeProps: any};
}

interface IAtomEventPayLoad {
    event: string;
    properties?: IAtomEditProperties;
}

export interface IRequestEditAtomAction {
    type: types.EDIT_ATOM_REQUEST;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean
    };
    meta: IAnalyticsTrack<IAtomEventPayLoad>;
}

export interface IChangedAtomDetailsAction {
    type: types.ATOM_DETAILS_CHANGED;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean,
        atoms: IAtomEditProperties
    };
}


export type Action =
    // Atom interaction
    IRequestEditAtomAction
|   IChangedAtomDetailsAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, EDIT_ATOM_REQUEST
 * to indicate that user wants to edit an Atom component
 * @function requestEditAtomAction
 * @returns {Action}
 */
export const requestEditAtomAction = 
    (atomId: number, name: string): Action => {

    return {
        type: types.EDIT_ATOM_REQUEST,
        edited: {
            watchingChanges: true,
            isEdited: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.EDIT_ATOM_REQUEST,
                    properties: {
                        atomId,
                        name
                    },
                },
            },
        }
    };

};


/**
 * @desc Return an action type, ATOM_DETAILS_CHANGED
 * to indicate that user are editing the atom's source code
 * @function changedAtomDetailsAction
 * @returns {Action}
 */
export const changedAtomDetailsAction = 
    (atomId: number, name: string, codeType: string, codeProps: any): Action => {

    return {
        type: types.ATOM_DETAILS_CHANGED,
        edited: {
            watchingChanges: true,
            isEdited: true,
            atoms: {
                atomId,
                name,
                atomCode: {
                    codeType,
                    codeProps
                }
            }
        }
    };

};