/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
const logo = require('../../../resources/images/Stylepills-main-short-logo.svg');
const addComponentPage = require('../../../resources/images/add_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HomePageProps = {
    //
};


/**
 * @desc Represent Home Page
 * @function HomePage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const HomePage: React.SFC<HomePageProps> = () => {
    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div className="HomePage">
            <div className="row no-gutters">
                <div className="leftSide col-xs-12 col-sm-5 pl-5 pr-5">
                        
                    {/* Header */}
                    <div className="leftSide__header pl-5 pr-5">
                        <div className="leftSide__header__content">
                            {/* Logo and Burguer Icon */}
                            <div className="float-left">
                                <a className="Header__logo m-0 link-reset" href="/">
                                    <img src={logo} alt="Stylepills" width="28px"/>
                                    <span className="fontFamily-quicksand fontWeight-9 color-black">Stylepills</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="leftSide__content">

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-4 lineHeight-6">
                                        <span className="color-secondary fontWeight-9">Stylepills</span> is a social repository for Front-end designers and developers.
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0 mb-5">
                                        The best place to host/show off your UI Components, create the styleguides of your projects, and find inspiration in the community's open source components.
                                    </p>
                                    <a href="http://eepurl.com/c1fttz"
                                        className="sp-btn sp-btn--lg sp-btn--primary borderRadius-md fontWeight-9 fontFamily-openSans">
                                        JOIN LIST
                                    </a> 
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Host all your own Components
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0">
                                        Host every component so you can find them quickly whenever you need them to include in your projects.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Feed your repository
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0">
                                        Make your repository grow with the open source UI components of community members. 
                                        Store them in your personal repository.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Need private components?
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0">
                                        If you are working on a top-secret project, you can make your components be private.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Keep the styleguides for all your projects in one convenient place
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0">
                                        Simplify your development process by having your fonts, typography, and UI components 
                                        together in one convenient place. So you and the team members can have quick and easy access 
                                        to the project's styleguide.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Attach anything
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0">
                                        Attach any resources associated with your Component so that you'll never lose them again. 
                                        From .psd, .ai, .sketch to .jpg, .png, and .svg.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <hr className="borderColor-extraDarkSmoke borderStyle-dashed"/>

                        <div className="row no-gutters align-items-center section">
                            <div className="col-12">
                                <div className="leftSide__content__text">
                                    <h2 className="m-0 mb-3">
                                        Join the pioneers
                                    </h2>
                                    <p className="fontSize-xl color-silver m-0 mb-2">
                                        We're working on a closed beta, making the repository with our 
                                        <a className="fontWeight-9 sp-link sp-link--box sp-link--box--secondary ml-1" 
                                           href="https://stylepill.carrd.co/#now"
                                           target="_blank">1000+ early subscribers</a>. 
                                        But if you want an access, let us know by signing up, we'll gladly give it to you.
                                    </p>
                                    <p className="fontSize-md fontWeight-9 color-silver m-0 mb-5">
                                        While we're working on the Stylepills closed beta, we'll send you beautiful open source UI components weekly.
                                    </p>
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <a href="http://eepurl.com/c1fttz"
                                               className="sp-btn sp-btn--lg sp-btn--primary borderRadius-md fontWeight-9 fontFamily-openSans">
                                                JOIN LIST
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a href="http://eepurl.com/c1fttz"
                                               className="sp-btn sp-btn--md sp-btn--neutral borderRadius-md fontWeight-9 fontFamily-openSans">
                                                See Components
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xs-12 col-sm-7">
                    <div className="explanation-image sp-bg-darkSmoke flex-center" style={{backgroundImage: 'linear-gradient(-180deg, rgb(39, 106, 174) 0%, rgb(66, 140, 202) 28%, rgb(104, 169, 223) 74%, rgb(138, 203, 242) 100%)'}}>
                        {/* Aqui va el SVG */}
                        <img className="borderRadius-md" 
                             src={addComponentPage} 
                             alt="Add Component Page"/>
                        {/* Footer */}
                        <div style={{position: 'absolute', bottom: '25px'}}>
                            <a className="fontFamily-courierNew color-white fontSize-md fontWeight-9 textShadow-close" 
                               href="https://www.codementor.io/rosa7082/how-we-created-and-launched-stylepill-in-less-than-12-hours-and-got-to-1-on-product-hunt-bu44wpppo"
                               target="_blank">
                               Made with ❤️ and ☕ by Rosita &amp; Sergio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};


/* Export */
export default HomePage;