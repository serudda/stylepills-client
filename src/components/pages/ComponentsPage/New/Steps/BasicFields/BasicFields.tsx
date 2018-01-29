/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { isEmpty } from 'lodash';

import * as classNames from 'classnames';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';
import { validateBasicFields, IValidationError as IValidationAtomError } from './../../../../../../core/validations/atom';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { ICurrentCode } from './../../../../../../actions/ui.action';

import { User as UserModel }  from './../../../../../../models/user/user.model';
import { Lib as LibModel }  from './../../../../../../models/lib/lib.model';

import PreviewSection from './PreviewSection/PreviewSection.container';
import PanelSectionContainer from './PanelSection/PanelSection.container';
import AtomCategorySelectList from './../../../../../common/AtomCategorySelectList/AtomCategorySelectList.container';
import ProjectSelectList from './../../../../../common/ProjectSelectList/ProjectSelectList.container';
import Icon from './../../../../../common/Icon/Icon';

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
        name: string;
        description: string;
        html: string;
        css: string;
        libs: Array<LibModel>;
        contextualBg: string;
        projectId: number;
        atomCategoryId: number;
        private: boolean;
    },
    validationErrors?: IValidationAtomError
};

/* Mapped State to Props */
type StateProps = {
    name: string,
    description: string,
    html: string,
    css: string,
    libs: Array<LibModel>;
    contextualBg: string,
    projectId: number | null,
    atomCategoryId: number | null,
    private: boolean,
    currentCode: Array<ICurrentCode>,
    hex: string,
    user: UserModel,
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
                description: props.description || '',
                html: props.html || '',
                css: props.css || '',
                libs: [...props.libs] || [],
                contextualBg: props.hex || '#FFFFFF',
                projectId: props.projectId || null,
                atomCategoryId: props.atomCategoryId || 0,
                private: props.private || false
            },
            validationErrors: {}
        };

        // Bind methods
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleNextClick =  this._handleNextClick.bind(this);
        this.handleSelectListChange =  this.handleSelectListChange.bind(this);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: BasicFieldsProps & StateProps) {   
        const { hex, currentCode, libs } = nextProps;

        // Changed CurrentCode on Store state
        if (this.props.currentCode !== currentCode) {
            
            let obj = functionsUtil.sourceCodeArrayToObj(currentCode);

            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    html: obj.html || '',
                    css: obj.css || ''
                }
            }));
            
        }

        // Changed Hex on Store state
        if (this.props.hex !== hex) {
            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    contextualBg: hex
                }
            }));
        }

        // Changed Libs on Store state
        if (this.props.libs !== libs) {
            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    libs
                }
            }));
        }

    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc Handle Select List Change
     * @method handleSelectListChange
     * @public
     * @param {string} name - select list name (e.g. atomCategoryId, projectId)
     * @param {string} value - select list value (e.g. "2")
     * @returns {void}
     */
    handleSelectListChange (name: string, value: string) {

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                [name]: value
            }
        }));
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method _handleInputChange
     * @example this._handleInputChange()
     * @private
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    private _handleInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) {
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
     * @method _handleNextClick
     * @example this._handleNextClick()
     * @private
     * @param {React.MouseEvent<HTMLButtonElement>} e - Event
     * @returns {void}
     */
    private _handleNextClick(e: React.MouseEvent<HTMLButtonElement>) {
        // e.preventDefault();
        this._nextStep();
    }


    /**
     * @desc Validate each field
     * @method _isValid
     * @example this._isValid()
     * @private
     * @returns {void}
     */
    private _isValid() {
        // Copy state
        let fieldValues = Object.assign({}, this.state.fields);

        const {errors, isValid} = validateBasicFields(fieldValues);

        console.log(errors, isValid);

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


    /**
     * @desc Build Source Code Error Message
     * @method _buildSourceCodeErrorMessage
     * @example this._buildSourceCodeErrorMessage()
     * @private
     * @returns {JSX.Element} <AddColorForm />
     */
    private _buildSourceCodeErrorMessage(): JSX.Element | boolean {

        // Destructuring props
        const { validationErrors } = this.state;

        let key = null;

        if (validationErrors.html) {
            key = 'html';
        } else if (validationErrors.css) {
            key = 'css';
        }

        if (key) {
            return (
                <div className="sp-bg-negative sp-rounded-bottom-md w-100 p-3 px-4 d-flex align-items-center position-absolute zIndex-footer"
                    style={{bottom: 0}}>
                    <Icon icon="alert" iconClass="strokeWidth-2 stroke-white mr-2" width="22" height="22"/>
                    <span className="fontSize-md color-white fontWeight-9">
                        {validationErrors[key]}
                    </span>
                </div>
            );
        } else {
            return false;
        }
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const { user, isAuthenticated } = this.props;
        const { validationErrors } = this.state;
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (!isAuthenticated) {
            return (
                <Redirect to="/explore"/>
            );
        }

        // Name input Classes
        const nameInputClasses = classNames({
            'sp-input': true,
            'sp-input--md': true,
            'sp-input--block': true,
            'error': !isEmpty(validationErrors.name)
        });

        // Private Switch Classes
        const privateSwitchClasses = classNames({
            'sp-switch-btn sp-switch-btn--sm sp-switch-btn--circle':  true,
            'sp-switch-btn--on-primary': true,
            'sp-switch-btn--off-white': true, 
            'boxShadow-close': true, 
            'active': this.state.fields.private
        });
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="BasicFields StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-5">

                    <div className="nav-section d-none"> {/* TODO: Remplazar d-none por d-flex */}
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
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md">

                    {/* Basic information Form */}
                    <form className="px-5 pt-5">
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            COMPONENT NAME
                        </label>
                        <input type="text"
                                name="name"
                                value={this.state.fields.name}
                                onChange={this._handleInputChange}
                                className={nameInputClasses}
                                placeholder="e.g. Primary Button, Secondary Input"/>
                        {validationErrors.name && <div className="color-negative mt-1">{validationErrors.name}</div>}
                        
                        
                        <div className="row mt-4">
                            <div className="col-6">
                                <div className="d-flex flex-column">

                                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                        CATEGORY
                                    </label>

                                    <AtomCategorySelectList onChange={this.handleSelectListChange}/>

                                </div>
                            </div>

                            <div className="col-6">
                                <div className="d-flex flex-column h-100">
                                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                        PROJECT
                                    </label>
                                    <ProjectSelectList userId={user.id} onChange={this.handleSelectListChange}/>
                                </div>
                            </div>
                        </div>

                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset mt-4">
                            DESCRIPTION <span className="color-extraDarkSmoke align-text-bottom fontWeight-5 ml-1">(optional)</span>
                        </label>
                        <textarea name="description"
                                value={this.state.fields.description}
                                onChange={this._handleInputChange}
                                className="sp-textarea sp-textarea--md sp-textarea--block"
                                placeholder="e.g. Primary Button, Secondary Input"
                                rows={3} cols={40} />

                    </form>


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke sp-divider--border-2 mt-5" />


                    {/* Preview Atom Section */}
                    <PreviewSection html={this.state.fields.html}
                                    css={this.state.fields.css}/>

                    {/* Panel Atom Section */}

                    <div className="position-relative">
                        <PanelSectionContainer html={this.state.fields.html}
                                                css={this.state.fields.css}
                                                libs={this.state.fields.libs}/>
                        
                        {/* Error Bottom Message */}
                        {this._buildSourceCodeErrorMessage()}
                    </div>

                </div>

                <div className="StepByStep__footer d-flex align-items-center mt-4">

                    <div className="make-it-private-container d-flex align-items-center">
                        <div className={privateSwitchClasses}>
                            <input name="private" 
                                   type="checkbox"
                                   checked={this.state.fields.private}
                                   onChange={this._handleInputChange}
                                   className="cb-value" />
                            <span className="inner-btn boxShadow-raised" />
                        </div>
                        <span className="fontFamily-openSans fontWeight-6 fontSize-sm color-silver ml-3">
                            Hide this component from the public
                        </span>
                    </div>

                    <button className="sp-btn sp-btn--secondary sp-btn--lg ml-auto"
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
    
    // Destructuring state 
    const { ui } = state;
    const { colorPicker } = ui;
    const { currentColor } = colorPicker;
    const { hex } = currentColor;

    const { fields } = state.form.atomForm;
    const { name, description, html, css, contextualBg, projectId, atomCategoryId } = fields;

    const { user, isAuthenticated } = state.auth;

    const { currentCode } = state.ui.sourceCodePanel;
    const { libs } = state.ui.libsPanel;

    return {
        name,
        description,
        html,
        css,
        libs,
        contextualBg,
        projectId,
        atomCategoryId,
        private: fields.private,
        currentCode,
        hex,
        user,
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