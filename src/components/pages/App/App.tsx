/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import Main from '../Main/Main.presentation';
import './App.css'; // Tell Webpack that App.tsx uses these styles


/**
 * @desc The parent component renders the Header component and component(s) 
 * in the route the user navigates to.
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

    constructor() {
        super();
    }


    /*         RENDER         */
    /**************************/
    render() {
        return (
            <div>
                {/*<Header />*/}
                <Main />
            </div>
        );
    }
}

/* Export */
export default App;