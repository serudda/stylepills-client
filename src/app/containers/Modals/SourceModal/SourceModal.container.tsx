/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { CodeSupportedOption } from '../../../../core/interfaces/interfaces';
import * as appConfig from './../../../../core/constants/app.constants';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../reducer/reducer.config';
import { Source as SourceModel } from './../../../../models/source/source.model';
import { SourceListItem } from './../../../../reducer/ui.reducer';
import { 
    Preprocessor as PreprocessorModel,
} from '../../../../models/preprocessor/preprocessor.model';

import { getSourceCodeTab, getCurrentCodeByType } from './../../../../selectors/ui.selector';
import { getCurrentPreprocessor } from './../../../../selectors/preprocessor.selector';

import {
    addSourceItemAction,
    editSourceItemAction,
    clearSourceCodeAction,
    changeSourceCodeAction,
    loadSourceCodeTabsAction, 
    closeModalAction, 
    clearUiAction
} from './../../../../actions/ui.action';
import { clearPreprocessorStateAction, changePreprocessorAction } from './../../../../actions/preprocessor.action';

import SourceModal from './../../../../app/components/Modals/SourceModal/SourceModal';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

type SourceModalForm = {
    name: string;
    filename: string;
    code: string;
    preprocessor: PreprocessorModel;
};

/* Own Props */
type SourceModalContainerProps = {
    source?: SourceListItem
};

