/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { SketchPicker } from 'react-color';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import Icon from '../../../../common/Icon/Icon';

const ntc = require('ntcjs');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

type ColorRGBA = {
    r: number,
    g: number,
    b: number,
    a: number
};

/* Own Props */
type ColorFieldsProps = {
    nextStep: Function,
    previousStep: Function
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean,
    colorRgba: ColorRGBA,
    colorHex: string,
    colorName: string
};

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

        // Init local state
        this.state = {
            displayColorPicker: false,
            colorRgba: {
                r: 253,
                g: 249,
                b: 128,
                a: 100
            },
            colorHex: '',
            colorName: ''
        };

        // Bind methods
        this._handleColorClick = this._handleColorClick.bind(this);
        this._handleColorChange = this._handleColorChange.bind(this);
        this._handleColorCloseClick = this._handleColorCloseClick.bind(this);
        this._handlePrevClick =  this._handlePrevClick.bind(this);
        this._handleNextClick =  this._handleNextClick.bind(this);
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleColorClick
     * @method _handleColorClick
     * @example this._handleColorClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }


    /**
     * @desc HandleColorChange
     * @method _handleColorChange
     * @example this._handleColorChange()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorChange(color: any) {
        const nameMatch = ntc.name(color.hex);

        this.setState({ 
            colorRgba: color.rgb, 
            colorHex: color.hex,
            colorName: nameMatch[1] 
        });
    }

    
    /**
     * @desc HandleColorCloseClick
     * @method _handleColorCloseClick
     * @example this._handleColorCloseClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorCloseClick (e: React.FormEvent<{}>) {
        this.setState({ displayColorPicker: false });
    }


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
                        <div className="d-flex flex-column mb-3">
                            <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                PRIMARY COLORS
                            </div>
                            <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                These are the colors that define your brand.
                            </div>
                        </div>


                        <div className="d-flex align-items-center">

                            {/* Input: Color */}
                            <div className="sp-inputGroup sp-inputGroup--color sp-inputGroup--color--md mr-3">
                                
                                <div className="context" 
                                    onClick={this._handleColorClick}
                                    style={{
                                        background: `rgba(${ this.state.colorRgba.r }, ${ this.state.colorRgba.g }, ${ this.state.colorRgba.b }, ${ this.state.colorRgba.a })`
                                        }}/>
                                
                                <input type="text" 
                                       placeholder="#FDF980" 
                                       className="input" 
                                       value={this.state.colorHex}
                                       onClick={this._handleColorClick}
                                       readOnly={true}/>
                                
                                {/* Color Picker */}
                                {this.state.displayColorPicker && 
                                <div style={{
                                    position: 'absolute',
                                    zIndex: 2,
                                    left: '50px'
                                }}>
                                    <div style={{
                                            position: 'fixed',
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px',
                                        }} onClick={this._handleColorCloseClick}/>
                                    <SketchPicker color={this.state.colorRgba} onChange={this._handleColorChange}/>
                                </div>}

                            </div>
                            

                            {/* Input: Color Name */}
                            <div className="sp-inputGroup sp-inputGroup--label sp-inputGroup--label--md mr-3">
                                <span className="context">
                                    Name
                                </span>
                                <input type="text" 
                                        placeholder="Light Primary" 
                                        className="input" 
                                        value={this.state.colorName} />
                            </div>

                            {/* Add Button */}
                            <button className="sp-btn sp-btn--secondary sp-btn--md">
                                Add
                            </button>

                        </div>


                        <ul className="sp-list sp-list--simple mt-4">
                            <li className="item">
                                <span className="sample-color borderRadius-sm" style={{backgroundColor: '#FDF980'}}/>
                                <span className="text">
                                    Light Primary Color
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        HEX
                                    </span>
                                    <span className="text">
                                        #FDF980
                                    </span>
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        RGB
                                    </span>
                                    <span className="text">
                                        254, 254, 254
                                    </span>
                                </span>
                                <span className="icon-btn ml-auto">
                                    <Icon icon="close"
                                        iconClass="icon stroke-silver strokeWidth-3"
                                        width="18" height="18"/>
                                </span>
                            </li>

                            <li className="item">
                                <span className="sample-color borderRadius-sm" style={{backgroundColor: '#FEEB6A'}}/>
                                <span className="text">
                                    Primary Color
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        HEX
                                    </span>
                                    <span className="text">
                                        #FEEB6A
                                    </span>
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        RGB
                                    </span>
                                    <span className="text">
                                        254, 254, 254
                                    </span>
                                </span>
                                <span className="icon-btn ml-auto">
                                    <Icon icon="close"
                                        iconClass="icon stroke-silver strokeWidth-3"
                                        width="18" height="18"/>
                                </span>
                            </li>

                            <li className="item">
                                <span className="sample-color borderRadius-sm" style={{backgroundColor: '#FCD85E'}}/>
                                <span className="text">
                                    Dark Primary Color
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        HEX
                                    </span>
                                    <span className="text">
                                        #FCD85E
                                    </span>
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        RGB
                                    </span>
                                    <span className="text">
                                        254, 254, 254
                                    </span>
                                </span>
                                <span className="icon-btn ml-auto">
                                    <Icon icon="close"
                                        iconClass="icon stroke-silver strokeWidth-3"
                                        width="18" height="18"/>
                                </span>
                            </li>

                            <li className="item">
                                <span className="sample-color borderRadius-sm" style={{backgroundColor: '#3CDAD5'}}/>
                                <span className="text">
                                    Light Secondary Color
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        HEX
                                    </span>
                                    <span className="text">
                                        #3CDAD5
                                    </span>
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        RGB
                                    </span>
                                    <span className="text">
                                        254, 254, 254
                                    </span>
                                </span>
                                <span className="icon-btn ml-auto">
                                    <Icon icon="close"
                                        iconClass="icon stroke-silver strokeWidth-3"
                                        width="18" height="18"/>
                                </span>
                            </li>

                            <li className="item">
                                <span className="sample-color borderRadius-sm" style={{backgroundColor: '#33ADA9'}}/>
                                <span className="text">
                                    Secondary Color
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        HEX
                                    </span>
                                    <span className="text">
                                        #33ADA9
                                    </span>
                                </span>
                                <span className="text-tag">
                                    <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                                        RGB
                                    </span>
                                    <span className="text">
                                        254, 254, 254
                                    </span>
                                </span>
                                <span className="icon-btn ml-auto">
                                    <Icon icon="close"
                                        iconClass="icon stroke-silver strokeWidth-3"
                                        width="18" height="18"/>
                                </span>
                            </li>
                        </ul>  


                        <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                        {/* Add Secondary colors */}
                        <div className="d-flex align-items-center">
                            <div className="d-flex flex-column">
                                <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                    SECONDARY COLORS <span className="color-extraDarkSmoke ml-2">(optional)</span>
                                </div>
                                <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                    These are the colors that define your brand.
                                </div>
                            </div>
                            <button className="d-flex sp-btn sp-btn--md sp-btn--secondary ml-auto p-1">
                                <Icon icon="plus"
                                    iconClass="stroke-white strokeWidth-3"
                                    width="20" height="20"/>
                            </button>
                        </div>


                        <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                        {/* Add Grayscale colors */}
                        <div className="d-flex align-items-center">
                            <div className="d-flex flex-column">
                                <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                    GRAYSCALE COLORS <span className="color-extraDarkSmoke ml-2">(optional)</span>
                                </div>
                                <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                    A selection of grayscale colors for background or text color use.
                                </div>
                            </div>
                            <button className="d-flex sp-btn sp-btn--md sp-btn--secondary ml-auto p-1">
                                <Icon icon="plus"
                                    iconClass="stroke-white strokeWidth-3"
                                    width="20" height="20"/>
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