/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

interface IPrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
}


/**
 * @desc Represent Private Route Structure
 * @function PrivateRoute
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view & routes list
 */
export const PrivateRoute: React.SFC<IPrivateRouteProps> = ({
    component, isAuthenticated, ...rest
}) => {
    return (
        <Route
        {...rest}
        render={props => isAuthenticated ? React.createElement(component, props) 
                : <Redirect
                    to={{
                        pathname: '/explore',
                        state: { from: props.location },
                    }}
                />}
        />
    );
};