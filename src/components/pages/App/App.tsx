/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Main from '../Main/Main';
// import Header from './../../common/Header/Header';
// import Footer from './../../common/Footer/Footer';
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
            <div className="AppContent sp-bg-darkSnow">
                {/*<Header />*/}
                <Main />
                {/*<Footer />*/}
            </div>
        );
    }
}


/* Export */
export default App;