/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import HomePage from '../HomePage/HomePage.container';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import StyleguidePage from '../StyleguidePage/StyleguidePage';
import ExplorePage from '../ExplorePage/ExplorePage.container';
import DashboardPage from '../DashboardPage/DashboardPage.container';
import UserProfilePage from '../UserProfilePage/UserProfilePage.container';


/************************************/
/*            INTERFACES            */
/************************************/
interface IMainProps {}


/**
 * @desc Represent Main Structure which contains Routes List
 * @function Main
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view & routes list
 */
const Main: React.SFC<IMainProps> = () => {
    return (
        <main>
            <div className="AppContent">
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route exact={true} path="/styleguide" component={StyleguidePage} />
                    <Route exact={true} path="/explore" component={ExplorePage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route exact={true} path="/user/:username" component={UserProfilePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </main>
    );
};


/* Export */
export default withRouter(Main);