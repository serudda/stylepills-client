/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Main from '../Main/Main.presentation';
// NOTE: Tell Webpack that App.tsx uses these styles. App.css contain every styles of the project
import './App.css'; 


/**
 * @desc The parent component renders the Header component and component(s) 
 * in the route the user navigates to.
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {


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