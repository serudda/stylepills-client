/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import Header from '../../common/Header/Header.container';
import AtomsListContainer from '../../common/AtomsList/AtomsList.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExplorePageProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExplorePage 
extends React.Component<ChildProps<ExplorePageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ExplorePage sp-bg-darkSnow h-100">
                
                {/* Header */}
                <Header />

                {/* Atoms list container */}
                <AtomsListContainer />

            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default ExplorePage;