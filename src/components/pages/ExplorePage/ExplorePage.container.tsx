/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import Header from '../../common/Header/Header.container';
import GeneralAtomsListContainer from './../../../app/containers/GeneralAtomsList/GeneralAtomsList.container';

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
    constructor(props: ChildProps<ExplorePageProps & StateProps, {}>) {
        super(props);
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
                <Header showFilterSection={true} showSliderSection={true} />

                {/* Atoms list container */}
                <GeneralAtomsListContainer />

            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default ExplorePage;