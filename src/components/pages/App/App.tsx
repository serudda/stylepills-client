/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

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
    constructor() {
        super();
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
            return {
                variables:
                { 
                   id:  ownProps.user.id
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
export default compose<any>(
    appConnect,
    getUserByIdQuery
)(App);