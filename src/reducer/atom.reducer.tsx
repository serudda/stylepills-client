/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/atom.action';


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
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IAtomState = {
    edited: {
        atoms: [],
        watchingChanges: false,
        isEdited: false
    }
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

        case types.ATOM_DETAILS_CHANGED: {
            const { atoms } = action.edited;
            const { atomId, name, atomCode } = atoms;
            const { codeType, codeProps } = atomCode;
            let newAtomCodeState = state.atomCode.slice();

            // To know if atomCode already exists on atom state
            let atomCodeAlreadyExists = inArray(state.atomCode, 'codeType', codeType);

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
            // tslint:disable-next-line:no-console
            console.log('state.edited.atoms.slice(): ', newAtomsState);

            // To know if atom already exists on atoms state
            let atomAlreadyExists = inArray(state.edited.atoms, 'atomId', atomId);

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
                // TODO: Analizar por que tengo una mezcla aqui: creo un nuevo objeto
                // para no mutar el original, pero para evitar crear copias,
                // deberia usar concat.
                newAtomsState = state.edited.atoms.concat({
                    atomId,
                    name,
                    atomCode: newAtomCode.concat(atomCode)
                });
                // tslint:disable-next-line:no-console
                console.log('newAtomsState.concat: ', newAtomsState);
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
