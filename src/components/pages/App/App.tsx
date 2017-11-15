/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_USER_BY_ID_QUERY, GetByIdResponse } from '../../../models/user/user.query';
import { User as UserModel } from '../../../models/user/user.model';

import { IRootState } from '../../../reducer/reducer.config';
import { IAuthState } from '../../../reducer/auth.reducer';

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
    auth: IAuthState;
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
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() { 
        if (this.props.data) {
            if (this.props.data.userById && !this.props.auth.user) {
                // Save current user on Store
                this.props.actions.auth.setCurrentUser(this.props.data.userById);
            }
        }
    }


    /********************************/
    /*     COMPONENT DID UPDATE     */
    /********************************/
    componentDidUpdate() {
        if (this.props.data) {
            if (this.props.data.userById && !this.props.auth.user) {
                // Save current user on Store
                this.props.actions.auth.setCurrentUser(this.props.data.userById);
            }
        }
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        // const {...data} = this.props.data;


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
            return !ownProps.currentUserId && !ownProps.auth.isAuthenticated;
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
    return {
        auth: state.auth
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
export default compose(
    appConnect,
    getUserByIdQuery
)(App);