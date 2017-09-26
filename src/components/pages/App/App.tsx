/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Main from '../Main/Main.presentation';
// import Header from './../../common/Header/Header.presentation';
// import Footer from './../../common/Footer/Footer.presentation';
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
            <div className="AppContent">
                {/*<Header />*/}
                <Main />
                {/*<Footer />*/}
            </div>
        );
    }
}


/* Export */
export default App;