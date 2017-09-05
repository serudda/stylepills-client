import { takeLatest } from 'redux-saga/effects';
import getUiComponentsSaga from './uiComponentSaga';
import * as types from '../constants/actionTypes';

// Watches for GET_UICOMPONENTS action type asynchronously
export default function* watchGetUiComponent() {
    yield takeLatest(types.GET_UICOMPONENT, getUiComponentsSaga);
}


/*

generator functions (e.g. function* () {...} )
A diferencia de las funciones normales, que al entrar en ellas, corren, y devuelven
un valor final, las generator functions pueden pausarse y reanudarse a petición y
pueden retornar (con mayor precisión 'yield') valores multiples.


takeLatest
Es un metodo de alto nivel que fusiona los effect creators 'take' y 'folk'. Basicamente 
toma un action type y ejecuta la función que pasamos como segundo parametro, de una
manera no bloqueante con el resultado del action creator. Como su nombre lo sugiere,
'takeLatest' devuelve el resultado de la ultima llamada.

watchGetUiComponent
Este esta siempre a la espera que se lance una Action con el Action Type: 'GET_UICOMPONENT'.
Al despacharse esta Action, el watcher detectara que se acaba de despachar, y esta lanza
la funcion: getUiComponentSaga con el payload que viene en la Action.

*/