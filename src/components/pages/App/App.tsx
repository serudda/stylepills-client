/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

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
            <main>
                <div className="AppContent sp-bg-darkSnow">
                    {this.props.children}
                </div>
            </main>
        );
    }
}


/* Export */
export default App;