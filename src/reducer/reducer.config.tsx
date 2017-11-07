/************************************/
/*           DEPENDENCIES           */
/************************************/
import { combineReducers } from 'redux';
import { ApolloClient } from 'react-apollo';
import { Store } from 'apollo-client/store';

import ui, { IUiState } from './ui.reducer';
import search, { ISearchState } from './search.reducer';

// Initialize Client
const client = new ApolloClient();

/************************************/
/*            INTERFACES            */
/************************************/
// Root State: Contains every Reducer State on the Store
export interface IRootState {
    apollo: Store;
    ui: IUiState;
    search: ISearchState;
}

/************************************/
/*           ROOT REDUCER           */
/************************************/
// Combines all reducers to a single reducer function
const rootReducer = combineReducers<IRootState>({
    apollo: client.reducer(),
    ui,
    search
});

/* Export */
export default rootReducer;