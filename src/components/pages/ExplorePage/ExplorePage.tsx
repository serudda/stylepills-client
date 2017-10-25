/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Header from '../../common/Header/Header.container';


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
type ExplorePageProps = {};


/**
 * @desc Represent Explore Page
 * @function ExplorePage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const ExplorePage: React.SFC<ExplorePageProps> = () => {


    /*         MARKUP          */
    /***************************/

    return (
        <div className="ExplorePage sp-bg-darkSnow h-100">
            
            {/* Header */}
            <Header />

        </div>
    );

};

/* Export */
export default ExplorePage;