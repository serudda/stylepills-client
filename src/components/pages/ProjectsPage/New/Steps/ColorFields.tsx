/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import Icon from '../../../../common/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorFieldsProps = {
    nextStep: any,
    previousStep: any
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ColorFields
extends React.Component<ChildProps<ColorFieldsProps & StateProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ColorFieldsProps & StateProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ColorFields StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-5">

                    <div className="nav-section d-flex">
                        {/* Back button */}
                        <div className="iconContainer d-inline-flex flex-column align-items-center">
                            <Icon icon="arrowLeft" 
                                iconClass="icon stroke-silver strokeWidth-2"
                                width="26" height="26"/>
                            <div className="label fontSize-xs color-silver fontWeight-7">BACK</div>
                        </div>
                        {/* Close button */}
                        <div className="iconContainer d-inline-flex flex-column align-items-center ml-auto">
                            <Icon icon="close"
                                iconClass="icon stroke-silver strokeWidth-2"
                                width="26" height="26"/>
                            <div className="label fontSize-xs color-silver fontWeight-7">ESC</div>
                        </div>
                    </div>

                    <div className="title-section text-center">
                        {/* Title */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-sm color-silver mt-5">
                            CREATE NEW PROJECT
                        </div>
                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2">
                            Basic project information
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    {/* First step: Basic Project Information */}
                    <form>
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            PROJECT NAME
                        </label>
                        <input type="text" 
                                className="sp-input sp-input--md sp-input--block"
                                placeholder="e.g. Airbnb"/>
                        
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset mt-4">
                            PROJECT WEBSITE
                        </label>
                        <input type="text" 
                                className="sp-input sp-input--md sp-input--block" 
                                placeholder="e.g. https://www.airbnb.com"/>

                        <div className="switchContainer d-flex align-items-center mt-5">
                            <div className="d-flex flex-column">
                                <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                    MAKE THIS PROJECT PRIVATE
                                </div>
                                <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                    Hide this project from the public
                                </div>
                            </div>
                            <button className="sp-btn sp-btn--primary sp-btn--sm ml-auto">
                                Make private
                            </button>
                        </div>

                    </form>

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <a className="link-reset fontSize-sm color-silver fontWeight-6 textDecoration ml-2" href="#">
                        Skip this step
                    </a>
                    <button className="sp-btn sp-btn--secondary sp-btn--md ml-auto">
                        Next
                    </button>
                </div>

            </div>

        );

    }

}


/*         EXPORT          */
/***************************/
export default ColorFields;