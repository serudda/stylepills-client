/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import * as classNames from 'classnames';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type NavbarOptionsProps = {
    isAuthenticated: boolean,
    username: string,
    firstname: string,
    lastname: string,
    avatar: string,
    loginUrl: string,
    signupUrl: string,
    currentLocation: string,
    onLogoutClick: (e: React.FormEvent<{}>) => void;
};


/**
 * @desc Represent Navbar Options
 * @function NavbarOptions
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const NavbarOptions: React.SFC<NavbarOptionsProps> = ({
    isAuthenticated = false, 
    username,
    firstname,
    lastname,
    avatar,
    loginUrl,
    signupUrl,
    currentLocation,
    onLogoutClick
 }) => {

    let userLinks = null;
    let guestLinks = null;
    const DASHBOARD_URI = '/dashboard';

    // Dashboard Nav Link Classes
    const dashboardNavLinkClasses = () => {

        // Validate if current location is 'dashboard'
        const match: any = matchPath(currentLocation, {
            path: DASHBOARD_URI,
            exact: false,
            strict: false
        });

        return classNames({
            'nav-link': true, 
            'color-slate': true,
            'fontSize-sm': true,
            'active': !!match
        });    
    };

    // Explore Nav Link Classes
    const exploreNavLinkClasses = classNames({
        'nav-link': true, 
        'color-slate': true,
        'fontSize-sm': true,
        'active': currentLocation === '/explore'
    });

    // Now Nav Link Classes
    const nowNavLinkClasses = classNames({
        'nav-link': true, 
        'nav-link--negative': true,
        'fontSize-sm': true,
        'fontWeight-9': true
    });


     // If user is logged in
     if (isAuthenticated) {

        // Dropdown of the logged in user (trigger)
        const trigger = (
            <div className="sp-avatar sp-avatar--xxs borderRadius-circle position-relative" 
                 style={{top: '5px'}}>
                <img width="25" 
                    height="25" 
                    src={avatar} 
                    alt={`${firstname} ${lastname}`} />
            </div>
        );

        // User logged in links options
        userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-3">
                    <a className={nowNavLinkClasses} href="http://now.stylepill.io" target="_blank">
                        Now
                    </a>
                </li>
                <li className="nav-item mx-3">
                    <Link className={dashboardNavLinkClasses()}
                        to={`/dashboard`}>
                        Dashboard
                    </Link>
                </li>
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
                                    to={`/user/${username}`}>
                                    My Profile
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link className="link-reset" to={`/dashboard`}>
                                    My Dashboard
                                </Link>
                            </Dropdown.Item>
                            {/*<Dropdown.Item>
                                <Link className="link-reset" to={`/dashboard/account`}>
                                    Settings
                                </Link>
                            </Dropdown.Item>*/}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={onLogoutClick}>
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
                    <a className={nowNavLinkClasses} href="http://now.stylepill.io" target="_blank">
                        Now
                    </a>
                </li>
                <li className="nav-item mx-3">
                    <Link className={exploreNavLinkClasses}
                        to={`/explore`}>
                        Explore
                    </Link>
                </li>
                <li className="nav-item ml-3">
                    <a href={signupUrl} className="nav-link fontSize-sm">
                        Sign Up
                    </a>
                </li>
                <li className="nav-item">
                    <span className="color-smoke fontSize-sm d-block py-2 px-2">|</span>
                </li>
                <li className="nav-item">
                    <a href={loginUrl} className="nav-link fontSize-sm">
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
    
};


/* Export */
export default NavbarOptions;