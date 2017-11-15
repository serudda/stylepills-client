/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_USER_BY_ID_QUERY, GetByIdResponse } from '../../../models/user/user.query';
import { User as UserModel } from '../../../models/user/user.model';

import { IRootState } from '../../../reducer/reducer.config';
// import { IAuthState } from '../../../reducer/auth.reducer';

import { setCurrentUserAction } from '../../../actions/auth.action';

import Main from '../Main/Main';

import './App.css'; 


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AppProps = {
    currentUserId: string;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        auth: {
            setCurrentUser: (user: UserModel) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class App 
extends React.Component<ChildProps<AppProps & StateProps & DispatchProps, GetByIdResponse>, LocalStates> {

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

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;

        // tslint:disable-next-line:no-console
        console.log('DATA: ', data.userById);


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
        skip: (ownProps) => {
            return !ownProps.auth.isAuthenticated;
        },
        options:  (ownProps: AppProps) => {
            return {
                variables: 
                { 
                   id:  ownProps.currentUserId
               }
            };
        }
    }
);


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { isAuthenticated } = state.auth;
    return {
        isAuthenticated
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            auth: {
                setCurrentUser: (user: UserModel) => dispatch(setCurrentUserAction(user))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const appConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose<any>(
    appConnect,
    getUserByIdQuery
)(App);