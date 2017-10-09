/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

const explanationImage = require('../../../../../resources/images/show_component_page.png');

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type FeedRepositorySectionProps = {
    //
};


/**
 * @desc Represent Feed Repository Section on Home Page
 * @function FeedRepositorySection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const FeedRepositorySection: React.SFC<FeedRepositorySectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div>

            {/* Section: Feed your repository */}
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

            {/* Image (Mobile): Feed your repository */}
            <div className="row no-gutters d-block d-lg-none align-items-center section">
                <div className="col-12">
                    {/* Aqui va el SVG */}
                    <img className="borderRadius-md w-100" 
                        src={explanationImage} 
                        alt="Feed your repository"/>
                </div>
            </div>

        </div>
    );
    
};


/* Export */
export default FeedRepositorySection;