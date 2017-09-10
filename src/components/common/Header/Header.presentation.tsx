/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from "react-router-dom";


/************************************/
/*            INTERFACES            */
/************************************/
interface IHeaderProps {}


/*************************************/
/*           INLINE STYLES           */
/*************************************/
const liStyle = {
    display: 'inline-block'
};


/***********************************************************************/
/*           STATELESS FUNCTIONAL COMPONENT (SFC) DEFINITION           */
/***********************************************************************/
const Header: React.SFC<IHeaderProps> = () => (
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

/* Export */
export default Header;