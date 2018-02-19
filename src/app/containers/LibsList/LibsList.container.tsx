/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';
import { LibListItem } from './../../../reducer/ui.reducer';

import { LibTypeOptions } from './../../../models/lib/lib.model';

import {  
    deleteLibItemAction, 
} from './../../../actions/ui.action';

import { makeGetLibListByType } from './../../../selectors/ui.selector';

import LibsList from './../../components/LibsList/LibsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibsListContainerProps = {
    libType: LibTypeOptions
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    libsList: Array<LibListItem>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            deleteLibItem: (id: string | number, libType: LibTypeOptions) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class LibsListContainer 
extends React.Component<ChildProps<LibsListContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: LibsListContainerProps & StateProps & DispatchProps) {
        super(props);

        // Bind methods
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleDeleteClick
     * @method handleDeleteClick
     * @example this.handleDeleteClick()
     * @public
     * @param {string | number} id - color id
     * @returns {void}
     */
    handleDeleteClick = (id: string | number) => (e: React.FormEvent<{}>) => {
        const { libType } = this.props;
        this._deleteLibItem(id, libType);
    }


     /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Delete Lib Item
     * @method _deleteLibItem
     * @example this._deleteLibItem(2)
     * @private
     * @param {string | number} id - lib id
     * @returns {void}
     */
    private _deleteLibItem(id: string | number, libType: LibTypeOptions) {
        this.props.actions.ui.deleteLibItem(id, libType);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { libsList } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <LibsList libs={libsList} 
                      isEmpty={libsList.length === 0} 
                      onDeleteClick={this.handleDeleteClick}/>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
const makeMapStateToProps = () => { // NOTE: 1
    const getLibListByType = makeGetLibListByType();
    const mapStateToProps = (state: IRootState, props: LibsListContainerProps) => {
        return {
            libsList: getLibListByType(state, props)
        };
    };
    return mapStateToProps;
};


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                deleteLibItem: (id, libType) => dispatch(deleteLibItemAction(id, libType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const libsListContainerConnect = connect(makeMapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    libsListContainerConnect
)(LibsListContainer);