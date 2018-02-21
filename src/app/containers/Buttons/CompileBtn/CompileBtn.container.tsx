/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { compileCodeAction } from './../../../../actions/preprocessor.action';
import {
    CompileToTypeOptions,
    PreprocessorTypeOptions
} from './../../../../models/preprocessor/preprocessor.model';

import CompileBtn from './../../../components/Buttons/CompileBtn/CompileBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CompileBtnContainerProps = {
    preprocessorType: PreprocessorTypeOptions,
    compileTo: CompileToTypeOptions,
    label: string,
    codeToCompile: string
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            compileCode: (preprocessorType: PreprocessorTypeOptions, code: string) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class CompileBtnContainer 
extends React.Component<ChildProps<CompileBtnContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: CompileBtnContainerProps & StateProps & DispatchProps) {
        super(props);

        // Bind methods
        this.handleCompileClick = this.handleCompileClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleCompileClick
     * @method handleCompileClick
     * @example this.handleCompileClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleCompileClick (e: React.FormEvent<{}>) {
        const { 
            preprocessorType = PreprocessorTypeOptions.scss, 
            codeToCompile = CompileToTypeOptions.css 
        } = this.props;
        this._compileCode(preprocessorType, codeToCompile);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Compile Code
     * @method _compileCode
     * @example this._compileCode()
     * @private
     * @param {string} type - compile options (e.g. 'html', 'css', 'js')
     * @returns {void}
     */
    private _compileCode(preprocessorType: PreprocessorTypeOptions, code: string) {
        // Launch Compile Action
        this.props.actions.ui.compileCode(preprocessorType, code);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { label, compileTo = CompileToTypeOptions.css } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <CompileBtn label={label} onClick={this.handleCompileClick} compileTo={compileTo}/>
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                compileCode: (preprocessorType, code) => dispatch(compileCodeAction(preprocessorType, code))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const compileBtnContainerConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    compileBtnContainerConnect
)(CompileBtnContainer);