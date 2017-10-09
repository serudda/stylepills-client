/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/add_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PrivateComponentSectionProps = {
    //
};


/**
 * @desc Represent Private Component Section on Home Page
 * @function PrivateComponentSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const PrivateComponentSection: React.SFC<PrivateComponentSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div>

            {/* Section: Private components */}
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

            {/* Image (Mobile): Private components */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    {/* Aqui va el SVG */}
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="Private Component"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default PrivateComponentSection;