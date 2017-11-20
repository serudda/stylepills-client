/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { config } from './../../../config/config';

import { IRootState } from '../../../reducer/reducer.config';

import { logoutAction } from '../../../actions/auth.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type NavbarOptionsProps = {};

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
            logout: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class NavbarOptions 
extends React.Component<ChildProps<NavbarOptionsProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

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
        const { isAuthenticated } = this.props;

        const userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2 active">
                    <a className="nav-link color-slate fontSize-sm" href="">
                        Explore
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a onClick={this._handleLogoutClick} href="" className="nav-link color-slate fontSize-sm">
                        Log out
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2 active">
                    <a className="nav-link color-slate fontSize-sm" href="">
                        Explore
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a href={serverConfig.authGoogleUrl} className="nav-link color-slate fontSize-sm">
                        Sign Up
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a href={serverConfig.authGoogleUrl} className="nav-link color-slate fontSize-sm">
                        Log In
                    </a>
                </li>
            </ul>
        );
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="NavbarOptions collapse navbar-collapse">
                {isAuthenticated ? userLinks : guestLinks}
            </div>
        );

    }

}



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
const navbarOptionsConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    navbarOptionsConnect
)(NavbarOptions);




/*
#1 - This action does not works, because google return No Access Cross Origin Domain
I keep this action here to have a example that how to get data from another source
different to GraphQL (axios and thunk actions).
*/