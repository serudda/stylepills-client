/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../reducer/reducer.config';
import { Source as SourceModel } from './../../../../models/source/source.model';
import { 
    Preprocessor as PreprocessorModel, 
    PreprocessorTypeOptions 
} from '../../../../models/preprocessor/preprocessor.model';

import { getCurrentPreprocessor } from './../../../../selectors/preprocessor.selector';

import { closeModalAction, clearUiAction } from './../../../../actions/ui.action';

import SourceModal from './../../../../app/components/Modals/SourceModal/SourceModal';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/
type SourceModalForm = {
    name: string;
    filename: string;
    code: string;
    preprocessor: PreprocessorTypeOptions;
};

/* Own Props */
type SourceModalContainerProps = {
    source: SourceModel
};

/* Own States */
type LocalStates = {
    fields: SourceModalForm
};

/* Mapped State to Props */
type StateProps = {
    currentPreprocessor: PreprocessorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            closeModal: () => void;
            clearUi: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceModalContainer
extends React.Component<ChildProps<SourceModalContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SourceModalContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Destructuring props 
        const { source = {
            name: '',
            filename: '', 
            code: '', 
            preprocessor: {
                type: PreprocessorTypeOptions.scss
            }
        } } = props;

        // Init form
        this.state = {
            fields: {
                name: source.name,
                filename: source.filename,
                code: source.code,
                preprocessor: source.preprocessor.type
            }
        };

        // Bind methods
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSourceNameInputChange = this.handleSourceNameInputChange.bind(this);
        this.handleSourceFilenameInputChange = this.handleSourceFilenameInputChange.bind(this);
    }


    /********************************/
    /*     COMPONENT_DID_MOUNT      */
    /********************************/
    componentDidMount() { 
        this._appendModalOpenClassToBody();
    }


    /********************************/
    /*    COMPONENT_DID_UPDATE      */
    /********************************/
    componentDidUpdate() { 
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
        alert('Click on Add Click: SourceModal.container');
    }



    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Close Modal 
     * @method _closeModal
     * @example this._closeModal()
     * @private 
     * @returns {void}
     */
    private _closeModal() {
        this.props.actions.ui.closeModal();
        // Clean atom states (close source code edition)
        // this.props.actions.atomState.clearAtomState();
        // Clean tabs states and other ui states
        this.props.actions.ui.clearUi();
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
        const { extension } = currentPreprocessor;
        
        /*         MARKUP          */
        /***************************/
        return (
            <SourceModal sourceNameValue={name}
                         sourceFilenameValue={filename}
                         preprocessorExtension={extension}
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
function mapStateToProps(state: IRootState): StateProps {
    return {
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
                clearUi: () => dispatch(clearUiAction())
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