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

    <header className="Header position-relative">

        <div className="width-wrapper d-flex align-items-center justify-content-end">

            {/* Logo and Burguer Icon */}
            <div className="mr-auto">
                <a className="Header__logo m-0 link-reset" href="/">
                    <img src={logo} alt="Stylepills" width="20px"/>
                    <span className="fontFamily-quicksand fontWeight-9">Stylepills</span>
                </a>
            </div>

            {/* Header Menu */}
            <div className="HeaderMenu d-lg-flex justify-content-between fontSmoothing-reset">
                <div className="d-lg-flex">
                    <span className="d-block d-lg-inline-block">
                        <div className="HeaderNavlink px-0 py-2 m-0 float-right">
                        
                            <a className="sp-link sp-link--box sp-link--box--secondary fontSize-sm fontWeight-9 mr-3" 
                                href="https://stylepill.carrd.co/" 
                                target="_blank">
                                Open
                            </a>

                            <a className="sp-link sp-link--box sp-link--box--black fontSize-sm fontWeight-9" 
                                href="https://rdmap.co/roadmap/218" 
                                target="_blank">
                                Now
                            </a>

                            <span className="textWeight-9 color-white mr-3 ml-3">|</span>

                            <a className="sp-btn sp-btn--sm sp-btn--black-ghost sp-bg-smoke--hover borderRadius-sm fontWeight-9" 
                                href="http://eepurl.com/c1fttz">
                                Sign Up
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