/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import { 
    ProjectFormFields,
    IValidationError as IValidationProjectError 
} from './../../../../core/validations/project';

import { IRootState } from './../../../../reducer/reducer.config';

import { nextStepProjectAction, prevStepProjectAction, skipStepProjectAction } from './../../../../actions/form.action';
import { createProjectAction } from './../../../../actions/project.action';
import { CreateProjectInput } from './../../../../models/project/project.mutation';

import BasicFieldsContainer from './Steps/containers/BasicFields.container';
import ColorFieldsContainer from './Steps/containers/ColorFields.container';
import LibFieldsContainer from './Steps/containers/LibFields.container';
import ConfirmationContainer from './Steps/containers/Confirmation.container';
import SuccessContainer from './Steps/containers/Success.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectNewContainerProps = {};

/* Own States */
type LocalStates = {
    fieldValues: ProjectFormFields,
    validationErrors: IValidationProjectError
};

/* Mapped State to Props */
type StateProps = {
    step: number,
    fields: ProjectFormFields
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        form: {
            nextStepProject: (fieldValues: ProjectFormFields) => void;
            prevStepProject: () => void;
            skipStepProject: () => void;
        },
        projectState: {
            createProject: (input: CreateProjectInput) => Promise<any>;
        }
    };
};

/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectNewContainer
extends React.Component<ChildProps<ProjectNewContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectNewContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('DashboardPage -> ProjectsPage -> ProjectNew container actived');

        // Init local state
        this.state = {
            fieldValues: {
                authorId: null,
                name: null,
                website: null,
                description: null,
                colorPalette: [],
                libs: [],
                private: false,
                projectCategoryId: 1 // TODO: Magic number
            },
            validationErrors: {}
        };

        // Bind methods
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.skipStep = this.skipStep.bind(this);
        this.submitCreation = this.submitCreation.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc Next Step
     * @method nextStep
     * @example this.nextStep()
     * @public
     * @returns {void}
     */
    nextStep(fieldValues: ProjectFormFields | Object = {}) {

        let newFieldValues = functionsUtil.updateObject(this.state.fieldValues, fieldValues);

        // Update local state
        this.setState({ fieldValues: newFieldValues },
        () => {
            this.props.actions.form.nextStepProject(this.state.fieldValues);
        });

    }


    /**
     * @desc Previous Step
     * @method previousStep
     * @example this.previousStep()
     * @public
     * @returns {void}
     */
    previousStep() {
        this.props.actions.form.prevStepProject();
    }


    /**
     * @desc Skip Step
     * @method skipStep
     * @example this.skipStep()
     * @public
     * @returns {void}
     */
    skipStep() {
        this.props.actions.form.skipStepProject();
    }


    /**
     * @desc Submit Creation
     * @method submitCreation
     * @example this.submitCreation()
     * @public
     * @returns {void}
     */
    submitCreation(authorId: number) {

        // Copy fields
        // let fieldValues = Object.assign({}, this.props.fields); LEGACY
        let copyFieldValues = functionsUtil.updateObject(this.props.fields);

        copyFieldValues.authorId = authorId;

        this.props.actions.projectState.createProject(copyFieldValues).then(
            (response) => {
                if (response.ok) {
                    this.nextStep();
                } else {
                    // Update local state
                    // TODO: Hacer algo con este validationErrors (este viene de la validacion del Server)
                    this.setState({ validationErrors: response.validationErrors },
                    () => {
                        this.previousStep();
                    });
                }
            }
        );
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Get Step
     * @method _getStep
     * @example this._getStep()
     * @private
     * @returns {JSX.Element} Next Step
     */
    private _getStep(): JSX.Element {

        switch (this.props.step) {
            case 1:
                return (
                    <BasicFieldsContainer nextStep={this.nextStep} />
                );
            case 2:
                return (
                    <ColorFieldsContainer nextStep={this.nextStep}
                                            previousStep={this.previousStep} />
                );
            case 3:
                return (
                    <LibFieldsContainer nextStep={this.nextStep}
                                        previousStep={this.previousStep} />
                );
            case 4:
                return (
                    <ConfirmationContainer submitCreation={this.submitCreation} />
                );
            case 5:
                return (
                    <SuccessContainer />
                );
            default:
                return (
                    <BasicFieldsContainer nextStep={this.nextStep} />
                );
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectNew StepByStep p-4">
                {this._getStep()}
            </div>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { step, fields } = state.form.projectForm;

    return {
        fields,
        step
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            form: {
                nextStepProject: (fieldValues) => dispatch(nextStepProjectAction(fieldValues)),
                prevStepProject: () => dispatch(prevStepProjectAction()),
                skipStepProject: () => dispatch(skipStepProjectAction())
            },
            projectState: {
                createProject: (input: CreateProjectInput) => dispatch(createProjectAction(input))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const projectNewContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    projectNewContainerConnect
)(ProjectNewContainer);


/*
    reference: https://www.viget.com/articles/building-a-multi-step-registration-form-with-react
 */