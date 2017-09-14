/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../../constants/action.types';
import * as model from './colorPalette.model';
import { Action } from './colorPalette.action';



/************************************/
/*            INTERFACES            */
/************************************/

export interface IColorPaletteState {
    items: Array<model.ColorPalette>;
    error: string;
    fetching: Boolean;
    fetched: Boolean;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IColorPaletteState = {
    items: [],
    error: '',
    fetching: false,
    fetched: false
};



/** 
 * @desc This function takes Color Palette actions and return a new state 
 * @param {IColorPaletteState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IColorPaletteState} 
 */
export default function (state: IColorPaletteState = defaultState, action: Action): IColorPaletteState {

    switch (action.type) {

        /***********************************/
        /*       API REQUEST ACTIONS       */
        /***********************************/

        case types.GET_COLORPALETTE: {
            return {...state, fetching: true};
        }

        case types.GET_COLORPALETTE_FULFILLED: {
            return {...state, 
                    items: action.payload,
                    fetching: false,
                    fetched: true
            };
        }
        
        case types.GET_COLORPALETTE_ERROR: {
            return {...state, 
                    fetching: false,
                    error: action.payload
            };
        }


        /***********************************/
        /*            UI ACTIONS           */
        /***********************************/
            
        default:
            return state;  
    }
}
