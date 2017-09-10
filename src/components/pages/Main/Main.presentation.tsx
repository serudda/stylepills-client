/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../HomePage/HomePage.presentation';
import ComponentPage from '../ComponentPage/ComponentPage.presentation';
import NotFoundPage from '../NotFoundPage/NotFoundPage.presentation';


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
            <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/components" component={ComponentPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    );
};

/* Export */
export default Main;