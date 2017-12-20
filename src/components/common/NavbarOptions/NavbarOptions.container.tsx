/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { Location } from 'history';

import * as classNames from 'classnames';

import { config } from './../../../config/config';

import { IRootState } from '../../../reducer/reducer.config';

import { User as UserModel } from '../../../models/user/user.model';

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
class NavbarOptions 
extends React.Component<ChildProps<NavbarOptionsProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<NavbarOptionsProps & StateProps & DispatchProps, {}>) {
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
        let trigger = null;
        let userLinks = null;
        let guestLinks =  null;

        // Explore Nav Link Classes
        const exploreNavLinkClasses = classNames({
            'nav-link': true, 
            'color-slate': true,
            'fontSize-sm': true,
            'active': location.pathname === '/explore'
        });

        
        // If user is logged in
        if (user) {

            // Dropdown of the logged in user (trigger)
            // TODO: Remove inline styles
            trigger = (
                <div className="sp-avatar sp-avatar--xxs borderRadius-circle position-relative" 
                     style={{top: '5px'}}>
                    <img width="25" 
                        height="25" 
                        src={user.avatar} 
                        alt={`${user.firstname} ${user.lastname}`} />
                </div>
            );

            // User logged in links options
            userLinks = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-3">
                        <Link className={exploreNavLinkClasses}
                            to={`/explore`}>
                            Explore
                        </Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Dropdown trigger={trigger} 
                                pointing="top right" 
                                icon={null} 
                                className="sp-dropdown sp-dropdown--userMenu">
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link className="link-reset" 
                                        to={`/user/${user.username}`}>
                                        My Profile
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className="link-reset" to={`/dashboard`}>
                                        My Dashboard
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className="link-reset" to={`/dashboard/account`}>
                                        Settings
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={this._handleLogoutClick}>
                                    Log out
                                </Dropdown.Item>
                            </ Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            );

        } else {

            // Guest user links options
            guestLinks = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-3">
                        <Link className={exploreNavLinkClasses}
                            to={`/explore`}>
                            Explore
                        </Link>
                    </li>
                    <li className="nav-item ml-3">
                        <a href={serverConfig.authGoogleUrl} className="nav-link fontSize-sm">
                            Sign Up
                        </a>
                    </li>
                    <li className="nav-item">
                        <span className="color-smoke fontSize-sm d-block py-2 px-2">|</span>
                    </li>
                    <li className="nav-item">
                        <a href={serverConfig.authGoogleUrl} className="nav-link fontSize-sm">
                            Log In
                        </a>
                    </li>
                </ul>
            );
            
        }
            
        
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