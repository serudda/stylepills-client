/************************************/
/*           DEPENDENCIES           */
/************************************/
import { EventTypes } from 'redux-segment';

import * as types from '../core/constants/action.types';
import { IAnalyticsTrack } from './../core/interfaces/interfaces';

import { Basic as BasicColorModel, Color as ColorModel, ColorTypeOptions } from '../models/color/color.model';
import { Lib as LibModel, LibTypeOptions } from './../models/lib/lib.model';
import { Source as SourceModel } from './../models/source/source.model';

import { 
    LibsList,
    SourceListItem
 } from './../reducer/ui.reducer';

import { 
    Option as CodeTabMenuOption 
} from './../app/components/Tabs/CodeTabMenu/CodeTabMenu';
import {
    Option as DetailsTabMenuOptions
} from './../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';
import {
    Option as ModalOption
} from './../app/containers/Modals/ModalManager/ModalManager.container';
import {
    Option as AlertOption
} from './../app/containers/Alerts/AlertManager/AlertManager.container';
 
import { libsListNormalized } from './../normalizrs/ui.normalizr';

/************************************/
/*            INTERFACES            */
/************************************/

interface ILocationChangeAction {
    type: types.LOCATION_CHANGE;
}

export interface IClearUiAction {
    type: types.CLEAR_UI;
}


/* 
    MODALS ACTIONS
    state: modals
*/

interface IModalEventPayLoad {
    event: string;
    properties?: {
        modalType: ModalOption,
        modalProps: any
    };
}

export interface IShowModalAction {
    type: types.SHOW_MODAL;
    modals: {
        modalType: ModalOption,
        modalProps: any
    };
    meta: IAnalyticsTrack<IModalEventPayLoad>;
}

export interface ICloseModalAction {
    type: types.CLOSE_MODAL;
    meta: IAnalyticsTrack<IModalEventPayLoad>;
}

/* 
    ALERTS ACTIONS
    state: alerts
*/

export interface IShowAlertAction {
    type: types.SHOW_ALERT;
    alerts: {
        alertType: AlertOption,
        alertProps: any
    };
}

export interface ICloseAlertAction {
    type: types.CLOSE_ALERT;
    alerts: {
        alertId: string;
    };
}


/* 
    LISTS ACTIONS
    state: lists
    TODO: La estructura de cada Action aqui esta mal, ya que estoy enviando cada action con 
    la estructura que tiene el State, lo que cual no es necesario en lo absoluto, y si confunde
    entonces este es el primer tipo de Action que esta bien estructurado:
    cada action solo envia la propiedad, no la estructura del State: 
    e.g. source (contiene el nuevo Source a agregar), no estoy enviando:
    lists: { sourceList: { type, source } }
    Si esto funciona bien, refactorizar todas las Action para que usen esta misma estructura
*/

export interface IAddSourceItemAction {
    type: types.ADD_SOURCE_ITEM;
    source: SourceModel;
}

export interface IEditSourceItemAction {
    type: types.EDIT_SOURCE_ITEM;
    source: SourceModel;
}

export interface IDeleteSourceItemAction {
    type: types.DELETE_SOURCE_ITEM;
    id: number;
}

export interface IChangeSourceItemOrderAction {
    type: types.CHANGE_SOURCE_ITEM_ORDER;
    id: number;
    newOrder: number;
}

export interface ILoadSourcesAction {
    type: types.LOAD_SOURCES;
    sources: Array<SourceListItem>;
}


export interface IAddColorItemAction {
    type: types.ADD_COLOR_ITEM;
    colorType: ColorTypeOptions;
    color: ColorModel;
}

export interface IEditColorItemAction {
    type: types.EDIT_COLOR_ITEM;
    color: ColorModel;
}

export interface IDeleteColorItemAction {
    type: types.DELETE_COLOR_ITEM;
    colorType: ColorTypeOptions;
    id: string | number;
}

export interface IChangeColorItemOrderAction {
    type: types.CHANGE_COLOR_ITEM_ORDER;
    id: number;
    newOrder: number;
}


export interface IAddLibItemAction {
    type: types.ADD_LIB_ITEM;
    libType: LibTypeOptions;
    lib: LibModel;
}

export interface IEditLibItemAction {
    type: types.EDIT_LIB_ITEM;
    lib: LibModel;
}

