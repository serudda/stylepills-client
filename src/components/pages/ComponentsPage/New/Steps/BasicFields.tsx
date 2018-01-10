/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';

import Icon from '../../../../common/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BasicFieldsProps = {
    nextStep: Function
};

/* Own States */
type LocalStates = {
    fields: {
        name: string,
        website: string
    }
};

/* Mapped State to Props */
type StateProps = {
    name: string,
    website: string,
    isAuthenticated: boolean
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class BasicFields
extends React.Component<ChildProps<BasicFieldsProps & StateProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<BasicFieldsProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ComponentNew -> Step: 1 - BasicFields actived');

        // Init local state
        this.state = {
            fields: {
                name: props.name || '',
                website: props.website || ''
            }
        };

        // Bind methods
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleNextClick =  this._handleNextClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method _handleInputChange
     * @example this._handleInputChange()
     * @private
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleInputChange(e: any) {
        const target = e.target;
        const value = target.value;
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
     * @desc Next Step
     * @method _nextStep
     * @example this._nextStep()
     * @private
     * @returns {void}
     */
    private _nextStep() {
        // Copy state
        let fieldValues = Object.assign({}, this.state.fields);

        this.props.nextStep(fieldValues);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const { isAuthenticated } = this.props;
        
        
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
            <div className="BasicFields StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-5">

                    <div className="nav-section d-flex">
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
                            CREATE NEW COMPONENT
                        </div>
                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2">
                            Basic component information
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    <form>
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            COMPONENT NAME
                        </label>
                        <input type="text"
                                name="name"
                                value={this.state.fields.name}
                                onChange={this._handleInputChange}
                                className="sp-input sp-input--md sp-input--block"
                                placeholder="e.g. Airbnb"/>
                        
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset mt-4">
                            PROJECT WEBSITE
                        </label>
                        <input type="text"
                                name="website"
                                value={this.state.fields.website}
                                onChange={this._handleInputChange}
                                className="sp-input sp-input--md sp-input--block" 
                                placeholder="e.g. https://www.airbnb.com"/>

                        <div className="sp-divider sp-divider--dashed sp-divider--smoke sp-divider--border-2 my-5" />

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
                    <button className="sp-btn sp-btn--secondary sp-btn--lg ml-auto"
                            onClick={this._handleNextClick}>
                        Create
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
    const { name, website } = fields;
    const { isAuthenticated } = state.auth;

    return {
        name, 
        website,
        isAuthenticated
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
)(BasicFields);