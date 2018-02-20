/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { Source as SourceModel } from './../../../../../../models/source/source.model';

import { getIsAuthenticated } from './../../../../../../selectors/auth.selector';
import { getSourcesList } from './../../../../../../selectors/ui.selector';

import SourceFields from './../components/SourceFields';
import { 
    SourcesFields as SourcesFieldsValidation
} from './../../../../../../core/validations/project';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceFieldsContainerProps = {
    nextStep: (fieldValues: SourcesFieldsValidation) => void,
    previousStep: () => void
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {    
    sourcesList: Array<SourceModel>,
    isAuthenticated: boolean
};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceFieldsContainer
extends React.Component<ChildProps<SourceFieldsContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SourceFieldsContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 4 - SourceFields actived');

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
        sourcesList: getSourcesList(state),
        isAuthenticated: getIsAuthenticated(state)
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourceFieldsContainerConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourceFieldsContainerConnect
)(SourceFieldsContainer);