/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/add_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HostComponentSectionProps = {
    //
};


/**
 * @desc Represent Host Component Section on Home Page
 * @function HostComponentSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const HostComponentSection: React.SFC<HostComponentSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div>

            {/* Section: Host Components */}
            <div className="row no-gutters align-items-center section">
                <div className="col-12">
                    <div className="leftSide__content__text">
                        <h2 className="m-0 mb-3">
                            Host all your own components
                        </h2>
                        <p className="fontSize-xl color-silver m-0">
                            Host all your components so you can find them quickly whenever you need to include them in your projects.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image (Mobile): Host Components */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    {/* Aqui va el SVG */}
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="Host Components"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default HostComponentSection;