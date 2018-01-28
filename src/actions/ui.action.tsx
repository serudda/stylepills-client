/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';
import * as appConfig from '../core/constants/app.constants';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { Basic as BasicColorModel } from '../models/color/color.model';
import { Lib as LibModel } from './../models/lib/lib.model';
 

/************************************/
/*            INTERFACES            */
/************************************/

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
    modals: null;
    tabs: {
        atomDetailsTab: {
            tab: string | null
        },
        sourceCodeTab: {
            tab: string | null
        },
        libsTab: {
            tab: string | null
        }
    };
    colorPicker: {
        currentColor: BasicColorModel
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
        },
        libsTab: {
            tab: string | null
        }
    };
    colorPicker: {
        currentColor: BasicColorModel
    };
    copied: null;
    duplicated: {
        atomId: number,
        isDuplicated: boolean
    };
}


/* 
    MODALS ACTIONS
    state: modals
*/

interface IModalEventPayLoad {
    event: string;
    properties?: {
        modalType: string,
        modalProps: any
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

/* 
    TABS ACTIONS
    state: tabs
*/

interface IChangeTabEventPayLoad {
    event: string;
    properties: {
        tab: string
    };
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

export interface IChangeLibsTabAction {
    type: types.CHANGE_LIBS_TAB;
    tabs: {
        libsTab: {
            tab: string
        }
    };
    meta: IAnalyticsTrack<IChangeTabEventPayLoad>;
}


/* 
    COPY ACTIONS
    state: copied
*/

interface ICopySourceCodeEventPayLoad {
    event: string;
    properties: {
        copiedType: string
    };
}

export interface ICopySourceCodeAction {
    type: types.COPY_SOURCE_CODE;
    copied: {
        copiedType: string
    };
    meta: IAnalyticsTrack<ICopySourceCodeEventPayLoad>;
}


/* 
    COLOR PICKER ACTIONS
    state: colorPicker
*/

export interface IChangeColorAction {
    type: types.CHANGE_COLOR;
    colorPicker: {
        currentColor: BasicColorModel
    };
}


/* 
    SOURCE CODE PANEL ACTIONS
    state: sourceCodePanel
*/

export interface ICodeProps {
    code: string;
    libs?: Array<string>;
}

export interface ICurrentCode {
    codeType: string; 
    codeProps: ICodeProps;
}

export interface ISourceCodePanel {
    currentCode: ICurrentCode;
}

export interface IChangeSourceCodeAction {
    type: types.CHANGE_SOURCE_CODE;
    sourceCodePanel: ISourceCodePanel;
}


/* 
    LIBS PANEL ACTIONS
    state: libsPanel
*/

export interface ILibsPanel {
    libs: Array<LibModel>;
}

export interface IChangeLibsAction {
    type: types.CHANGE_LIBS;
    libsPanel: ILibsPanel;
}


export type Action =
    // UI interaction
    ILocationChangeAction
|   IClearUiAction
|   IShowModalAction
|   ICloseModalAction
|   IChangeAtomDetailsTabAction
|   IChangeSourceCodeTabAction
|   IChangeLibsTabAction
|   IChangeColorAction
|   IChangeSourceCodeAction
|   IChangeLibsAction
|   ICopySourceCodeAction;



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
            },
            libsTab: {
                tab: appConfig.LIBS_DEFAULT_OPTION_TAB
            }
        },
        colorPicker: {
            currentColor: {
                hex: appConfig.SECONDARY_COLOR_HEX,
                rgba: appConfig.SECONDARY_COLOR_RGBA
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
 * @desc Return an action type, CHANGE_LIBS_TAB 
 * to indicate that user wants to change libs tab menu option (e.g. from 'javascript' to 'css')
 * @function changeLibsTabAction
 * @returns {Action}
 */
export const changeLibsTabAction = (tab: string): Action => {
    return {
        type: types.CHANGE_LIBS_TAB,
        tabs: {
            libsTab: {
                tab
            }
        },
        meta: {
            analytics: {
                eventType: EventTypes.track,
                eventPayload: {
                    event: types.CHANGE_LIBS_TAB,
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
 * @desc Return an action type, CHANGE_COLOR 
 * to indicate that user wants to change color on colorPicker
 * @function changeColorAction
 * @param {BasicColorModel} color - new color object: hex and rgba properties
 * @returns {Action}
 */
export const changeColorAction = (color: BasicColorModel): Action => {
    return {
        type: types.CHANGE_COLOR,
        colorPicker: {
            currentColor: {
                hex: color.hex,
                rgba: color.rgba
            }
        }
    };
};


/**
 * @desc Return an action type, CHANGE_LIBS
 * to indicate that user wants to change source code on SourceCodePanel
 * @function changeLibsAction
 * @param {string} codeType - code type (e.g. 'html', 'css', etc.)
 * @param {any} codeProps - code properties (e.g. code, libs, etc)
 * @returns {Action}
 */
export const changeLibsAction = (libs: Array<LibModel>): Action => {
    return {
        type: types.CHANGE_LIBS,
        libsPanel: {
            libs
        }
    };
};


/**
 * @desc Return an action type, CHANGE_LIB 
 * to indicate that user wants to change external libs on ExternalLibsPanel
 * @function changeSourceCodeAction
 * @param {string} codeType - code type (e.g. 'html', 'css', etc.)
 * @param {any} codeProps - code properties (e.g. code, libs, etc)
 * @returns {Action}
 */
export const changeSourceCodeAction = (codeType: string, codeProps: any): Action => {
    return {
        type: types.CHANGE_SOURCE_CODE,
        sourceCodePanel: {
            currentCode: {
                codeType,
                codeProps
            }
        }
    };
};