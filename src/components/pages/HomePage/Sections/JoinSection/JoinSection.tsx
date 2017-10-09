/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type JoinSectionProps = {
    //
};


/**
 * @desc Represent Host Component Section on Home Page
 * @function JoinSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const JoinSection: React.SFC<JoinSectionProps> = () => {

    
    /*         MARKUP          */
    /***************************/
    
    return (

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
                        <div className="col mb-2">
                            <a href="http://eepurl.com/c1fttz"
                                className="sp-btn sp-btn--lg sp-btn--primary borderRadius-md fontWeight-9 fontFamily-openSans">
                                SIGN UP
                            </a>
                        </div>
                        <div className="col mb-2">
                            <a href="http://stylepills.co/"
                                className="sp-btn sp-btn--md sp-btn--neutral borderRadius-md fontWeight-9 fontFamily-openSans">
                                See Components
                            </a>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    );
    
};


/* Export */
export default JoinSection;