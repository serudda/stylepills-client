/************************************/
/*           DEPENDENCIES           */
/************************************/
import { combineReducers } from 'redux';
import uiComponents from '../models/uiComponent/uiComponent.reducer';
import colorPalettes from '../models/colorPalette/colorPalette.reducer';

// Set of States 
import { IUiComponentState } from '../models/uiComponent/uiComponent.reducer';
import { IColorPaletteState } from '../models/colorPalette/colorPalette.reducer';


/************************************/
/*            INTERFACES            */
/************************************/
// Root State: Contains every Reducer State on the Store
export interface IRootState {
    uiComponents: IUiComponentState;
    colorPalettes: IColorPaletteState;
}

/************************************/
/*           ROOT REDUCER           */
/************************************/
// Combines all reducers to a single reducer function
const rootReducer = combineReducers<IRootState>({
    uiComponents,
    colorPalettes
});

/* Export */
export default rootReducer;



/**
 * Nota importante:
 * Al hacer el combineReducer, este le asigna el nombre al espacio en el 'Store',
 * donde vamos a almacenar todos los State de dicho reducer.
 * e.g. En el Store, se creara un objeto 'uiComponents' (nombre que le estamos asignando en
 * el combineReducers) que contendra todos los State que el reducer uiComponent gestiona.
 */

/**
 * Root State: Ya que combineReducers al combinar cada Reducer, crea un espacio en el objeto
 * del State del Store, a cada uno de los Reducers, es necesario crear una interface IRootState
 * que nos ayude a visualizar como seria el arbol del Store, en este caso el Store solo tendria 
 * una 'rama' llamada uiComponents. Pero cada vez ue agreguemos un nuevo Reducer, este va a irse
 * abriendo un espacio propio en el arbol de States en el Store, como por ejemplo:
 * 
 *      Store: {
 *          uiComponents: {
 *              items: [...],
 *              fetching: false,
 *              fetched: false,
 *              error: ''
 *          },
 *          otherReducer: {
 *          ...
 *          },
 *          anotherReducer: {
 *          ...
 *          }
 *      }
 */
// Typing Reference: 
// https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/src/redux/root-reducer.ts