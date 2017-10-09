/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/show_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PuvSectionProps = {/**/};


/**
 * @desc Represent Puv Section on Home Page
 * @function PuvSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const PuvSection: React.SFC<PuvSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div>

            {/* Section: PUV */}
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
                            SIGN UP
                        </a> 
                    </div>
                </div>
            </div>
            
            {/* Image (Mobile): PUV */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    {/* Aqui va el SVG */}
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="PUV"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default PuvSection;