/* Own States */
type LocalStates = {
    fields: SourceModalForm
};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    tab: CodeSupportedOption,
    currentSource: SourceModel,
    currentPreprocessor: PreprocessorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            closeModal: () => void,
            clearUi: () => void,
            loadSourceCodeTabs: (sourceCodeTabs?: Array<CodeSupportedOption>) => void,
            clearSourceCode: () => void,
            changeSourceCode: (source: SourceModel, sourceType: CodeSupportedOption) => void,
            addSourceItem: (source: SourceModel) => void,
            editSourceItem: (source: SourceListItem) => void
        },
        preprocessorState: {
            changePreprocessor: (preprocessorId: number) => void,
            clearPreprocessorState: () => void
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SourceModalContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceModalContainer
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {

    private _DEFAULT_SOURCE_INSTANCE: SourceModel = {
        name: '',
        filename: '', 
        code: '',
        preprocessor: {
            id: appConfig.SOURCE_CODE_DEFAULT_ID_ON_DB_OPTION,
            name: appConfig.SOURCE_CODE_DEFAULT_NAME_OPTION,
            type: appConfig.SOURCE_CODE_DEFAULT_TYPE_OPTION,
            extension: appConfig.SOURCE_CODE_DEFAULT_EXT_OPTION,
            compileTo: appConfig.SOURCE_CODE_DEFAULT_COMPILETO_OPTION
        },
        order: 0
    };
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // Destructuring props 
        const { source = this._DEFAULT_SOURCE_INSTANCE } = props;

        // Init form
        this.state = {
            fields: {
                name: source.name,
                filename: source.filename,
                code: source.code,
                preprocessor: source.preprocessor
            }
        };

        // Bind methods
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSourceNameInputChange = this.handleSourceNameInputChange.bind(this);
        this.handleSourceFilenameInputChange = this.handleSourceFilenameInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }


    /********************************/
    /*     COMPONENT_DID_MOUNT      */
    /********************************/
    componentDidMount() {

        // Init States on Store
        this._initSourceCodeTabOptions();
        this._initSourceCode();
        this._initCurrentPreprocessor();

        // Append Modal Class on Body
        this._appendModalOpenClassToBody();
    }


    /********************************/
    /*    COMPONENT_DID_UPDATE      */
    /********************************/
    componentDidUpdate() {

        // Generate source Code Tab options
        this._initSourceCodeTabOptions();

        // Append Modal Class on Body
        this._appendModalOpenClassToBody();
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc HandleCloseClick
     * @method handleCloseClick
     * @example this.handleCloseClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleCloseClick (e: React.FormEvent<{}>) {
        e.preventDefault();
        this._closeModal();
    }

    /**
     * @desc HandleSourceNameInputChange
     * @method handleSourceNameInputChange
     * @example this.handleSourceNameInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    handleSourceNameInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) {
        const target = e.target;
        const sourceName = target.value;
        const sourceFilename = functionsUtil.toUrlFormat(sourceName);

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                name: sourceName,
                filename: sourceFilename
            }
        }));
    }


    /**
     * @desc HandleSourceFilenameInputChange
     * @method handleSourceFilenameInputChange
     * @example this.handleSourceFilenameInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    handleSourceFilenameInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) {
        const target = e.target;
        const value = target.value;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                filename: value
            }
        }));
    }


    /**
     * @desc HandleAddClick
     * @method handleAddClick
     * @example this.handleAddClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleAddClick (e: React.FormEvent<{}>) {
        e.preventDefault();
        
        const { fields } = this.state;
        const { currentPreprocessor, currentSource } = this.props;

        /* Own Props */
        const { source } = this.props;

        let sourceModel: SourceModel = {
            name: fields.name,
            filename: fields.filename,
            code: currentSource.code,
            preprocessor: currentPreprocessor,
            order: 0
        };

        // Received a source?
        if (!!source) {
            // Add new source in sourcesList in State Store
            let sourceListItem: SourceListItem = functionsUtil.updateObject(sourceModel, {tempId: source.tempId});
            this.props.actions.ui.editSourceItem(sourceListItem);
        } else { 
            // Update source received in sourcesList in State Store
            this.props.actions.ui.addSourceItem(sourceModel);
        } 


        // Close Modal
        this._closeModal();

    }



    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Init source code tabs options
     * @method _initSourceCodeTabOptions
     * @example this._initSourceCodeTabOptions()
     * @private 
     * @returns {void}
     */
    private _initSourceCodeTabOptions() {
        // Load source code tab options
        this.props.actions.ui.loadSourceCodeTabs();
    }


    /**
     * @desc Init current Preprocessor in Store
     * @method _initCurrentPreprocessor
     * @example this._initCurrentPreprocessor()
     * @private 
     * @returns {void}
     */
    private _initCurrentPreprocessor() {

        // Destructuring props & states
        const { source = this._DEFAULT_SOURCE_INSTANCE } = this.props;

        // Load source code tab options
        if (source.preprocessor.id) {
            this.props.actions.preprocessorState.changePreprocessor(source.preprocessor.id);
        }
    }


    /**
     * @desc Init sourceCode in Store
     * @method _initSourceCode
     * @example this._initSourceCode()
     * @private 
     * @returns {void}
     */
    private _initSourceCode() {

        // Destructuring props 
        const { source = this._DEFAULT_SOURCE_INSTANCE } = this.props;

        // Clear Source Code Panel
        this.props.actions.ui.clearSourceCode();

        // Load source code tab options
        this.props.actions.ui.changeSourceCode(source, source.preprocessor.type);
    }


    /**
     * @desc Close Modal 
     * @method _closeModal
     * @example this._closeModal()
     * @private 
     * @returns {void}
     */
    private _closeModal() {
        this.props.actions.ui.closeModal();
        document.body.classList.remove('sourceModal-open');
    }


    /**
     * @desc Append 'sourceModal-open' class in body tag in order to
     * manage the dimmer background color and other external styles
     * @method _appendModalOpenClassToBody
     * @example this._appendModalOpenClassToBody()
     * @private 
     * @returns {void}
     */
    private _appendModalOpenClassToBody() {
        document.body.classList.add('sourceModal-open');
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { fields } = this.state;
        const { name, filename } = fields;

        const { currentPreprocessor } = this.props;
        
        /*         MARKUP          */
        /***************************/
        return (
            <SourceModal sourceNameValue={name}
                         sourceFilenameValue={filename}
                         sourcePreprocessor={currentPreprocessor}
                         onSourceNameInputChange={this.handleSourceNameInputChange}
                         onSourceFilenameInputChange={this.handleSourceFilenameInputChange}
                         onSaveClick={this.handleAddClick}
                         onCloseClick={this.handleCloseClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState, ownProps: any): StateProps {
    return {
        tab: getSourceCodeTab(state),
        currentSource: getCurrentCodeByType(state),
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
                closeModal: () => dispatch(closeModalAction()),
                clearUi: () => dispatch(clearUiAction()),
                loadSourceCodeTabs: (sourceCodeTabs) => dispatch(loadSourceCodeTabsAction(sourceCodeTabs)),
                clearSourceCode: () => dispatch(clearSourceCodeAction()),
                changeSourceCode: (source, sourceType) => dispatch(changeSourceCodeAction(source, sourceType)),
                addSourceItem: (source) => dispatch(addSourceItemAction(source)),
                editSourceItem: (source) => dispatch(editSourceItemAction(source))
            },
            preprocessorState: {
                changePreprocessor: (preprocessorId) => dispatch(changePreprocessorAction(preprocessorId)),
                clearPreprocessorState: () => dispatch(clearPreprocessorStateAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourceModalContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    sourceModalContainerConnect
)(SourceModalContainer);