/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import { client } from './../index';

import * as types from '../core/constants/action.types';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { Lib as LibModel } from './../models/lib/lib.model';

import { 
    CREATE_ATOM_MUTATION, CreateAtomInput,
    DUPLICATE_ATOM_MUTATION, DuplicateAtomInput
} from './../models/atom/atom.mutation';


// NOTE: 1 - import { SEARCH_ATOMS_QUERY } from './../models/atom/atom.query';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IClearAtomStateAction {
    type: types.CLEAR_ATOM_STATE;
    edited: {
        atoms: null,
        watchingChanges: boolean,
        isEdited: boolean
    };
    created: { 
        atomId: null,
        isCreated: boolean
    };
}


/* 
    STATE: CREATED
*/

interface ICreateAtomEventPayLoad {
    event: string;
    properties: {
        created: {
            atomId?: number,
            isCreated: boolean,
            message?: string
        };
    };
}

export interface IRequestCreateAtomAction {
    type: types.CREATE_ATOM_REQUEST;
    created: {
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}

export interface IReceiveCreateAtomAction {
    type: types.CREATE_ATOM_SUCCESS;
    created: {
        atomId: number;
        isCreated: boolean;
    };
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}

export interface ICreateAtomFailureAction {
    type: types.CREATE_ATOM_FAILURE;
    created: {
        isCreated: boolean;
    };
    message: string;
    meta: IAnalyticsTrack<ICreateAtomEventPayLoad>;
}


/* 
    STATE: EDITED
*/

interface IAtomCodeProps {
    code: string;
    libs?: Array<LibModel>;
}

interface IAtomEditProperties {
    atomId: number;
    name: string;
    atomCode?: {codeType: string, codeProps: IAtomCodeProps};
}

interface IEditAtomEventPayLoad {
    event: string;
    properties?: IAtomEditProperties;
}

export interface IRequestEditAtomAction {
    type: types.EDIT_ATOM_REQUEST;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean
    };
    meta: IAnalyticsTrack<IEditAtomEventPayLoad>;
}

export interface IChangedAtomDetailsAction {
    type: types.ATOM_DETAILS_CHANGED;
    edited: {
        watchingChanges: boolean,
        isEdited: boolean,
        atoms: IAtomEditProperties
    };
}


/* 
    STATE: DUPLICATED
*/

interface IDuplicateAtomEventPayLoad {
    event: string;
    properties: {
        atomId: number,
        isDuplicated: boolean
    };
}

export interface IRequestDuplicateAtomAction {
    type: types.DUPLICATE_ATOM_REQUEST;
    duplicated: {
        atomId: number;
        isDuplicated: boolean;
    };
    meta: IAnalyticsTrack<IDuplicateAtomEventPayLoad>;
}

export interface IReceiveDuplicateAtomAction {
    type: types.DUPLICATE_ATOM_SUCCESS;
    duplicated: {
        atomId: number;
        isDuplicated: boolean;
    };
    meta: IAnalyticsTrack<IDuplicateAtomEventPayLoad>;
}

export interface IDuplicateAtomFailureAction {
    type: types.DUPLICATE_ATOM_FAILURE;
    duplicated: {
        atomId: number;
        isDuplicated: boolean;
    };
    message: string;
    meta: IAnalyticsTrack<IDuplicateAtomEventPayLoad>;
}


export type Action =
    // Atom interaction
    IClearAtomStateAction
|   IRequestCreateAtomAction
|   IReceiveCreateAtomAction
|   ICreateAtomFailureAction
|   IRequestEditAtomAction
|   IChangedAtomDetailsAction
|   IRequestDuplicateAtomAction
|   IReceiveDuplicateAtomAction
|   IDuplicateAtomFailureAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_ATOM_STATE to reset Atom states
 * @function clearAtomStateAction
 * @returns {Action}
 */
export const clearAtomStateAction = (): Action => {
    return {
        type: types.CLEAR_ATOM_STATE,
        created: {
            atomId: null,
            isCreated: false
        },
        edited: {
            atoms: null,
            watchingChanges: false,
            isEdited: false
        }
    };
};


/**
 * @desc Return an action type, CREATE_ATOM_REQUEST to start creation process
 * @function requestCreateAtomAction
 * @returns {Action}
 */
