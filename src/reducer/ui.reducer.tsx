/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from '../core/constants/app.constants';
import * as types from '../core/constants/action.types';
import { Action } from '../actions/ui.action';

import { functionsUtil } from './../core/utils/functionsUtil';

import { ICurrentCode } from './../actions/ui.action';
import { Basic as BasicColorModel } from '../models/color/color.model';
import { Lib as LibModel } from '../models/lib/lib.model';

import { 
    Option as CodeTabMenuOption 
} from './../app/components/Tabs/CodeTabMenu/CodeTabMenu';


/************************************/
/*            INTERFACES            */
/************************************/

export interface IUiState {
    modals: Array<{modalType: string, modalProps: any}>;
    tabs: {
        atomDetailsTab?: {
            tab: string
        },
        sourceCodeTab?: {
            tab: CodeTabMenuOption
        },
        libsTab?: {
            tab: string
        }
    };
    colorPicker: {
        currentColor: BasicColorModel
    };
    sourceCodePanel: {
        currentCode: Array<ICurrentCode>;
    };
    libsPanel: {
        libs: Array<LibModel>;
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
    // TODO: No existen estas dos en la action CLEAR, revisar por que no se agregaron alla
    sourceCodePanel: {
        currentCode: []
    },
    libsPanel: {
        libs: []
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
                sourceCodePanel: {
                    currentCode: []
                },
                libsPanel: {
                    libs: []
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

        case types.CHANGE_ATOM_DETAILS_TAB: {
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
                        tab: action.tabs.sourceCodeTab.tab
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
            return {
                ...state,
                colorPicker: {
                    ...state.colorPicker,
                    currentColor: {
                        ...state.colorPicker.currentColor,
                        hex: action.colorPicker.currentColor.hex,
                        rgba: action.colorPicker.currentColor.rgba
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

        case types.CHANGE_SOURCE_CODE: {

            const { currentCode } = action.sourceCodePanel;
            const { codeType, codeProps } = currentCode;
            let newCurrentCodeState = state.sourceCodePanel.currentCode.slice();

            // To know if code type already exists on sourceCodePanel/currentCode state
            let codeTypeAlreadyExists = functionsUtil.valueExistsInArray(state.sourceCodePanel.currentCode, codeType, 'codeType');

            /* TODO: Todo este fragmento esta repetido en reducers/atom.reducer, deberiamos crear una funcion
            global que haga esta operación */
            if (codeTypeAlreadyExists) {
                newCurrentCodeState = newCurrentCodeState.map(
                    code => {
                        if (code.codeType !== codeType) {
                            return code;
                        }

                        return {
                            ...code,
                            codeProps
                        };
                    }
                );
            } else {
                newCurrentCodeState = state.sourceCodePanel.currentCode.concat({
                    codeType,
                    codeProps
                });
            }
            /* TODO: Fin del fragmento */

            return {
                ...state,
                sourceCodePanel: {
                    currentCode: newCurrentCodeState
                }
            };

        }

        case types.CHANGE_LIBS: {
            return {
                ...state,
                libsPanel: {
                    ...state.libsPanel,
                    // NOTE: 1
                    libs: [].concat(action.libsPanel.libs)
                }
            };
        }

            
        default:
            return state;  
    }
}

/*
    (1): Es la manera de evitar el error de mutable un array, crear una copia nueva del array.
*/