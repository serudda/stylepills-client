import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../HomePage';
import ComponentPage from '../ComponentPage';


const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/components" component={ComponentPage} />
            </Switch>
        </main>
    );
};

export default Main;