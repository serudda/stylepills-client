/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Location } from 'history';

import { config } from './../../../../config/config';
import { IRootState } from './../../../../reducer/reducer.config';

import { User as UserModel } from './../../../../models/user/user.model';

import { logoutAction } from './../../../../actions/auth.action';

import NavbarOptions from './../../../components/Navbars/NavbarOptions/NavbarOptions';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type NavbarOptionsContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
    user: UserModel;
    location: Location;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        auth: {
            logout: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class NavbarOptionsContainer 
extends React.Component<ChildProps<NavbarOptionsContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<NavbarOptionsContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Bind methods
        this._handleLogoutClick = this._handleLogoutClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleLogoutClick
     * @method _handleLogoutClick
     * @example this._handleLogoutClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleLogoutClick (e: React.FormEvent<{}>) {
        e.preventDefault();
        this._logout();
    }


    /**
     * @desc Logout 
     * @method _logout
     * @example this._logout()
     * @private
     * @returns {void}
     */
    private _logout() {
        this.props.actions.auth.logout();
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Get server config object
        const serverConfig = config.getServerConfig();
        const { isAuthenticated = false, user = null } = this.props;
        const { location } = this.props;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <NavbarOptions isAuthenticated={isAuthenticated}
                            username={user.username}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            avatar={user.avatar}
                            loginUrl={serverConfig.authGoogleUrl}
                            signupUrl={serverConfig.authGoogleUrl}
                            currentLocation={location.pathname}
                            onLogoutClick={this._handleLogoutClick} />
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { isAuthenticated, user } = state.auth;
    const { location } = state.router;
    return {
        isAuthenticated,
        user,
        location
    };
}

/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            // NOTE: #1
            auth: {
                logout: () => dispatch(logoutAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const navbarOptionsContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    navbarOptionsContainerConnect
)(NavbarOptionsContainer);




/*
#1 - This action does not works, because google return No Access Cross Origin Domain
I keep this action here to have a example that how to get data from another source
different to GraphQL (axios and thunk actions).
*/