/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import Icon from '../../../../common/Icon/Icon';
import AddColorForm from './../../../../common/AddColorForm/AddColorForm.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorFieldsProps = {
    nextStep: Function,
    previousStep: Function
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

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 2 - ColorFields actived');

        // Bind methods
        this._handlePrevClick =  this._handlePrevClick.bind(this);
        this._handleNextClick =  this._handleNextClick.bind(this);
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandlePrevClick
     * @method _handlePrevClick
     * @example this._handlePrevClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handlePrevClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._previousStep();
    }


    /**
     * @desc HandleNextClick
     * @method _handleNextClick
     * @example this._handleNextClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleNextClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._nextStep();
    }


    /**
     * @desc Previous Step
     * @method _previousStep
     * @example this._previousStep()
     * @private
     * @returns {void}
     */
    private _previousStep() {
        this.props.previousStep();
    }


    /**
     * @desc Next Step
     * @method _nextStep
     * @example this._nextStep()
     * @private
     * @returns {void}
     */
    private _nextStep() {
        // Get values via this.refs
        /*let fieldValues = {
            name: this.state.fields.name,
            website: this.state.fields.website
        };*/

        // this.props.saveValues(data);
        // this.props.nextStep(fieldValues);
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
                        <div className="iconContainer d-inline-flex flex-column align-items-center"
                            onClick={this._handlePrevClick}>
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
                            Color palette of the project
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    <form>

                        {/* Add Primary colors */}
                        <AddColorForm title="PRIMARY COLORS" 
                                      description="These are the colors that define your brand."
                                      type="primary"/>


                        <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                        {/* Add Secondary colors */}
                        <AddColorForm title="SECONDARY COLORS" 
                                      description="These colors are support to accompany the primary colors."
                                      type="secondary"/>


                        <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                        {/* Add Grayscale colors */}
                        <AddColorForm title="GRAYSCALE COLORS" 
                                      description="A selection of grayscale colors for background or text color use."
                                      type="grayscale"/>

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