export const requestCreateAtomAction = (): Action => {
    return {
        type: types.CREATE_ATOM_REQUEST,
        created: { 
            isCreated: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_REQUEST,
                    properties: {
                        created: { 
                            isCreated: false
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CREATE_ATOM_SUCCESS after a successful creation process
 * @function receiveCreateAtomAction
 * @param {number} atomId - Atom id
 * @returns {Action}
 */
export const receiveCreateAtomAction = (atomId: number): Action => {
    return {
        type: types.CREATE_ATOM_SUCCESS,
        created: {
            atomId,
            isCreated: true
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_SUCCESS,
                    properties: {
                        created: {
                            atomId,
                            isCreated: true
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CREATE_ATOM_FAILURE after a failure creation process
 * @function createAtomFailureAction
 * @param {string} message - Error message
 * @returns {Action}
 */
export const createAtomFailureAction = (message: string): Action => {
    return {
        type: types.CREATE_ATOM_FAILURE,
        created: {
            isCreated: false
        },
        message,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CREATE_ATOM_FAILURE,
                    properties: {
                        created: {
                            isCreated: false,
                            message
                        }
                    },
                },
            },
        }
    };
};


/**
 * @desc Create Atom Action
 * @function createAtomAction
 * @param {CreateAtomInput} input - create atom input data
 * @returns {Promise<any>}
 */
export const createAtomAction = (input: CreateAtomInput) => {
    return (dispatch: Function): Promise<any> => {

        // Request Create Atom
        dispatch(requestCreateAtomAction());

        return client.mutate({
            mutation: CREATE_ATOM_MUTATION,
            variables: { input }
        }).then(
            /* TODO: Typar esta respuesta ya que no se que propiedades devuelve,
                poner un breakpoint justo dentro para ver que devuelve: response, 
                y con base a eso typar.
            */
            (response: any) => {
                let { ok, id, message, validationErrors } = response.data.createAtom;

                if (ok) {
                    // Created Successful
                    dispatch(receiveCreateAtomAction(id));
                } else {
                    // Created Failure
                    dispatch(createAtomFailureAction(message));
                }

                return {
                    id,
                    ok,
                    message,
                    validationErrors
                };
            }
        ).catch(
            (response) => {
                // Created Failure
                dispatch(createAtomFailureAction(response));

                return response;
            }
        );

    };

};


/**
 * @desc Return an action type, EDIT_ATOM_REQUEST
 * to indicate that user wants to edit an Atom component
 * @function requestEditAtomAction
 * @param {number} atomId - Atom id
 * @param {name} name - Atom Name
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
 * @param {number} atomId - Atom Id
 * @param {string} atomName - Atom Name
 * @param {string} codeType - code type (e.g. 'html', 'css', etc.)
 * @param {any} codeProps - code properties (e.g. code, libs, etc)
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


/**
 * @desc Return an action type, DUPLICATE_ATOM_REQUEST 
 * to start duplication process
 * @function requestDuplicateAtomAction
 * @param {number} atomId - Atom Id
 * @returns {Action}
 */
export const requestDuplicateAtomAction = (atomId: number): Action => {
    return {
        type: types.DUPLICATE_ATOM_REQUEST,
        duplicated: {
            atomId,
            isDuplicated: false
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.DUPLICATE_ATOM_REQUEST,
                    properties: {
                        atomId,
                        isDuplicated: false
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, DUPLICATE_ATOM_SUCCESS after a 
 * successful duplication process
 * @function receiveDuplicateAtomAction
 * @param {number} atomId - Atom Id
 * @returns {Action}
 */
export const receiveDuplicateAtomAction = (atomId: number): Action => {
    return {
        type: types.DUPLICATE_ATOM_SUCCESS,
        duplicated: {
            atomId,
            isDuplicated: true
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.DUPLICATE_ATOM_SUCCESS,
                    properties: {
                        atomId,
                        isDuplicated: true
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, DUPLICATE_ATOM_FAILURE after 
 * a failure duplication process
 * @function duplicateAtomFailureAction
 * @param {number} atomId - Atom Id
 * @param {string} message - Error message
 * @returns {Action}
 */
export const duplicateAtomFailureAction = (atomId: number, message: string): Action => {
    return {
        type: types.DUPLICATE_ATOM_FAILURE,
        duplicated: {
            atomId,
            isDuplicated: false
        },
        message,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.DUPLICATE_ATOM_FAILURE,
                    properties: {
                        atomId,
                        isDuplicated: false,
                        message
                    },
                },
            },
        }
    };
};


/**
 * @desc Duplicate Atom Action
 * @function duplicateAtomAction
 * @param {DuplicateAtomInput} input - duplicate atom input data 
 * @returns {Promise<any>}
 */
export const duplicateAtomAction = 
    (input: DuplicateAtomInput) => {

    return (dispatch: Function) => {

        const { atomId } = input;

        // Request Duplicate Atom
        dispatch(requestDuplicateAtomAction(atomId));

        client.mutate({
            mutation: DUPLICATE_ATOM_MUTATION,
            variables: { input },
            /*
            // NOTE: 1
            update: (proxy, { data: { duplicateAtom } }: any) => {

                // Read the data from our cache for this query.
                const data: any = proxy.readQuery({ query: SEARCH_ATOMS_QUERY });
            
                // Add our todo from the mutation to the end.
                data.searchAtoms.push(duplicateAtom);
            
                // Write our data back to the cache.
                proxy.writeQuery({ query: SEARCH_ATOMS_QUERY, data });
            },
            */
        }).then(
            /* TODO: Typar esta respuesta ya que no se que propiedades devuelve,
                poner un breakpoint justo dentro para ver que devuelve: response, 
                y con base a eso typar.
            */
            (response: any) => {
                let { message, ok } = response.data.duplicateAtom;

                if (ok) {
                    // Duplicated Successful
                    dispatch(receiveDuplicateAtomAction(atomId));
                } else {
                    // Duplicated Failure
                    dispatch(duplicateAtomFailureAction(atomId, message));
                }
            }
        ).catch(
            (response) => {
                // Duplicated Failure
                dispatch(duplicateAtomFailureAction(atomId, response));
            }
        );

    };

};


/* 
(1) Este es el metodo que usa Apollo para actualizar el cache de Apollo despues
de hacer una mutation, es decir: e.g. Cuando duplico un Atom, y le doy en ir a: Dashboard
no logro ver de inmediato el nuevo Atom duplicado, tengo que refrescar para poderlo ver.
Con este 'update' actualizo el store cache de Apollo y puedo ver inmediatamente el nuevo
Atom agregado en mi lista.
(NOTA: Hay varias formas de hacerlo, pero la más recomendada por ellos es usar el metodo 'update')
references: https://www.apollographql.com/docs/react/features/cache-updates.html
*/