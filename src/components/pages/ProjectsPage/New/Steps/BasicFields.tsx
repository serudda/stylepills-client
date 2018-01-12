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
        website: string,
        description: string
    }
};

/* Mapped State to Props */
type StateProps = {
    name: string,
    website: string,
    description: string,
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
        functionsUtil.consoleLog('ProjectNew -> Step: 1 - BasicFields actived');

        // Init local state
        this.state = {
            fields: {
                name: props.name || '',
                website: props.website || '',
                description: props.description || ''
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

                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                        PROJECT NAME
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
                    
                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset mt-4">
                        DESCRIPTION <span className="color-extraDarkSmoke align-text-bottom fontWeight-5 ml-1">(optional)</span>
                    </label>
                    <textarea name="description"
                            value={this.state.fields.description}
                            onChange={this._handleInputChange}
                            className="sp-textarea sp-textarea--md sp-textarea--block"
                            placeholder="e.g. Airbnb is a trusted community marketplace for people to list, discover, and book unique accommodation around the world"
                            rows={3} cols={40} />

                    <div className="switchContainer d-flex align-items-center mt-5">
                        <div className="d-flex flex-column">
                            <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                MAKE THIS PROJECT PRIVATE
                            </div>
                            <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                Hide this project from the public
                            </div>
                        </div>
                        <div className="sp-switch-btn sp-switch-btn--sm sp-switch-btn--on-primary sp-switch-btn--off-neutral sp-switch-btn--circle ml-auto active">
                            <input type="checkbox"  checked={false} className="cb-value" />
                            <span className="inner-btn boxShadow-subtle" />
                        </div>
                    </div>

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <button className="sp-btn sp-btn--secondary sp-btn--md ml-auto"
                            onClick={this._handleNextClick}>
                        Next
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
    const { name, website, description } = fields;
    const { isAuthenticated } = state.auth;

    return {
        name, 
        website,
        description,
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