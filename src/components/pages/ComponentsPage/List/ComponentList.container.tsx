/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { User } from './../../../../models/user/user.model';

import { GET_USER_BY_USERNAME_QUERY, GetByUsernameResponse } from './../../../../models/user/user.query';

import Header from './../Header/Header';
import UserAtomsListContainer from './../../../../app/containers/UserAtomsList/UserAtomsList.container';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentListProps = {};

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
class ComponentList
extends React.Component<ChildProps<ComponentListProps & StateProps, GetByUsernameResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ComponentListProps & StateProps, GetByUsernameResponse>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const {
            data: { userByUsername, loading, error },
        } = this.props;

        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentsPage">

                {/* Header */}
                <Header />

                {/* Atoms list container */}
                <UserAtomsListContainer firstname={userByUsername.firstname} 
                                        lastname={userByUsername.lastname} 
                                        username={userByUsername.username}/>

            </div>
        );

    }

}


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
const dashboardPageConnect = connect(mapStateToProps); 


// Query config object
/* TODO: Analizar si esto es necesario ya que solo lo estoy haciendo para obetener el firstname, 
    lastname, y username del usuario (el cual ya tengo en el Store) */
const config = {
    skip: (ownProps: ComponentListProps & StateProps) => {
        return !ownProps.isAuthenticated;
    },
    options: (ownProps: ComponentListProps & StateProps) => {
        // TODO: PARCHE: Es una solucion antes de migrar react-apollo a v2
        // https://github.com/apollographql/react-apollo/blob/master/Changelog.md
        // https://github.com/apollographql/react-apollo/pull/1181
        let username = null;
        
        if (ownProps.user) {
            username = ownProps.user.username;
        }

        return {
            variables: 
            { 
                username
            }
        };
    }
};

/********************************/
/*            QUERY             */
/********************************/
const getUserByUsernameQuery = graphql<GetByUsernameResponse, ComponentListProps>(
    GET_USER_BY_USERNAME_QUERY, config
);


/*         EXPORT          */
/***************************/
export default compose<any>(
    dashboardPageConnect,
    getUserByUsernameQuery
)(ComponentList);