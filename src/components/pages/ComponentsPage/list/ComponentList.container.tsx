/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_USER_BY_USERNAME_QUERY, GetByUsernameResponse } from './../../../../models/user/user.query';

import Header from './../Header/Header';
import AtomsListContainer from './../../UserProfilePage/AtomsList/AtomsList.container';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentListProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


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
            <div>

                {/* Header */}
                <Header />

                {/* Atoms list container */}
                <AtomsListContainer firstname={userByUsername.firstname} 
                lastname={userByUsername.lastname} 
                username={userByUsername.username}/>

            </div>
        );

    }

}

// Query options
// TODO: Analizar de donde se deberia sacar este username
const config = {
    options: (ownProps: any) => (
        { 
            variables: 
            { 
                username: 'sergior-1834020'
            } 
        }
    )
};


/********************************/
/*            QUERY             */
/********************************/
const getUserByUsernameQuery = graphql<GetByUsernameResponse, ComponentListProps>(
    GET_USER_BY_USERNAME_QUERY, config
);


/*         EXPORT          */
/***************************/
export default compose(
    getUserByUsernameQuery
)(ComponentList);