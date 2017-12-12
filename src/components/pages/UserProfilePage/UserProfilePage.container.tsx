/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_USER_BY_USERNAME_QUERY, GetByUsernameResponse } from '../../../models/user/user.query';

import Icon from './../../common/Icon/Icon';
import NavbarOptions from './../../common/NavbarOptions/NavbarOptions.container';
import UserStats from './UserStats/UserStats';
import AtomsListContainer from './AtomsList/AtomsList.container';
import NotFound from './../NotFoundPage/NotFoundPage';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type UserProfilePageProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class UserProfilePage 
extends React.Component<ChildProps<UserProfilePageProps & StateProps, GetByUsernameResponse>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<UserProfilePageProps & StateProps, GetByUsernameResponse>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const {
            data: {loading, error, userByUsername},
        } = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (<div>Loading</div>);
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (userByUsername === null) {
            return (<NotFound />);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="UserProfilePage sp-bg-darkSnow h-100">
                
                {/* Header */}
                <header className="Header">

                    <div className="width-wrapper">

                        {/* Navbar */}
                        <div className="navbar navbar-light navbar-expand-lg mb-3 px-2 py-3">

                            {/* Logo */}
                            <a className="sp-logo sp-logo--sm sp-logo--black m-0 link-reset" href="/">
                                <Icon icon="logo" 
                                    iconClass="mr-2"
                                    width="20" height="20"/>
                                <span>Stylepill</span>
                            </a>

                            {/* Navbar options */}
                            <NavbarOptions />

                        </div>

                        {/* User Info Section */}
                        <div className="UserInfoSection row mb-5 justify-content-center text-center">

                            <div className="d-none d-sm-none d-md-block col-md-4" />
                            <div className="col-sm-6 col-md-4 mb-3">

                                <div className="UserInfoContainer">
                                    {/* Avatar Container */}
                                    <div className="sp-avatar sp-avatar--xxxl borderRadius-circle">
                                        <img width="150" height="150" src={userByUsername.avatar} alt={userByUsername.username} />
                                    </div>

                                    {/* Basic User Information */}
                                    <h1 className="color-black">{userByUsername.firstname} {userByUsername.lastname}</h1>
                                    <p className="fontSize-lg color-black">
                                        {userByUsername.about}
                                    </p>

                                    {/* User Stats */}
                                    <div className="mt-5">
                                        <UserStats components={0} followers={0} following={0}/>
                                    </div>
                                </div>

                            </div>
                            <div className="d-none d-sm-none d-md-block col-md-4" />

                        </div>
                    
                    </div>

                </header>

                {/* Atoms list container */}
                <AtomsListContainer firstname={userByUsername.firstname} 
                                    lastname={userByUsername.lastname} 
                                    username={userByUsername.username}/>

            </div>
        );
    }

}

// Params types
type InputProps = {
    match: {
        params: {
            username: string
        }
    }
};

// Query options
const config = {
    options: (ownProps: InputProps) => (
        { 
            variables: 
            { 
                username: ownProps.match.params.username
            } 
        }
    )
};


/********************************/
/*            QUERY             */
/********************************/
const getUserByUsernameQuery = graphql<GetByUsernameResponse, UserProfilePageProps>(
    GET_USER_BY_USERNAME_QUERY, config
);


/*         EXPORT          */
/***************************/
export default compose(
    getUserByUsernameQuery
)(UserProfilePage);