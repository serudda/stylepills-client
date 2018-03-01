/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { CodeSupportedOption } from './../../../../../../core/interfaces/interfaces';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';
import {
    BasicFields as BasicFieldsType,
    validateBasicFields,
    IValidationError
} from './../../../../../../core/validations/atom';

import { IRootState } from './../../../../../../reducer/reducer.config';
import { CurrentCode } from './../../../../../../reducer/ui.reducer';
import { getIsAuthenticated } from './../../../../../../selectors/auth.selector';
import { getCurrentCode, getCurrentColor, getLibListDenormalized } from './../../../../../../selectors/ui.selector';

import { 
    Lib as LibModel
}  from './../../../../../../models/lib/lib.model';
import LibService from './../../../../../../models/lib/lib.service';

import { User as UserModel }  from './../../../../../../models/user/user.model';
import { Basic as BasicColorModel }  from './../../../../../../models/color/color.model';

import BasicFields from './../components/BasicFields';

import { 
    showAlertAction,
    loadLibsAction
} from './../../../../../../actions/ui.action';
import { getLibsByProjectIdAction } from './../../../../../../actions/lib.action';

import {
    Option as AlertOption
} from './../../../../../../app/containers/Alerts/AlertManager/AlertManager.container';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

type BasicFieldsForm = {
    name: string;
    description: string;
    html: string;
    css: string;
    libs: Array<LibModel>;
    contextualBg: string;
    projectId: number;
    atomCategoryId: number;
    private: boolean;
};

/* Own Props */
type BasicFieldsContainerProps = {
    nextStep: (fieldValues: BasicFieldsType) => void
};

/* Own States */
type LocalStates = {
    fields: BasicFieldsForm,
    validationErrors?: IValidationError
};


//    REDUX MAPPED PROPS & STATES
// ===================================

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
    currentCode: CurrentCode,
    color: BasicColorModel,
    user: UserModel,
    alerts: Array<{alertType: AlertOption, alertProps: any}>;
    isAuthenticated: boolean
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            showAlert: (alertType: AlertOption, alertProps: any) => void;
            loadLibs: (libs: Array<LibModel>) => void;
        },
        libState: {
            getLibsByProjectId: (projectId: number) => Promise<any>;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    BasicFieldsContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class BasicFieldsContainer
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
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
                contextualBg: props.color.hex || '#FFFFFF',
                projectId: props.projectId || null,
                atomCategoryId: props.atomCategoryId || 0,
                private: props.private || false
            },
            validationErrors: {}
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
        this.handleSelectListChange =  this.handleSelectListChange.bind(this);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: AllProps) { 
        const { color, currentCode, libs } = nextProps;

        // Changed CurrentCode on Store state
        if (this.props.currentCode !== currentCode) {

            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    html: currentCode[CodeSupportedOption.html].code || '',
                    css: currentCode[CodeSupportedOption.css].code || ''
                }
            }));
            
        }

        // Changed Hex on Store state
        if (this.props.color.hex !== color.hex) {
            this.setState((previousState: LocalStates) => ({
                ...previousState,
                fields: {
                    ...previousState.fields,
                    contextualBg: color.hex
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
     * @desc Handle Select List Change
     * @method handleSelectListChange
     * @public
     * @param {string} name - select list name (e.g. atomCategoryId, projectId)
     * @param {string} value - select list value (e.g. "2")
     * @returns {void}
     */
    handleSelectListChange(name: string, value: string) {

        if (name === 'projectId') {

            // CONSTANTS
            const RADIX = 10;

            // Clear libsList on State Store
            this.props.actions.ui.loadLibs([]);
            
            this.props.actions.libState.getLibsByProjectId(parseInt(value, RADIX)).then(
                (response) => {
                    if (response.ok) {

                        let { libs } = this.props;
                        
                        // Get atom's libs from libs state
                        let atomLibs = LibService.getAtomLibsFromList(libs);

                        // Concat Project's libs and Atom's libs
                        let libsMerged = atomLibs.concat(response.results);

                        // Load on State Store
                        this.props.actions.ui.loadLibs(libsMerged);
                    }
                }
            );

        }

        // Save new project select list option on local fields state
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
     * @param {React.MouseEvent<HTMLButtonElement>} e - Event
     * @returns {void}
     */
    handleNextClick(e: React.MouseEvent<HTMLButtonElement>) {
        // e.preventDefault();
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
        // Copy state
        let copyFieldValues = functionsUtil.updateObject(this.state.fields);

        const {errors, isValid} = validateBasicFields(copyFieldValues);

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
        const { user, isAuthenticated } = this.props;
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
            <BasicFields currentUserId={user.id}
                         nameValue={this.state.fields.name}
                         descriptionValue={this.state.fields.description}
                         privateValue={this.state.fields.private}
                         htmlValue={this.state.fields.html}
                         cssValue={this.state.fields.css}
                         validationErrors={validationErrors}
                         onInputChange={this.handleInputChange}
                         onSelectChange={this.handleSelectListChange}
                         onNextClick={this.handleNextClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    // Destructuring state 
    const { ui } = state;
    const { alerts } = ui;

    const { fields } = state.form.atomForm;
    const { name, description, html, css, contextualBg, projectId, atomCategoryId } = fields;

    const { user } = state.auth;

    return {
        name,
        description,
        html,
        css,
        libs: getLibListDenormalized(state),
        contextualBg,
        projectId,
        atomCategoryId,
        private: fields.private,
        currentCode: getCurrentCode(state),
        color: getCurrentColor(state),
        user,
        alerts,
        isAuthenticated: getIsAuthenticated(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                showAlert: (alertType, alertProps) => dispatch(showAlertAction(alertType, alertProps)),
                loadLibs: (libs) => dispatch(loadLibsAction(libs))
            },
            libState: {
                getLibsByProjectId: (projectId) => dispatch(getLibsByProjectIdAction(projectId))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const basicFieldsContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    basicFieldsContainerConnect
)(BasicFieldsContainer);