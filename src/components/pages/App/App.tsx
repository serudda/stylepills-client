/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import Header from '../../common/Header/Header.presentation';
import Main from '../Main/Main.presentation';
import './App.scss';


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
            <div className="container-fluid text-center">
                <Header />
                <Main />
            </div>
        );
    }
}

/* Export */
export default App;