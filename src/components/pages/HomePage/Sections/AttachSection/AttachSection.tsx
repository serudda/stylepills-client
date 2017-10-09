/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/show_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AttachSectionProps = {
    //
};


/**
 * @desc Represent Feed Repository Section on Home Page
 * @function AttachSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const AttachSection: React.SFC<AttachSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div>

            {/* Section: Attach anything */}
            <div className="row no-gutters align-items-center section">
                <div className="col-12">
                    <div className="leftSide__content__text">
                        <h2 className="m-0 mb-3">
                            Attach anything
                        </h2>
                        <p className="fontSize-xl color-silver m-0">
                            Attach any resources associated with your Component so that you'll never lose them again. 
                            From <strong>.psd</strong>, <strong>.ai</strong>, <strong>.sketch</strong> to <strong>.jpg</strong>, 
                            <strong> .png</strong>, and <strong>.svg</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image (Mobile): Attach anything */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    {/* Aqui va el SVG */}
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="Attach Page"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default AttachSection;