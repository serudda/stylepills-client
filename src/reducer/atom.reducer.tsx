/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/atom.action';


/************************************/
/*            INTERFACES            */
/************************************/

interface IAtomCodeProps {
    code: string;
    libs?: Array<string>;
}

interface IAtomsProps {
    id: any;
    name: string;
    atomCode: Array<{codeType: string, codeProps: IAtomCodeProps}>;
}

export interface IAtomState {
    atoms: Array<IAtomsProps>;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IAtomState = {
    atoms: [],
};

// -----------------------------------

// TODO: Pasar a un functionUtils (basarse en server)
// To know if an element already exists on an Array
function inArray(array: Array<any>, comparisonProp: string, comparisonValue: any) {

    for (let i = 0; i < array.length; i++) {
        if (array[i][comparisonProp] === comparisonValue) {
            return true;
        }
    }

    return false;

}

// TODO: No me convence esta descomposicion, ya que siento que puede llegar a enredar un poco.
// Si decido dejarla, agregar una description bien detallada de por que descompuse atoms
const atom = (state: IAtomsProps, action: Action) => {

    switch (action.type) {

        case types.EDIT_ATOM_REQUEST: {
            const { atoms } = action;
            const { atomCode } = atoms;
            const { codeType } = atomCode;
            let newAtomCodeState = state.atomCode.slice();

            // To know if atomCode already exists on atom state
            let atomCodeAlreadyExists = inArray(state.atomCode, 'codeType', codeType);

            if (atomCodeAlreadyExists) {
                newAtomCodeState = state.atomCode.map(
                    code => {
                        if (code.codeType !== codeType) {
                            return code;
                        }

                        return {
                            ...code,
                            atomCode
                        };
                    }
                );
            } else {
                newAtomCodeState.push({
                    codeType: action.atoms.atomCode.codeType,
                    codeProps: action.atoms.atomCode.codeProps
                });
            }

            return {
                id: action.atoms.id,
                name: action.atoms.name,
                atomCode: newAtomCodeState
            };

        }

        default:
            return state;
    }
    
};


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

        case types.EDIT_ATOM_REQUEST: {
            const { atoms } = action;
            const { id } = atoms;
            let newAtomCode: Array<any> = [];
            let newAtomsState = state.atoms.slice();

            // To know if atom already exists on atoms state
            let atomAlreadyExists = inArray(state.atoms, 'id', id);

            if (atomAlreadyExists) {
                newAtomsState = state.atoms.map(
                    (a: IAtomsProps) => {
                        if (a.id === action.atoms.id) {
                            return atom(a, action);
                        }
                        return a;
                    }
                );
            } else {
                // TODO: Analizar por que tengo una mezcla aqui: creo un nuevo objeto
                // para no mutar el original, pero para evitar crear copias,
                // deberia usar concat.
                newAtomsState.push({
                    id: action.atoms.id,
                    name: action.atoms.name,
                    atomCode: newAtomCode.concat(action.atoms.atomCode)
                });
            }

            return {
                ...state,
                atoms: newAtomsState
            };
        }
            
        default:
            return state;  
    }
}
