/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as uuid from 'uuid/v4';

import { CodeSupportedOption, ListProps } from './../core/interfaces/interfaces';
import * as appConfig from '../core/constants/app.constants';
import * as types from '../core/constants/action.types';
import { Action } from '../actions/ui.action';

import { functionsUtil } from './../core/utils/functionsUtil';

import { 
    Basic as BasicColorModel, 
    Color as ColorModel 
} from '../models/color/color.model';
import { Lib as LibModel } from '../models/lib/lib.model';
import { Source as SourceModel } from './../models/source/source.model';

import { 
    Option as DetailsTabMenuOptions 
} from './../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';
import { 
    Option as ModalOption 
} from './../app/containers/Modals/ModalManager/ModalManager.container';
import { 
    Option as AlertOption 
} from './../app/containers/Alerts/AlertManager/AlertManager.container';


/************************************/
/*            INTERFACES            */
/************************************/

export type ColorListItem = ColorModel & ListProps;
export type LibListItem = LibModel & ListProps;
export type SourceListItem = SourceModel & ListProps;
export type ColorsList = {
    general: Array<ColorListItem>,
    [colorType: string]: Array<ColorListItem> // NOTE: 'assign_new_property_to_an_object_in_TypeScript'
};
export type LibsList = {
    [index: string]: Array<LibListItem> // NOTE: 'assign_new_property_to_an_object_in_TypeScript'
};
export type CurrentCode = {
    [index: string]: SourceModel
};

export interface IUiState {
    modals: Array<{modalType: ModalOption, modalProps: any}>;
    alerts: Array<{alertType: AlertOption, alertProps: any, alertId: string}>;
    lists: {
        colorsList: ColorsList,
        libsList: LibsList,
        sourcesList: Array<SourceListItem>
    };
    tabs: {
        atomDetailsTab?: {
            tab: DetailsTabMenuOptions
        },
        sourceCodeTab?: {
            tab: CodeSupportedOption,
            options: Array<CodeSupportedOption>
        },
        libsTab?: {
            tab: CodeSupportedOption
        }
    };
    colorPicker: {
        currentColor: {
            general: BasicColorModel
        }
    };
    sourceCodePanel: {
        currentCode: CurrentCode
    };
    copied: {
        copiedType: string
    };
    message?: string;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IUiState = {
    modals: [],
    alerts: [],
    lists: {
        colorsList: {
            general: []
        },
        libsList: {
            css: []
        },
        sourcesList: [] 
    },
    tabs: {
        atomDetailsTab: {
            tab: null
        },
        sourceCodeTab: {
            tab: appConfig.SOURCE_CODE_DEFAULT_OPTION_TAB,
            options: [CodeSupportedOption.html, CodeSupportedOption.css]
        },
        libsTab: {
            tab: appConfig.LIBS_DEFAULT_OPTION_TAB
        }
    },
    colorPicker: {
        currentColor: {
            general: {
                hex: appConfig.SECONDARY_COLOR_HEX,
                rgba: appConfig.SECONDARY_COLOR_RGBA,
                name: appConfig.SECONDARY_COLOR_NAME
            }
        }
    },
    sourceCodePanel: {
        currentCode: {
            html: null,
            css: null
        }
    },
    copied: null
};

// -----------------------------------


/** 
 * @desc This function takes UI actions and return a new state 
 * @param {IUiState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IUiState} 
 */
export default function (state: IUiState = defaultState, action: Action): IUiState {

    switch (action.type) {

        /***********************************/
        /*            UI ACTIONS           */
        /***********************************/
        case types.LOCATION_CHANGE:
        case types.CLEAR_UI: {
            return {
                ...state, 
                modals: [],
                alerts: [],
                lists: {
                    colorsList: {
                        general: []
                    },
                    libsList: {
                        css: []
                    },
                    sourcesList: []
                },
                tabs: {
                    atomDetailsTab: {
                        tab: null
                    },
                    sourceCodeTab: {
                        tab: appConfig.SOURCE_CODE_DEFAULT_OPTION_TAB,
                        options: [CodeSupportedOption.html, CodeSupportedOption.css]
                    },
                    libsTab: {
                        tab: appConfig.LIBS_DEFAULT_OPTION_TAB
                    }
                },
                colorPicker: {
                    currentColor: {
                        general: {
                            hex: appConfig.SECONDARY_COLOR_HEX,
                            rgba: appConfig.SECONDARY_COLOR_RGBA,
                            name: appConfig.SECONDARY_COLOR_NAME
                        }
                    }
                },
                sourceCodePanel: {
                    currentCode: {
                        html: null,
                        css: null
                    }
                },
                copied: null
            };
        }

        case types.SHOW_MODAL: {
            return {
                ...state,
                // Always pushing a new modal onto the stack
                modals: state.modals.concat({
                    modalType: action.modals.modalType,
                    modalProps: action.modals.modalProps
                })
            };
        }

        case types.CLOSE_MODAL: {

            // Always popping the last modal off the stack
            const newModalsState = state.modals.slice();
            newModalsState.pop();
            return {
                ...state,
                modals: newModalsState
            };
        }

        case types.SHOW_ALERT: {
            return {
                ...state,
                alerts: [
                    ...state.alerts,
                    {
                        alertType: action.alerts.alertType,
                        alertProps: action.alerts.alertProps,
                        alertId: uuid()
                    }
                ]
            };
        }

        case types.CLOSE_ALERT: {

            const newAlertsState = functionsUtil.deleteItemInArray(state.alerts, 'alertId', action.alerts.alertId);

            return {
                ...state,
                alerts: newAlertsState
            };

        }

        case types.ADD_COLOR_ITEM: {

            const { colorType } = action;
            const { lists } = state;
            const group = colorType ? colorType : 'general';
            let newColorList = [];
            let colorsList = lists.colorsList[group] ? lists.colorsList[group] : []; 

            // Append new color to colorList
            newColorList = colorsList.concat({
                tempId: uuid(),
                ...action.color
            });

            return {
                ...state,
                lists: {
                    ...state.lists,
                    colorsList: {
                        ...state.lists.colorsList,
                        [group]: newColorList
                    }
                }
            };

        }

        case types.DELETE_COLOR_ITEM: {

            const { colorType } = action;
            const { lists } = state;
            const group = colorType ? colorType : 'general';
            let colorsList = lists.colorsList[group] ? lists.colorsList[group] : [];

            const newColorsListState = functionsUtil.deleteItemInArray(colorsList, 'tempId', action.id);

            return {
                ...state,
                lists: {
                    ...state.lists,
                    colorsList: {
                        ...state.lists.colorsList,
                        [group]: newColorsListState
                    }
                }
            };
        }

        case types.ADD_LIB_ITEM: {

            const { libType } = action;
            const { lists } = state;
            const group = libType ? libType : CodeSupportedOption.css;
            let newLibList = [];
            let libsList = lists.libsList[group] ? lists.libsList[group] : []; 

            // Append new lib to libList
            newLibList = libsList.concat({
                tempId: uuid(),
                ...action.lib,
            });

            return {
                ...state,
                lists: {
                    ...state.lists,
                    libsList: {
                        ...state.lists.libsList,
                        [group]: newLibList
                    }
                }
            };

        }

        case types.DELETE_LIB_ITEM: {

            const { libType } = action;
            const { lists } = state;
            const group = libType ? libType : CodeSupportedOption.css;
            let libsList = lists.libsList[group] ? lists.libsList[group] : [];

            const newLibsListState = functionsUtil.deleteItemInArray(libsList, 'tempId', action.id);

            return {
                ...state,
                lists: {
                    ...state.lists,
                    libsList: {
                        ...state.lists.libsList,
                        [group]: newLibsListState
                    }
                }
            };
        }

        case types.LOAD_LIBS: {
            return {
                ...state,
                lists: {
                    ...state.lists,
                    libsList: action.libs
                }
            };
        }

        case types.ADD_SOURCE_ITEM: {
            return {
                ...state,
                lists: {
                    ...state.lists,
                    sourcesList: [
                        ...state.lists.sourcesList,
                        { tempId: uuid(), ...action.source } // NOTE: 2
                    ]
                }
            };
        }

        case types.DELETE_SOURCE_ITEM: {

            const newSourcesListState = functionsUtil.deleteItemInArray(state.lists.sourcesList, 'tempId', action.id);

            return {
                ...state,
                lists: {
                    ...state.lists,
                    sourcesList: newSourcesListState
                }
            };
        }

        case types.CHANGE_ATOM_DETAILS_TAB : {
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    atomDetailsTab: {
                        tab: action.tabs.atomDetailsTab.tab
                    }
                }
            };
        }

