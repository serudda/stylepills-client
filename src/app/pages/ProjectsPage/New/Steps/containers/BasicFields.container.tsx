/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';
import {
    BasicFields as BasicFieldsType,
    validateBasicFields, 
    IValidationError 
} from './../../../../../../core/validations/project';

import { IRootState } from './../../../../../../reducer/reducer.config';
import { getIsAuthenticated } from './../../../../../../selectors/auth.selector';

import BasicFields from './../components/BasicFields';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BasicFieldsContainerProps = {
    nextStep: (fieldValues: BasicFieldsType) => void
};

/* Own States */
type LocalStates = {
    fields: {
        name: string,
        website: string,
        description: string,
        private: boolean
    },
    validationErrors?: IValidationError
};

/* Mapped State to Props */
type StateProps = {
    name: string,
    website: string,
    description: string,
    private: boolean,
    isAuthenticated: boolean
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class BasicFieldsContainer
extends React.Component<ChildProps<BasicFieldsContainerProps & StateProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<BasicFieldsContainerProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 1 - BasicFields actived');

        // Init local state
        this.state = {
            fields: {
                name: props.name || '',
                website: props.website || '',
                description: props.description || '',
                private: props.private || false
            },
            validationErrors: {}
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc HandleInputChange
     * @method handleInputChange
     * @example this.handleInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    handleInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                [name]: value
            }
        }));
    }


    /**
     * @desc HandleNextClick
     * @method handleNextClick
     * @example this.handleNextClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleNextClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._nextStep();
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Validate each field
     * @method _isValid
     * @example this._isValid()
     * @private
     * @returns {void}
     */
    private _isValid() {

        // Destructuring state
        const { fields } = this.state;

        const {errors, isValid} = validateBasicFields(fields);

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
            let copyFieldValues = functionsUtil.updateObject(this.state.fields);

            this.props.nextStep(copyFieldValues);    
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
            <BasicFields nameValue={this.state.fields.name}
                         websiteValue={this.state.fields.website}
                         descriptionValue={this.state.fields.description}
                         privateValue={this.state.fields.private}
                         validationErrors={validationErrors}
                         onInputChange={this.handleInputChange}
                         onNextClick={this.handleNextClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { fields } = state.form.projectForm;
    const { name, website, description } = fields;

    return {
        name,
        website,
        description,
        private: fields.private,
        isAuthenticated: getIsAuthenticated(state)
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const basicFieldsConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    basicFieldsConnect
)(BasicFieldsContainer);