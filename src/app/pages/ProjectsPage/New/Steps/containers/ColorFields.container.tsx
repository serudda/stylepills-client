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
import { 
    Color as ColorModel
} from './../../../../../../models/color/color.model';

import { IRootState } from './../../../../../../reducer/reducer.config';

import ColorFields from './../components/ColorFields';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorFieldsContainerProps = {
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
class ColorFieldsContainer
extends React.Component<ChildProps<ColorFieldsContainerProps & StateProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ColorFieldsContainerProps & StateProps, {}>) {
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
        this.handlePrevClick =  this.handlePrevClick.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
        this.handleAddColorClick = this.handleAddColorClick.bind(this);
        this.handleDeleteColorClick = this.handleDeleteColorClick.bind(this);
        
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandlePrevClick
     * @method handlePrevClick
     * @example this.handlePrevClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handlePrevClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._previousStep();
    }


    /**
     * @desc HandleNextClick
     * @method handleNextClick
     * @example this.handleNextClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleNextClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._nextStep();
    }


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


    /*********************************/
    /*        PRIVATE METHODS        */
    /*********************************/


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

            // Go top pages
            window.scrollTo(0, 0);
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
                <Redirect to="/"/>
            );
        }

        
        /*         MARKUP          */
        /***************************/
        return (
            <ColorFields colorPaletteValue={this.state.fields.colorPalette}
                        validationErrors={validationErrors}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}
                        onAddColorClick={this.handleAddColorClick}
                        onDeleteColorClick={this.handleDeleteColorClick}/>
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
const colorFieldsContainerConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    colorFieldsContainerConnect
)(ColorFieldsContainer);