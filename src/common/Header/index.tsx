import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="ma-header">
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/components">Components</Link></li>
            </ul>
        </nav>
    </header>
);


export default Header;