/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage.container';
import AtomsListPage from '../AtomsListPage/AtomsListPage';
import AtomDetailsPage from '../AtomDetailsPage/AtomDetailsPage.container';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import StyleguidePage from '../StyleguidePage/StyleguidePage';
import ExplorePage from '../ExplorePage/ExplorePage.container';


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
                    {/* tslint:disable-next-line:jsx-boolean-value */}
                    <Route exact path="/" component={HomePage} />
                    <Route path="/components" component={AtomsListPage} />
                    <Route path="/atom/:id" component={AtomDetailsPage} />
                    <Route path="/styleguide" component={StyleguidePage} />
                    <Route path="/explore" component={ExplorePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </main>
    );
};


/* Export */
export default Main;