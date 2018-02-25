/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';
import { CodeSupportedOption } from './../../../core/interfaces/interfaces';

import { 
    showModalAction, 
    deleteSourceItemAction, 
    changeSourceItemOrderAction 
} from './../../../actions/ui.action';

import { Source as SourceModel } from './../../../models/source/source.model';
import { getSourcesList } from './../../../selectors/ui.selector';

import { 
    Option as ModalOption 
} from './../../containers/Modals/ModalManager/ModalManager.container';
import {
    CompileToTypeOptions,
    PreprocessorNameOptions,
    PreprocessorExtOptions
} from './../../../models/preprocessor/preprocessor.model';

import SourcesList from './../../components/SourcesList/SourcesList';
import { SourceListItem } from '../../../reducer/ui.reducer';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourcesListContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    sourcesList: Array<SourceModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            showModal: (modalType: ModalOption, modalProps: any) => void;
            deleteSourceItem: (id: number) => void;
            changeSourceItemOrder: (id: number, newOrder: number) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourcesListContainer 
extends React.Component<ChildProps<SourcesListContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourcesListContainerProps & StateProps & DispatchProps) {
        super(props);

        // Bind methods
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleEditClick
     * @method handleEditClick
     * @example this.handleEditClick()
     * @public
     * @param {SourceModel} source - source entity
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleEditClick = (source: SourceModel) => (e: React.FormEvent<{}>) => {
        this._showModal(source);
    }


    /**
     * @desc HandleDeleteClick
     * @method handleDeleteClick
     * @example this.handleDeleteClick()
     * @public
     * @param {number} id - source id
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleDeleteClick = (id: number) => (e: React.FormEvent<{}>) => {
        this._deleteSourceItem(1);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Show Modal 
     * @method _showModal
     * @example this._showModal()
     * @private
     * @param {SourceModel} source - source entity
     * @returns {void}
     */
    private _showModal(source: SourceModel) {
        this.props.actions.ui.showModal(ModalOption.SourceModal, { source });
    }


    /**
     * @desc Show Modal 
     * @method _deleteSourceItem
     * @example this._deleteSourceItem(2)
     * @private
     * @param {number} id - source id
     * @returns {void}
     */
    private _deleteSourceItem(id: number) {
        // this.props.actions.ui.deleteSourceItem(id);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        // const { sourcesList } = this.props;

        const sourcesList: Array<SourceListItem> = [{
            id: 1,
            name: 'global',
            filename: 'global',
            code: '.class { global }',
            preprocessor: {
                id: 7,
                name: PreprocessorNameOptions.scss,
                extension: PreprocessorExtOptions.scss,
                type: CodeSupportedOption.scss,
                compileTo: CompileToTypeOptions.css
            },
            order: 1
        }, {
            id: 2,
            name: 'variables',
            filename: 'variables',
            code: '.class { variables }',
            preprocessor: {
                id: 8,
                type: CodeSupportedOption.sass,
                name: PreprocessorNameOptions.sass,
                extension: PreprocessorExtOptions.sass,
                compileTo: CompileToTypeOptions.css
            },
            order: 2
        }, {
            id: 3,
            name: 'helper classes',
            filename: 'helper-classes',
            code: '.class { helper-classes }',
            preprocessor: {
                id: 9,
                type: CodeSupportedOption.less,
                name: PreprocessorNameOptions.less,
                extension: PreprocessorExtOptions.less,
                compileTo: CompileToTypeOptions.css
            },
            order: 3
        }];

        /*         MARKUP          */
        /***************************/
        return (

            <SourcesList sources={sourcesList}
                         onEditClick={this.handleEditClick}
                         onDeleteClick={this.handleDeleteClick}/>
            
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        sourcesList: getSourcesList(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps)),
                deleteSourceItem: (id) => dispatch(deleteSourceItemAction(id)),
                changeSourceItemOrder: (id, newOrder) => dispatch(changeSourceItemOrderAction(id, newOrder))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourcesListContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourcesListContainerConnect
)(SourcesListContainer);