export interface IDeleteLibItemAction {
    type: types.DELETE_LIB_ITEM;
    libType: LibTypeOptions;
    id: string | number;
}

export interface IChangeLibItemOrderAction {
    type: types.CHANGE_LIB_ITEM_ORDER;
    id: number;
    newOrder: number;
}

export interface ILoadLibsAction {
    type: types.LOAD_LIBS;
    libs: LibsList;
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
            tab: DetailsTabMenuOptions
        }
    };
    meta: IAnalyticsTrack<IChangeTabEventPayLoad>;
}

export interface IChangeSourceCodeTabAction {
    type: types.CHANGE_SOURCE_CODE_TAB;
    tabs: {
        sourceCodeTab: {
            tab: CodeTabMenuOption
        }
    };
    meta: IAnalyticsTrack<IChangeTabEventPayLoad>;
}

export interface IChangeLibsTabAction {
    type: types.CHANGE_LIBS_TAB;
    tabs: {
        libsTab: {
            tab: CodeTabMenuOption
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
    colorType?: ColorTypeOptions;
    color: BasicColorModel;
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


export type Action =
    // UI interaction
    ILocationChangeAction
|   IClearUiAction
|   IShowModalAction
|   ICloseModalAction
|   IShowAlertAction
|   ICloseAlertAction
|   IAddSourceItemAction
|   IEditSourceItemAction
|   IDeleteSourceItemAction
|   IChangeSourceItemOrderAction
|   ILoadSourcesAction
|   IAddColorItemAction
|   IEditColorItemAction
|   IDeleteColorItemAction
|   IChangeColorItemOrderAction
|   IAddLibItemAction
|   IEditLibItemAction
|   IDeleteLibItemAction
|   IChangeLibItemOrderAction
|   ILoadLibsAction
|   IChangeAtomDetailsTabAction
|   IChangeSourceCodeTabAction
|   IChangeLibsTabAction
|   IChangeColorAction
|   IChangeSourceCodeAction
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
        type: types.CLEAR_UI
    };
};


/**
 * @desc Return an action type, SHOW_MODAL 
 * to indicate that user wants opening a Modal
 * @function showModalAction
 * @returns {Action}
 */
export const showModalAction = (modalType: ModalOption, modalProps: any): Action => {
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
 * @desc Return an action type, SHOW_ALERT
 * to show an Alert in order to notify something to the current User
 * @function showAlertAction
 * @returns {Action}
 */
export const showAlertAction = (alertType: AlertOption, alertProps: any): Action => {
    return {
        type: types.SHOW_ALERT,
        alerts: {
            alertType,
            alertProps
        }
    };
};


/**
 * @desc Return an action type, ADD_SOURCE_ITEM
 * to add a Source on Source List
 * @function addSourceItemAction
 * @returns {Action}
 */
export const addSourceItemAction = (source: SourceModel): Action => {
    return {
        type: types.ADD_SOURCE_ITEM,
        source
    };
};


/**
 * @desc Return an action type, EDIT_SOURCE_ITEM
 * to edit a Source on Source List
 * @function editSourceItemAction
 * @returns {Action}
 */
export const editSourceItemAction = (source: SourceModel): Action => {
    return {
        type: types.EDIT_SOURCE_ITEM,
        source
    };
};


/**
 * @desc Return an action type, DELETE_SOURCE_ITEM
 * to delete a Source on Source List
 * @function deleteSourceItemAction
 * @returns {Action}
 */
export const deleteSourceItemAction = (id: number): Action => {
    return {
        type: types.DELETE_SOURCE_ITEM,
        id
    };
};


/**
 * @desc Return an action type, CHANGE_SOURCE_ITEM_ORDER
 * to change the Source's order on Source List
 * @function changeSourceItemOrderAction
 * @returns {Action}
 */
export const changeSourceItemOrderAction = (id: number, newOrder: number): Action => {
    return {
        type: types.CHANGE_SOURCE_ITEM_ORDER,
        id,
        newOrder
    };
};


/**
 * @desc Return an action type, LOAD_LIBS
 * to load Lib on State store
 * @function loadSourcesAction
 * @returns {Action}
 */
export const loadSourcesAction = (sources: Array<SourceModel> = []): Action => {
    return {
        type: types.LOAD_SOURCES,
        sources
    };
};


/**
 * @desc Return an action type, ADD_COLOR_ITEM
 * to add a Color on Color List
 * @function addColorItemAction
 * @returns {Action}
 */
export const addColorItemAction = (color: ColorModel, colorType: ColorTypeOptions): Action => {
    return {
        type: types.ADD_COLOR_ITEM,
        colorType,
        color
    };
};


/**
 * @desc Return an action type, EDIT_COLOR_ITEM
 * to edit a Color on Color List
 * @function editColorItemAction
 * @returns {Action}
 */
export const editColorItemAction = (color: ColorModel): Action => {
    return {
        type: types.EDIT_COLOR_ITEM,
        color
    };
};


/**
 * @desc Return an action type, DELETE_COLOR_ITEM
 * to delete a Color on Color List
 * @function deleteColorItemAction
 * @returns {Action}
 */
export const deleteColorItemAction = (id: string | number, colorType: ColorTypeOptions): Action => {
    return {
        type: types.DELETE_COLOR_ITEM,
        id,
        colorType
    };
};


/**
 * @desc Return an action type, CHANGE_COLOR_ITEM_ORDER
 * to change the Color's order on Color List
 * @function changeColorItemOrderAction
 * @returns {Action}
 */
export const changeColorItemOrderAction = (id: number, newOrder: number): Action => {
    return {
        type: types.CHANGE_COLOR_ITEM_ORDER,
        id,
        newOrder
    };
};


/**
 * @desc Return an action type, ADD_LIB_ITEM
 * to add a Lib on Lib List
 * @function addLibItemAction
 * @returns {Action}
 */
export const addLibItemAction = (lib: LibModel, libType: LibTypeOptions): Action => {
    return {
        type: types.ADD_LIB_ITEM,
        libType,
        lib
    };
};


/**
 * @desc Return an action type, EDIT_LIB_ITEM
 * to edit a Lib on Lib List
 * @function editLibItemAction
 * @returns {Action}
 */
export const editLibItemAction = (lib: LibModel): Action => {
    return {
        type: types.EDIT_LIB_ITEM,
        lib
    };
};


/**
 * @desc Return an action type, DELETE_LIB_ITEM
 * to delete a Lib on Lib List
 * @function deleteLibItemAction
 * @returns {Action}
 */
export const deleteLibItemAction = (id: string | number, libType: LibTypeOptions): Action => {
    return {
        type: types.DELETE_LIB_ITEM,
        id,
        libType
    };
};


/**
 * @desc Return an action type, CHANGE_LIB_ITEM_ORDER
 * to change the Lib's order on Lib List
 * @function changeLibItemOrderAction
 * @returns {Action}
 */
export const changeLibItemOrderAction = (id: number, newOrder: number): Action => {
    return {
        type: types.CHANGE_LIB_ITEM_ORDER,
        id,
        newOrder
    };
};


/**
 * @desc Return an action type, LOAD_LIBS
 * to load Lib on State store
 * @function loadLibsAction
 * @returns {Action}
 */
export const loadLibsAction = (libs: Array<LibModel> = []): Action => {
    return {
        type: types.LOAD_LIBS,
        libs: libsListNormalized(libs)
    };
};


/**
 * @desc Return an action type, CLOSE_ALERT
 * to close an Alert that it's already notified something to the current User
 * @function closeAlertAction
 * @returns {Action}
 */
export const closeAlertAction = (alertId: string): Action => {
    return {
        type: types.CLOSE_ALERT,
        alerts: {
            alertId
        }
    };
};


/**
 * @desc Return an action type, CHANGE_ATOM_DETAILS_TAB 
 * to indicate that user wants to change atom details tab menu option
 * @function changeAtomDetailsTabAction
 * @returns {Action}
 */
export const changeAtomDetailsTabAction = (tab: DetailsTabMenuOptions): Action => {
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
export const changeSourceCodeTabAction = (tab: CodeTabMenuOption): Action => {
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
export const changeLibsTabAction = (tab: CodeTabMenuOption): Action => {
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
export const changeColorAction = (color: BasicColorModel, colorType: ColorTypeOptions = null): Action => {
    return {
        type: types.CHANGE_COLOR,
        color,
        colorType
    };
};


/**
 * @desc Return an action type, CHANGE_SOURCE_CODE 
 * to indicate that user wants to change source code on SourcePanel
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