/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import { client } from './../index';

import * as types from '../core/constants/action.types';
import * as appConfig from '../core/constants/app.constants';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { SEARCH_ATOMS_QUERY } from './../models/atom/atom.query';
import { DUPLICATE_ATOM_MUTATION } from './../models/atom/atom.mutation';
import { IAtomCodeProps } from '../reducer/atom.reducer';


/************************************/
/*            INTERFACES            */
/************************************/

interface IModalEventPayLoad {
    event: string;
    properties?: {
        modalType: string,
        modalProps: any
    };
}

interface IChangeTabEventPayLoad {
    event: string;
    properties: {
        tab: string
    };
}

interface ICopySourceCodeEventPayLoad {
    event: string;
    properties: {
        copiedType: string
    };
}

interface IDuplicateAtomEventPayLoad {
    event: string;
    properties: {
        atomId: number,
        isDuplicated: boolean
    };
}

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
    modals: null;
    tabs: {
        atomDetailsTab: {
            tab: string | null
        },
        sourceCodeTab: {
            tab: string | null
        }
    };
    copied: null;
    duplicated: {
        atomId: number,
        isDuplicated: boolean
    };
}

export interface IClearUiAction {
    type: types.CLEAR_UI;
    modals: null;
    tabs: {
        atomDetailsTab: {
            tab: string | null
        },
        sourceCodeTab: {
            tab: string | null
        }
    };
    copied: null;
    duplicated: {
        atomId: number,
        isDuplicated: boolean
    };
}

export interface IShowModalAction {
    type: types.SHOW_MODAL;
    modals: {
        modalType: string,
        modalProps: any
    };
    meta: IAnalyticsTrack<IModalEventPayLoad>;
}

export interface ICloseModalAction {
    type: types.CLOSE_MODAL;
    meta: IAnalyticsTrack<IModalEventPayLoad>;
}

export interface IChangeAtomDetailsTabAction {
    type: types.CHANGE_ATOM_DETAILS_TAB;
    tabs: {
        atomDetailsTab: {
            tab: string
        }
    };
    meta: IAnalyticsTrack<IChangeTabEventPayLoad>;
}

export interface IChangeSourceCodeTabAction {
    type: types.CHANGE_SOURCE_CODE_TAB;
    tabs: {
        sourceCodeTab: {
            tab: string
        }
    };
    meta: IAnalyticsTrack<IChangeTabEventPayLoad>;
}

export interface ICopySourceCodeAction {
    type: types.COPY_SOURCE_CODE;
    copied: {
        copiedType: string
    };
    meta: IAnalyticsTrack<ICopySourceCodeEventPayLoad>;
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
    // UI interaction
    ILocationChangeAction
|   IClearUiAction
|   IShowModalAction
|   ICloseModalAction
|   IChangeAtomDetailsTabAction
|   IChangeSourceCodeTabAction
|   ICopySourceCodeAction
|   IRequestDuplicateAtomAction
|   IReceiveDuplicateAtomAction
|   IDuplicateAtomFailureAction;



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Return an action type, CLEAR_UI to reset UI states
 * @function clearUiAction
 * @returns {Action}
 */
export const clearUiAction = (): Action => {
    return {
        type: types.CLEAR_UI,
        modals: null,
        tabs: {
            atomDetailsTab: {
                tab: null
            },
            sourceCodeTab: {
                tab: appConfig.ATOM_DETAILS_DEFAULT_OPTION_TAB
            }
        },
        copied: null,
        duplicated: {
            atomId: null,
            isDuplicated: false
        }
    };
};


/**
 * @desc Return an action type, SHOW_MODAL 
 * to indicate that user wants opening a Modal
 * @function showModalAction
 * @returns {Action}
 */
export const showModalAction = (modalType: string, modalProps: any): Action => {
    return {
        type: types.SHOW_MODAL,
        modals: {
            modalType,
            modalProps
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.SHOW_MODAL,
                    properties: {
                        modalType,
                        modalProps
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CLOSE_MODAL
 * to indicate that user wants closing a Modal
 * @function closeModalAction
 * @returns {Action}
 */
export const closeModalAction = (): Action => {
    return {
        type: types.CLOSE_MODAL,
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CLOSE_MODAL
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CHANGE_ATOM_DETAILS_TAB 
 * to indicate that user wants to change atom details tab menu option
 * @function changeAtomDetailsTabAction
 * @returns {Action}
 */
export const changeAtomDetailsTabAction = (tab: string): Action => {
    return {
        type: types.CHANGE_ATOM_DETAILS_TAB,
        tabs: {
            atomDetailsTab: {
                tab
            }
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CHANGE_ATOM_DETAILS_TAB,
                    properties: {
                        tab
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, CHANGE_SOURCE_CODE_TAB 
 * to indicate that user wants to change source code tab menu option
 * @function changeSourceCodeTabAction
 * @returns {Action}
 */
export const changeSourceCodeTabAction = (tab: string): Action => {
    return {
        type: types.CHANGE_SOURCE_CODE_TAB,
        tabs: {
            sourceCodeTab: {
                tab
            }
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CHANGE_SOURCE_CODE_TAB,
                    properties: {
                        tab
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, COPY_SOURCE_CODE 
 * to indicate that user wants to copy a source code block
 * @function copySourceCodeAction
 * @returns {Action}
 */
export const copySourceCodeAction = (copiedType: string): Action => {
    return {
        type: types.COPY_SOURCE_CODE,
        copied: {
            copiedType
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.COPY_SOURCE_CODE,
                    properties: {
                        copiedType
                    },
                },
            },
        }
    };
};


/**
 * @desc Return an action type, DUPLICATE_ATOM_REQUEST to start duplication process
 * @function requestDuplicateAtomAction
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
 * @desc Return an action type, DUPLICATE_ATOM_SUCCESS after a successful duplication process
 * @function receiveDuplicateAtomAction
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
 * @desc Return an action type, DUPLICATE_ATOM_FAILURE after a failure duplication process
 * @function duplicateAtomFailureAction
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
 * @returns {Promise<any>}
 */
// TODO: Mover todo lo alusivo a Atom a su respectivo 'action' file
// TODO: Agregar params en la comment description
export const duplicateAtomAction = (atomId: number, userId: number, atomCode: Array<IAtomCodeProps>) => {
    return (dispatch: Function) => {

        // Request Duplicate Atom
        dispatch(requestDuplicateAtomAction(atomId));

        client.mutate({
            mutation: DUPLICATE_ATOM_MUTATION,
            variables: { atomId, userId, atomCode },
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