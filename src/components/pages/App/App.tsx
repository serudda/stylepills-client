/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_USER_BY_ID_QUERY, GetByIdResponse } from '../../../models/user/user.query';

import { IRootState } from '../../../reducer/reducer.config';

import { User } from '../../../models/user/user.model';

import Main from '../Main/Main';
import ModalManager from './../../common/Modal/ModalManager/ModalManager.container';

import 'semantic-ui-css/semantic.min.css';
import './App.css'; 


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AppProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
    user: User;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class App 
extends React.Component<ChildProps<AppProps & StateProps, GetByIdResponse>, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AppProps & StateProps, GetByIdResponse>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*         MARKUP          */
        /***************************/
        return (
            <div className="AppContent sp-bg-darkSnow">
                <ModalManager />
                <Main />
            </div>
        );
    }
}


/********************************/
/*            QUERY             */
/********************************/
const getUserByIdQuery = graphql<GetByIdResponse, AppProps>(
    GET_USER_BY_ID_QUERY, {
        skip: (ownProps: AppProps & StateProps) => {
            return !ownProps.isAuthenticated;
        },
        options:  (ownProps: AppProps & StateProps) => {
            // TODO: PARCHE: Es una solucion antes de migrar react-apollo a v2
            // https://github.com/apollographql/react-apollo/blob/master/Changelog.md
            // https://github.com/apollographql/react-apollo/pull/1181
            let id = null;

            if (ownProps.user) {
                id = ownProps.user.id;
            }

            return {
                variables:
                { 
                   id
               }
            };
        }
    }
);


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { isAuthenticated, user } = state.auth; 
    return {
        isAuthenticated,
        user
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const appConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default withRouter(compose<any>(
    appConnect,
    getUserByIdQuery
)(App));