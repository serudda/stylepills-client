/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import { SourceListItem } from './../../../reducer/ui.reducer';

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

import SourcesList from './../../components/SourcesList/SourcesList';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourcesListContainerProps = {};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    sourcesList: Array<SourceModel | SourceListItem>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            showModal: (modalType: ModalOption, modalProps: any) => void;
            deleteSourceItem: (tempId: string) => void;
            changeSourceItemOrder: (id: number, newOrder: number) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SourcesListContainerProps
&   StateProps
&   DispatchProps;



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourcesListContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AllProps) {
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
     * @param {string} id - source id
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleDeleteClick = (id: string) => (e: React.FormEvent<{}>) => {
        this._deleteSourceItem(id);
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
     * @desc Delete Lib Item
     * @method _deleteSourceItem
     * @example this._deleteSourceItem(2)
     * @private
     * @param {string} id - lib id
     * @returns {void}
     */
    private _deleteSourceItem(id: string) {
        this.props.actions.ui.deleteSourceItem(id);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { sourcesList } = this.props;


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
                deleteSourceItem: (tempId) => dispatch(deleteSourceItemAction(tempId)),
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