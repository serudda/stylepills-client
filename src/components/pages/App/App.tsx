/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_USER_BY_ID_QUERY, GetByIdResponse } from '../../../models/user/user.query';

import { IRootState } from '../../../reducer/reducer.config';

import Main from '../Main/Main';

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
    userId: string;
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
                   id:  ownProps.userId
               }
            };
        }
    }
);


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { isAuthenticated, userId } = state.auth; 
    return {
        isAuthenticated,
        userId
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