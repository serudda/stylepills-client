/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';
import { 
    validateColorFields, 
    IValidationError 
} from './../../../../../../core/validations/project';

import { IRootState } from './../../../../../../reducer/reducer.config';

import Icon from './../../../../../components/Icon/Icon';
import { 
    Color as ColorModel, 
    ColorTypeOptions 
} from './../../../../../../models/color/color.model';
import AddColorForm from './../../../../../../components/common/AddColorForm/AddColorForm.container';


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
type LocalStates = {
    fields: {
        colorPalette: Array<ColorModel>
    },
    validationErrors?: IValidationError
};

/* Mapped State to Props */
type StateProps = {
    colorPalette: Array<ColorModel>,
    isAuthenticated: boolean
};


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
            fields: {
                colorPalette: [...props.colorPalette] || []
            },
            validationErrors: {}
        };

        // Bind methods
        this._handlePrevClick =  this._handlePrevClick.bind(this);
        this._handleNextClick =  this._handleNextClick.bind(this);
        this.handleAddColorClick = this.handleAddColorClick.bind(this);
        this.handleDeleteColorClick = this.handleDeleteColorClick.bind(this);
        
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleAddColorClick
     * @method handleAddColorClick
     * @example this.handleAddColorClick()
     * @public
     * @param {ColorModel} newColor - new color to add on the colors array
     * @returns {void}
     */
    handleAddColorClick(newColor: ColorModel) {
        this._addColor(newColor);
    }


    /**
     * @desc HandleDeleteColorClick
     * @method handleDeleteColorClick
     * @example this.handleDeleteColorClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleDeleteColorClick(color: ColorModel) {

        // Destructuring state
        const { colorPalette } = this.state.fields;
        
        let colorArray = colorPalette.filter(function (candidateColor: ColorModel) {
            return candidateColor !== color;
        });

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                colorPalette: colorArray
            }
        }));

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
     * @desc Add Color
     * @method _addColor
     * @example this._addColor()
     * @private 
     * @param {ColorModel} newColor - new color to add in the list
     * @returns {void}
     */
    private _addColor(newColor: ColorModel) {

        // Copy state
        let fieldValues = Object.assign({}, this.state.fields);

        let colorArray = fieldValues.colorPalette;
 
        if (newColor.hex !== '') {
            
            /* Add new color to the beginning of colors array */
            colorArray.unshift(newColor);

            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    colorPalette: colorArray
                }
            }));

        }

    }


    /**
     * @desc Build Add Color Form component
     * @method _buildAddColorForm
     * @example this._buildAddColorForm('primary')
     * @private
     * @param {ColorTypeOptions} type - type color section (primary, secondary or grayscale)
     * @returns {JSX.Element} <AddColorForm />
     */
    private _buildAddColorForm(type: ColorTypeOptions): JSX.Element {

        // Destructuring state
        const { colorPalette } = this.state.fields;

        // VARIABLES
        let newColorsArray: Array<ColorModel> = [];
        let title = {
            primary: 'PRIMARY COLORS',
            secondary: 'SECONDARY COLORS',
            grayscale: 'GRAYSCALE COLORS'
        };

        let description = {
            primary: 'These are the colors that define your brand.',
            secondary: 'These colors are support to accompany the primary colors.',
            grayscale: 'A selection of grayscale colors for background or text color use.'
        };

        // Create new colors array based on type
        if (colorPalette.length > 0) {
            newColorsArray = colorPalette.filter((color: ColorModel) => {
                return color.type === type;
            });
        }

        return (
            <AddColorForm title={title[type]}
                        description={description[type]}
                        colors={newColorsArray}
                        onAddClick={this.handleAddColorClick}
                        onDeleteClick={this.handleDeleteColorClick}
                        type={type}/>
        );
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
     * @desc Validate each field
     * @method isValid
     * @example this.isValid()
     * @private
     * @returns {void}
     */
    private _isValid() {
        // Copy state
        let fieldValues = Object.assign({}, this.state.fields);

        const {errors, isValid} = validateColorFields(fieldValues);

        if (!isValid) {
            this.setState({
                validationErrors: errors
            });
        }

        return isValid;
    }


    /**
     * @desc Next Step
     * @method _nextStep
     * @example this._nextStep()
     * @private
     * @returns {void}
     */
    private _nextStep() {

        if (this._isValid()) {
            // Copy state
            let fieldValues = Object.assign({}, this.state.fields);

            this.props.nextStep(fieldValues);    
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const { isAuthenticated } = this.props;
        const { validationErrors } = this.state;
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (!isAuthenticated) {
            return (
                <Redirect to="/explore"/>
            );
        }

        
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
                        <div className="iconContainer d-none flex-column align-items-center ml-auto"> {/* TODO: Reemplazar d-none por d-inline-flex */}
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

                    {/* Add Primary colors */}
                    {this._buildAddColorForm(ColorTypeOptions.primary)}
                    {/* Validation error message */}
                    {validationErrors.colorPalette && 
                        <div className="color-negative">
                            {validationErrors.colorPalette}
                        </div>
                    }


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                    {/* Add Secondary colors */}
                    {this._buildAddColorForm(ColorTypeOptions.secondary)}


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                    {/* Add Grayscale colors */}
                    {this._buildAddColorForm(ColorTypeOptions.grayscale)}

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <a className="link-reset fontSize-sm color-silver fontWeight-6 textDecoration ml-2 d-none" 
                        href="#">
                        Skip this step
                    </a>
                    <button className="sp-btn sp-btn--secondary sp-btn--md ml-auto"
                            onClick={this._handleNextClick}>
                        Save
                    </button>
                </div>

            </div>

        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { fields } = state.form.projectForm;
    const { colorPalette } = fields;
    const { isAuthenticated } = state.auth;

    return {
        colorPalette,
        isAuthenticated
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const colorFieldsConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    colorFieldsConnect
)(ColorFields);