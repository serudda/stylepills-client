/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import * as CodeMirror from 'react-codemirror';

import {
    CodeSupportedOption
} from './../../../core/interfaces/interfaces';
import { IRootState } from './../../../reducer/reducer.config';
import { functionsUtil } from './../../../core/utils/functionsUtil';

import { Source as SourceModel } from './../../../models/source/source.model';
import {
    PreprocessorTypeOptions,
    Preprocessor as PreprocessorModel
} from './../../../models/preprocessor/preprocessor.model';

import { changeSourceCodeAction } from './../../../actions/ui.action';

import { getCurrentCodeByType } from './../../../selectors/ui.selector';
import { getCurrentPreprocessor } from './../../../selectors/preprocessor.selector';

/* Code Mirror themes and addons */
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/display/autorefresh';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type CodeMirrorContainerProps = {
    /* config options */
    isReadOnly?: boolean;

    /* methods */
    onCodeChange?: (newCode: string) => void;
};

/* Own States */
type LocalStates = {
    sourceObj: SourceModel
};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    source: SourceModel,
    currentPreprocessor: PreprocessorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeSourceCode: (source: SourceModel, sourceType: CodeSupportedOption) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    CodeMirrorContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class CodeMirrorContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/
    

    /**
     * @desc Handle Change
     * @method handleChange
     * @example this.handleChange()
     * @public
     * @returns {void}
     */
    handleChange(newCode: string) {

        const { source, currentPreprocessor } = this.props;
        const { type } = currentPreprocessor;

        // If receive an parent's onChange method
        if (this.props.onCodeChange) {
            this.props.onCodeChange(newCode);
        } else {
            // If not receive a parent's onChange method, default action.
            let sourceUpdated = functionsUtil.updateObject(source, {code: newCode});
            this.props.actions.ui.changeSourceCode(sourceUpdated, type);
        }

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Configure Component based on default options and external options
     * @method _configureComponent
     * @example this._configureComponent()
     * @private
     * @returns {void}
     */
    private _configureComponent(type: CodeSupportedOption) {

        // Destructuring state
        const { isReadOnly = false } = this.props;

        // Default config options
        const DEFAULT_CONFIG = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: false,
            mode: 'xml',
            theme: 'material',
            autoRefresh: true
        };
        let options = DEFAULT_CONFIG;

        // Assign mode
        options.mode = this._assignMode(type);
        
        
        // Assign is Read only
        options.readOnly = type === CodeSupportedOption.css ? true : isReadOnly;

        return options;
    }


    /**
     * @desc Assign CodeMirror Mode
     * @method _assignMode
     * @example this._assignMode()
     * @private
     * @returns {void}
     */
    private _assignMode(type: PreprocessorTypeOptions): string {
        switch (type) {
            case CodeSupportedOption.html: return 'xml';
            case CodeSupportedOption.css: return 'css';
            case CodeSupportedOption.scss: return 'css';
            case CodeSupportedOption.sass: return 'sass';
            case CodeSupportedOption.less: return 'css';
            default: return 'xml';
        }
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        // Destructuring state
        const { source = null } = this.props;
        const { currentPreprocessor } = this.props;
        const { type } = currentPreprocessor;

        let options = this._configureComponent(type);

        /*         MARKUP          */
        /***************************/
        return (
            <CodeMirror value={source !== null ? source.code : ''} 
                        options={options} 
                        onChange={this.handleChange}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState, ownProps: CodeMirrorContainerProps): StateProps {
    return {
        source: getCurrentCodeByType(state, {type: state.preprocessorState.currentPreprocessor.type }),
        currentPreprocessor: getCurrentPreprocessor(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeSourceCode: (source, sourceType) => dispatch(changeSourceCodeAction(source, sourceType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const codeMirrorContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    codeMirrorContainerConnect
)(CodeMirrorContainer);