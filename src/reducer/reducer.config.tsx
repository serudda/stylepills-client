/************************************/
/*           DEPENDENCIES           */
/************************************/
import { combineReducers } from 'redux';
import { ApolloClient } from 'react-apollo';

import ui, { IUiState } from './ui.reducer';
import search, { ISearchState } from './search.reducer';

// Initialize Client
const client = new ApolloClient();

/************************************/
/*            INTERFACES            */
/************************************/
// Root State: Contains every Reducer State on the Store
// TODO: Asignar un tipo a apollo
export interface IRootState {
    apollo: any;
    ui: IUiState;
    search: ISearchState;
}

/************************************/
/*           ROOT REDUCER           */
/************************************/
// Combines all reducers to a single reducer function
/* TODO: Analizar por que ahora el Store tiene un search global, pero deberia tener un
   search por cada tipo: searchAtoms, searchCategories, searchUsers, etc. */
const rootReducer = combineReducers<IRootState>({
    apollo: client.reducer(),
    ui,
    search
});

/* Export */
export default rootReducer;