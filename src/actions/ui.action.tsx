/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import { client } from './../index';

import * as types from '../core/constants/action.types';
import * as appConfig from '../core/constants/app.constants';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

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
    IClearUiAction
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
 * @desc Current user requested Log out 
 * @function duplicateAtomAction
 * @returns {Promise<any>}
 */
export const duplicateAtomAction = (atomId: number, userId: number, atomCode: Array<IAtomCodeProps>) => {
    return (dispatch: Function) => {

        // Request Duplicate Atom
        dispatch(requestDuplicateAtomAction(atomId));

        client.mutate({
            mutation: DUPLICATE_ATOM_MUTATION,
            variables: { atomId, userId, atomCode }
        }).then(
            (response: any) => {
                // TODO: Typar esta respuesta ya que no se que propiedades devuelve
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