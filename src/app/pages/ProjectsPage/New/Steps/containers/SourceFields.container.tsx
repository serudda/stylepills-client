/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { Source as SourceModel } from './../../../../../../models/source/source.model';

import { getIsAuthenticated } from './../../../../../../selectors/auth.selector';
import { getSourcesListFormatted } from './../../../../../../selectors/ui.selector';
import { getAllPreprocessorsAction } from './../../../../../../actions/preprocessor.action';

import SourceFields from './../components/SourceFields';
import { 
    SourcesFields as SourcesFieldsValidation
} from './../../../../../../core/validations/project';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourceFieldsContainerProps = {
    nextStep: (fieldValues: SourcesFieldsValidation) => void,
    previousStep: () => void
};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {    
    sourcesList: Array<SourceModel>,
    isAuthenticated: boolean
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            getAllPreprocessors: () => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps = 
    SourceFieldsContainerProps
&   StateProps    
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceFieldsContainer
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 4 - SourceFields actived');

        // Bind methods
        this.handlePrevClick =  this.handlePrevClick.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
    }


    /**************************************/
    /*        COMPONENT_WILL_MOUNT        */
    /**************************************/
    componentWillMount() {
        // Charge Preprocessors on State Store in order to use in SelectList
        this.props.actions.ui.getAllPreprocessors();
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
     * @desc Next Step
     * @method _nextStep
     * @example this._nextStep()
     * @private
     * @returns {void}
     */
    private _nextStep() {
        const { sourcesList } = this.props;
        this.props.nextStep({ sources: sourcesList });        
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
            <SourceFields onPrevClick={this.handlePrevClick}
                          onNextClick={this.handleNextClick} />
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    return {
        sourcesList: getSourcesListFormatted(state),
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
                getAllPreprocessors: () => dispatch(getAllPreprocessorsAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourceFieldsContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourceFieldsContainerConnect
)(SourceFieldsContainer);