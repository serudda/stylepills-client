/************************************/
/*           DEPENDENCIES           */
/************************************/
import { combineReducers } from 'redux';
import { ApolloClient } from 'react-apollo';
import { Store } from 'apollo-client/store';
import { routerReducer as router, RouterState } from 'react-router-redux';

import auth, { IAuthState } from './auth.reducer';
import ui, { IUiState } from './ui.reducer';
import search, { ISearchState } from './search.reducer';
import pagination, { IPaginationState } from './pagination.reducer';

// Initialize Client
const client = new ApolloClient();


/************************************/
/*            INTERFACES            */
/************************************/
// Root State: Contains every Reducer State on the Store
export interface IRootState {
    apollo: Store;
    auth: IAuthState;
    ui: IUiState;
    search: ISearchState;
    pagination: IPaginationState;
    router: RouterState;
}

/************************************/
/*           ROOT REDUCER           */
/************************************/
// Combines all reducers to a single reducer function
const rootReducer = combineReducers<IRootState>({
    apollo: client.reducer(),
    auth,
    ui,
    search,
    pagination,
    router
});

/* Export */
export default rootReducer;