/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/styleguide_page.png');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CreateStyleguideSectionProps = {};


/**
 * @desc Represent Feed Repository Section on Home Page
 * @function CreateStyleguideSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const CreateStyleguideSection: React.SFC<CreateStyleguideSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    return (
        <div>

            {/* Section: Create styleguides */}
            <div className="row no-gutters align-items-center section">
                <div className="col-12">
                    <div className="leftSide__content__text">
                        <h2 className="m-0 mb-3">
                            Keep the styleguides for all your projects in one convenient place
                        </h2>
                        <p className="fontSize-xl color-silver m-0">
                            Simplify your development process by having your fonts, typography, and UI components 
                            together in one convenient place. So you and your team members can have quick and easy access 
                            to the project's styleguide.
                        </p>
                    </div>
                </div>
            </div>

            {/* Image (Mobile): Create styleguides */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="Create Styleguide"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default CreateStyleguideSection;