/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import PuvSection from './Sections/PuvSection/PuvSection';
import HostComponentSection from './Sections/HostComponentSection/HostComponentSection';
import FeedRepositorySection from './Sections/FeedRepositorySection/FeedRepositorySection';
import PrivateComponentSection from './Sections/PrivateComponentSection/PrivateComponentSection';
import CreateStyleguideSection from './Sections/CreateStyleguideSection/CreateStyleguideSection';
import AttachSection from './Sections/AttachSection/AttachSection';
import JoinSection from './Sections/JoinSection/JoinSection';

const logo = require('../../../resources/images/Stylepills-main-short-logo.svg');
const PUV_IMAGE_URL = require('../../../resources/images/show_component_page.png');
const HOST_COMPONENT_IMAGE_URL = require('../../../resources/images/add_component_page.png');
const PRIVATE_COMPONENT_IMAGE_URL = require('../../../resources/images/show_component_page.png');
const ATTACH_IMAGE_URL = require('../../../resources/images/add_component_page.png');
const FEED_REPOSITORY_IMAGE_URL = require('../../../resources/images/show_component_page.png');
const CREATE_STYLEGUIDE_IMAGE_URL = require('../../../resources/images/add_component_page.png');

/* NOTE: There's an issue with the last version 7.3.1, for that reason, I had to use 7.2.0
reference: https://github.com/brigade/react-waypoint/pull/223 */
const Waypoint = require('react-waypoint');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HomePageProps = {/**/};

type LocalStates = { 
    explanationImage: string
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class HomePageContainer extends React.Component<ChildProps<HomePageProps, {}>, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

        // Init local state
        this.state = {
            explanationImage: PUV_IMAGE_URL
        };
        
        // Bind methods
        this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleWaypointEnter
     * @method _handleWaypointEnter
     * @example this._handleWaypointEnter()
     * @private 
     * @returns {void}
     */
    _handleWaypointEnter = (section: string) => (e: any) => {

        let currentImage = PUV_IMAGE_URL;

        switch (section) {
            case '1':
                currentImage = PUV_IMAGE_URL;
                break;
            case '2':
                currentImage = HOST_COMPONENT_IMAGE_URL;
                break;
            case '3':
                currentImage = PRIVATE_COMPONENT_IMAGE_URL;
                break;
            case '4':
                currentImage = FEED_REPOSITORY_IMAGE_URL;
                break;
            case '5':
                currentImage = ATTACH_IMAGE_URL;
                break;
            case '6':
                currentImage = CREATE_STYLEGUIDE_IMAGE_URL;
                break;
            default:
                currentImage = PUV_IMAGE_URL;
                break;
        }

        // Save current Image in Local State
        this.setState({
            explanationImage: currentImage
        });
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        return (
            <div className="HomePage row no-gutters">
    
                {/* Left Side */}
                <div className="leftSide col-12 col-lg-5 px-lg-5">
                        
                    {/* Header */}
                    <div className="leftSide__header px-5 w-100">
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
    
                        {/* Section: PUV */}
                        <PuvSection />
    
                        <Waypoint
                            onEnter={this._handleWaypointEnter('1')}
                        />
    
                        {/* Section: Host Components */}
                        <HostComponentSection />
    
                        <Waypoint
                            onEnter={this._handleWaypointEnter('2')}
                        />
    
                        {/* Section: Feed your repository */}
                        <FeedRepositorySection />
     
                        <Waypoint
                            onEnter={this._handleWaypointEnter('3')}
                        />
    
                        {/* Section: Private components */}
                        <PrivateComponentSection />
     
                        <Waypoint
                            onEnter={this._handleWaypointEnter('4')}
                        /> 
    
                        {/* Section: Create styleguides */}
                        <CreateStyleguideSection />
     
                        <Waypoint
                            onEnter={this._handleWaypointEnter('5')}
                        /> 
    
                        {/* Section: Attach anything */}
                        <AttachSection />
     
                        <Waypoint
                            onEnter={this._handleWaypointEnter('6')}
                        /> 
    
                        {/* Section: Join */}
                        <JoinSection />
    
                    </div>
    
                </div>
    
                {/* Right Side */}
                <div className="rightSide col-12 col-lg-7 d-none d-lg-block">
                    <div className="rightSide__content flex-center">
                        
                        {/* Header */}
                        <div className="rightSide__content__header pl-4 pr-4 position-absolute w-100">
                            <div className="w-100">
                                <div className="HeaderNavlink px-0 py-2 m-0 float-right">
    
                                    <a className="sp-link sp-link--box sp-link--box--primary fontSize-sm fontWeight-9 mr-3" 
                                        href="https://stylepill.carrd.co/#now" 
                                        target="_blank">
                                        Open
                                    </a>
    
                                    <a className="sp-link sp-link--box sp-link--box--white fontSize-sm fontWeight-9" 
                                        href="http://eepurl.com/c1fttz" 
                                        target="_blank">
                                        Now
                                    </a>
    
                                    <span className="textWeight-9 color-white mr-3 ml-3">|</span>
    
                                    <a className="sp-btn sp-btn--sm sp-btn--white-ghost borderRadius-sm fontWeight-9" 
                                        href="http://eepurl.com/c1fttz">
                                        Sign Up
                                    </a>
    
                                </div>
    
                            </div>
                        </div>
    
                        {/* Aqui va el SVG */}
                        <img className="borderRadius-md" 
                                src={this.state.explanationImage} 
                                alt="Explanation Image"/>
    
                        {/* Footer */}
                        <div className="rightSide__content__footer position-absolute">
                            <a className="fontFamily-courierNew color-white fontSize-md fontWeight-9 textShadow-close" 
                                href="https://www.codementor.io/rosa7082/how-we-created-and-launched-stylepill-in-less-than-12-hours-and-got-to-1-on-product-hunt-bu44wpppo"
                                target="_blank">
                                Made with ❤️ and ☕ by Rosita &amp; Sergio
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }

}


/* Export */
export default HomePageContainer;