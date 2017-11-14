/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Main from '../Main/Main';

import './App.css'; 



interface IAppProps {
    currentUserId: number;
}

/**
 * @desc The parent component renders the Header component and component(s) 
 * in the route the user navigates to.
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component<IAppProps> {

    /*         RENDER         */
    /**************************/
    render() {

        // tslint:disable-next-line:no-console
        console.log(this.props.currentUserId);

        return (
            <div className="AppContent sp-bg-darkSnow">
                <Main />
            </div>
        );
    }
}


/* Export */
export default App;