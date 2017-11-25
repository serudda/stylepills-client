/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { compose, ChildProps } from 'react-apollo';
import { connect } from 'react-redux';

import { IRootState } from '../../../reducer/reducer.config';

import Icon from './../../common/Icon/Icon';
import NavbarOptions from './../../common/NavbarOptions/NavbarOptions.container';
import UserStats from './UserStats/UserStats';
import AtomsListContainer from '../../common/AtomsList/AtomsList.container';

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
extends React.Component<ChildProps<UserProfilePageProps & StateProps, {}>, LocalStates> {


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
                                <span>Stylepills</span>
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
                                        <img width="150" height="150" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Rosita" />
                                    </div>

                                    {/* Basic User Information */}
                                    <h1 className="color-black">Sergio Ruiz Davila</h1>
                                    <p className="fontSize-lg color-black">
                                        Soy un desarrollador Web me encanta desarrollar cosas y diseñar cosas con mis cosas de la casa.
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
                <AtomsListContainer />

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        search: state.search
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const userProfilePageConnect = connect(mapStateToProps, null); 


/*         EXPORT          */
/***************************/
export default compose(
    userProfilePageConnect
)(UserProfilePage);