        case types.CHANGE_SOURCE_CODE_TAB: {
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    sourceCodeTab: {
                        ...state.tabs.sourceCodeTab,
                        tab: action.tabs.sourceCodeTab.tab
                    }
                }
            };
        }

        case types.LOAD_SOURCE_CODE_TABS: {

            const { 
                sourceCodeTabs = [CodeSupportedOption.html, CodeSupportedOption.css]
            } = action;

            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    sourceCodeTab: {
                        ...state.tabs.sourceCodeTab,
                        options: sourceCodeTabs
                    }
                }
            };

        }

        case types.CHANGE_LIBS_TAB: {
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    libsTab: {
                        tab: action.tabs.libsTab.tab
                    }
                }
            };
        }

        case types.CHANGE_COLOR: {

            const { color, colorType } = action;
            const group = colorType ? colorType : 'general';

            return {
                ...state,
                colorPicker: {
                    ...state.colorPicker,
                    currentColor: {
                        ...state.colorPicker.currentColor,
                        [group]: color
                    }
                }
            };
        }

        case types.CHANGE_SOURCE_CODE: {

            const { source, sourceType } = action;
            const group = sourceType ? sourceType : appConfig.SOURCE_CODE_DEFAULT_OPTION_TAB;

            return {
                ...state,
                sourceCodePanel: {
                    ...state.sourceCodePanel,
                    currentCode: {
                        ...state.sourceCodePanel.currentCode,
                        [group]: source
                    }
                }
            };
        }


        case types.COPY_SOURCE_CODE: {
            return {
                ...state,
                copied: {
                    copiedType: action.copied.copiedType
                }
            };
        }

            
        default:
            return state;  
    }
}

/*
    (1): Es la manera de evitar el error de mutable un array, crear una copia nueva del array.
    (2): Es necesario agregar un id temporal ya que cuando estoy creando una lista nueva, no tengo ids,
    y necesito estos id para poder eliminar los elementos de una lista.
*/