/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

const liStyle = {
    display: 'inline-block'
};

const Header = () => (
    <header className="ma-header container">
        <nav className="navbar navbar-default">
            <ul>
                <li style={liStyle}><Link to="/">Home</Link></li>
                {' | '}
                <li style={liStyle}><Link to="/components">Components</Link></li>
            </ul>
        </nav>
    </header>
);


export default Header;