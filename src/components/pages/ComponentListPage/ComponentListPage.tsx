/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

const logo = require('../../../resources/images/Stylepills-main-short-logo.svg');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentListPageProps = {/**/};

type LocalStates = { 
    explanationImage: string
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentListPageContainer extends React.Component<ChildProps<ComponentListPageProps, {}>, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

        // Init local state
        /*this.state = {
            explanationImage: PUV_IMAGE_URL
        };*/
        
        // Bind methods
        this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleWaypointEnter
     * @method _handleWaypointEnter
     * @example this._handleWaypointEnter()
     * @private 
     * @returns {void}
     */
    private _handleWaypointEnter (e: any) {
        //
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        return (
            <div className="ComponentListPage">
                {}
            </div>
        );
    }

}


/* Export */
export default ComponentListPageContainer;