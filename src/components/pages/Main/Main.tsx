/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Switch, Route, withRouter, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../../reducer/reducer.config';
import { User } from '../../../models/user/user.model';

import HomePage from '../HomePage/HomePage.container';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import StyleguidePage from '../StyleguidePage/StyleguidePage';
import ExplorePage from '../ExplorePage/ExplorePage.container';
import DashboardPage from '../DashboardPage/DashboardPage.container';
import UserProfilePage from '../UserProfilePage/UserProfilePage.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type MainProps = {};

type WithRouterMainProps = MainProps & RouteComponentProps<any>;

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
    user: User;
};

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


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Main 
extends React.Component<ChildProps<WithRouterMainProps & StateProps, {}>, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<WithRouterMainProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const { isAuthenticated } = this.props;
        
        /*         MARKUP          */
        /***************************/
        return (
            <main>
                <div className="AppContent">
                    <Switch>
                        <Route exact={true} path="/" component={HomePage} />
                        <Route exact={true} path="/styleguide" component={StyleguidePage} />
                        <Route exact={true} path="/explore" component={ExplorePage} />
                        <PrivateRoute isAuthenticated={isAuthenticated}
                                        path="/dashboard"
                                        component={DashboardPage}/>
                        <Route exact={true} path="/user/:username" component={UserProfilePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </main>
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
const mainConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default withRouter(compose(
    mainConnect
)(Main));