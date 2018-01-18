/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/atom.action';

import { functionsUtil } from './../core/utils/functionsUtil';


/************************************/
/*            INTERFACES            */
/************************************/

/* TODO: Estas mismas interfaces estan en atom.action, cuando quise importarla desde afuera
    me sugirio importarla de aqui y de action, eso esta mal. Deberia estar centralizada en 
    un solo lugar */
export interface ICodeProps {
    code: string;
    libs?: Array<string>;
}

export interface IAtomCodeProps {
    codeType: string;
    codeProps: ICodeProps;
}

export interface IAtomsProps {
    atomId: any;
    name: string;
    atomCode: Array<IAtomCodeProps>;
}

export interface IAtomState {
    edited: {
        atoms: Array<IAtomsProps>;
        watchingChanges: boolean;
        isEdited: boolean;
    };
    created: {
        atomId?: number;
        isCreated: boolean;
    };
    message?: string;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IAtomState = {
    edited: {
        atoms: [],
        watchingChanges: false,
        isEdited: false
    },
    created: {
        atomId: null,
        isCreated: false
    }
};

// -----------------------------------


/** 
 * @desc This function takes Atom actions and return a new state 
 * @param {IAtomState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IAtomState} 
 */
export default function (state: IAtomState = defaultState, action: Action): IAtomState {

    switch (action.type) {

        /***********************************/
        /*           ATOM ACTIONS          */
        /***********************************/

        case types.CLEAR_ATOM_STATE: {
            return {
                ...state,
                edited: {
                    ...state.edited,
                    atoms: [],
                    watchingChanges: false,
                    isEdited: false
                },
                created: {
                    ...state.created,
                    atomId: null,
                    isCreated: false
                }
            };
        }

        case types.CREATE_ATOM_REQUEST: {
            return {
                ...state,
                created: { 
                    isCreated: false
                }
            };
        }

        case types.CREATE_ATOM_SUCCESS: {
            return {
                ...state,
                created: {
                    ...state.created,
                    atomId: action.created.atomId,
                    isCreated: true
                }
            };
        }

        case types.CREATE_ATOM_FAILURE: {
            return {
                ...state,
                created: {
                    isCreated: false
                },
                message: action.message
            };
        }

        case types.EDIT_ATOM_REQUEST: {
            return {
                ...state,
                edited: {
                    ...state.edited,
                    atoms: [],
                    watchingChanges: true,
                    isEdited: false
                }
            };
        }

        case types.ATOM_DETAILS_CHANGED: {
            const { atoms } = action.edited;
            const { atomId, name, atomCode } = atoms;
            let newAtomCode: Array<any> = [];
            let newAtomsState = state.edited.atoms.slice();

            // To know if atom already exists on atoms state
            let atomAlreadyExists = functionsUtil.inArray(state.edited.atoms, 'atomId', atomId);

            if (atomAlreadyExists) {
                newAtomsState = newAtomsState.map(
                    (a: IAtomsProps) => {
                        if (a.atomId === atomId) {
                            return atom(a, action);
                        }
                        return a;
                    }
                );
            } else {
                newAtomsState = state.edited.atoms.concat({
                    atomId,
                    name,
                    atomCode: newAtomCode.concat(atomCode)
                });
            }

            return {
                ...state,
                edited: {
                    ...state.edited,
                    watchingChanges: true,
                    isEdited: true,
                    atoms: newAtomsState
                }
            };
        }
            
        default:
            return state;  
    }
}



/** 
 * @desc Descomposition of atoms state on Store
 * @param {IAtomState} state 
 * @param {Action} action 
 * @returns {IAtomsProps} 
 */
const atom = (state: IAtomsProps, action: Action): IAtomsProps => {

    switch (action.type) {

        case types.ATOM_DETAILS_CHANGED: {
            const { atoms } = action.edited;
            const { atomId, name, atomCode } = atoms;
            const { codeType, codeProps } = atomCode;
            let newAtomCodeState = state.atomCode.slice();

            // To know if atomCode already exists on atom state
            let atomCodeAlreadyExists = functionsUtil.inArray(state.atomCode, 'codeType', codeType);

            /* TODO: Todo este fragmento esta repetido en reducers/ui.reducer, deberiamos crear una funcion
            global que haga esta operación */
            if (atomCodeAlreadyExists) {
                newAtomCodeState = newAtomCodeState.map(
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
                newAtomCodeState = state.atomCode.concat({
                    codeType,
                    codeProps
                });
            }
            /* TODO: Fin del fragmento */


            return {
                ...state,
                atomId,
                name,
                atomCode: newAtomCodeState
            };

        }

        default:
            return state;
    }
    
};