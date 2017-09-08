import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeComponent from '../HomePage/HomePage.presentation';
import ComponentPage from '../ComponentPage/ComponentPage.presentation';
import NotFoundPage from '../NotFoundPage/NotFoundPage.presentation';


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