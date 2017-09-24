/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const logo = require('../../../resources/images/Stylepills-main-short-logo.svg');


/************************************/
/*            INTERFACES            */
/************************************/
interface IHeaderProps {}


/***********************************************************************/
/*           STATELESS FUNCTIONAL COMPONENT (SFC) DEFINITION           */
/***********************************************************************/
const Header: React.SFC<IHeaderProps> = () => (

    <header className="Header">

        <div className="container d-lg-flex justify-content-end">

            {/* Logo and Burguer Icon */}
            <div className="mr-auto">
                <a className="Header__logo m-0 link-reset" href="https://stylepills.co">
                    <img src={logo} alt="Stylepills" width="28px"/>
                    <span className="fontFamily-quicksand fontWeight-9">Stylepills</span>
                </a>
            </div>

            {/* Header Menu */}
            <div className="HeaderMenu d-lg-flex justify-content-between fontSmoothing-reset">
                <div className="d-lg-flex">
                    <span className="d-block d-lg-inline-block">
                        <div className="HeaderNavlink px-0 py-2 m-0">
                            <a className="fontWeight-9 color-primary no-underline" 
                                href="/login">
                                Now
                            </a>
                            <span className="textWeight-9 color-slate marginRight-2 marginLeft-2">|</span>
                            <a className="textWeight-9 color-white no-underline" 
                                href="/join?source=header-home">
                                Join List
                            </a>
                        </div>
                    </span>
                </div>
            </div>

        </div>

    </header>
    
);

/* Export */
export default Header;