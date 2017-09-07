import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../HomePage';
import ComponentPage from '../ComponentPage';
import NotFoundPage from '../../presentational/NotFoundPage';


const Main = () => {
    console.log('(10) Activated Main component on presentational/Main.tsx');
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

export default Main;