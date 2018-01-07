/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import { IProjectFormFields } from './../../../../core/interfaces/interfaces';

import { IRootState } from './../../../../reducer/reducer.config';

import { nextStepProjectAction, prevStepProjectAction, skipStepProjectAction } from './../../../../actions/form.action';

import BasicFields from './Steps/BasicFields';
import ColorFields from './Steps/ColorFields';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectNewProps = {};

/* Own States */
type LocalStates = {
    fieldValues: IProjectFormFields
};

/* Mapped State to Props */
type StateProps = {
    step: number
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        form: {
            nextStepProject: (fieldValues: IProjectFormFields) => void;
            prevStepProject: () => void;
            skipStepProject: () => void;
        }
    };
};

/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectNew
extends React.Component<ChildProps<ProjectNewProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectNewProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('DashboardPage -> ProjectsPage -> ProjectNew container actived');

        // Init local state
        this.state = {
            fieldValues: {
                name: null,
                website: null,
                colors: []
            }
        };

        // Bind methods
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.skipStep = this.skipStep.bind(this);
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
    nextStep(fieldValues: IProjectFormFields) {

        let newFieldValues = Object.assign({}, this.state.fieldValues, fieldValues);

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
                    <BasicFields nextStep={this.nextStep} />
                );
            case 2:
                return (
                    <ColorFields nextStep={this.nextStep}
                                 previousStep={this.previousStep} />
                );
            default:
                return (
                    <BasicFields nextStep={this.nextStep} />
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
    
    const { step } = state.form.projectForm;

    return {
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
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const projectNewConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    projectNewConnect
)(ProjectNew);


/*
    reference: https://www.viget.com/articles/building-a-multi-step-registration-form-with-react
 */