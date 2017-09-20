/************************************/
/*           DEPENDENCIES           */
/************************************/
import { takeLatest } from 'redux-saga/effects';
import getUiComponentsSaga from '../models/uiComponent/uiComponent.saga';
import getColorPalettesSaga from '../models/colorPalette/colorPalette.saga';
import * as types from '../constants/action.types';



/** 
 * @desc Watcher for GET_UICOMPONENT action type asynchronously
 * @function watchGetUiComponent
 * @type FUNCTION GENERATOR 
 */
export default function* watchGetUiComponent() {
    yield [
        takeLatest(types.GET_UICOMPONENT, getUiComponentsSaga),
        takeLatest(types.GET_COLORPALETTE, getColorPalettesSaga)
    ];
}



/*

generator functions (e.g. function* () {...} )
A diferencia de las funciones normales, que al entrar en ellas, corren, y devuelven
un valor final, las generator functions pueden pausarse y reanudarse a petición y
pueden retornar (con mayor precisión 'yield') valores multiples.

takeLatest
Es un metodo de alto nivel que fusiona los effect creators 'take' y 'folk'. Basicamente 
toma un action type y una función que pasamos como segundo parametro, se queda
escuchando a que se dispare dicha action, cuando se dispare dicha action, este
watcher dispara la funcion que pasamos (e.g. getUiComponentsSaga). Como su nombre 
lo sugiere, 'takeLatest' devuelve el resultado de la ultima llamada.

watchGetUiComponent
Este esta siempre a la espera que se lance una Action con el Action Type: 'GET_UICOMPONENT'.
Al despacharse esta Action, el watcher detectara que se acaba de despachar, y esta lanza
la funcion: getUiComponentSaga con el payload que viene en la Action.

*/