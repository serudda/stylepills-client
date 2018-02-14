/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';
import { 
    ColorFields as ColorFormFields,
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
    validationErrors?: IValidationError
};

/* Mapped State to Props */
type StateProps = {
    colorsList: Array<ColorModel>;
    isAuthenticated: boolean
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ColorFieldsContainer
extends React.Component<ChildProps<ColorFieldsContainerProps & StateProps, {}>, LocalStates> {

    /************************************/
    /*  THIS PROPERTIES (NOT RE-RENDER) */
    /************************************/
    private _fields: ColorFormFields;

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ColorFieldsContainerProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 2 - ColorFields actived');

        // Init local state
        this.state = {
            validationErrors: {}
        };

        // Init this properties
        this._fields = {
            colorPalette: props.colorsList
        };

        // Bind methods
        this.handlePrevClick =  this.handlePrevClick.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
        
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


    /*********************************/
    /*        PRIVATE METHODS        */
    /*********************************/


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

        const {errors, isValid} = validateColorFields(this._fields);

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
            this.props.nextStep(this._fields);    
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
            <ColorFields validationErrors={validationErrors}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { lists } = state.ui;
    const { colorsList } = lists;
    const { isAuthenticated } = state.auth;

    return {
        colorsList,
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