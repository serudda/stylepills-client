/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import {  
    deleteColorItemAction, 
} from './../../../actions/ui.action';

import { Color as ColorModel } from './../../../models/color/color.model';

import ColorsList from './../../components/ColorsList/ColorsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorsListContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    colorsList: Array<ColorModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            deleteColorItem: (id: number) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ColorsListContainer 
extends React.Component<ChildProps<ColorsListContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ColorsListContainerProps & StateProps & DispatchProps) {
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
     * @param {number} id - color id
     * @returns {void}
     */
    handleDeleteClick(id: number) {
        this._deleteColorItem(1);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Delete Color Item
     * @method _deleteColorItem
     * @example this._deleteColorItem(2)
     * @private
     * @param {number} id - color id
     * @returns {void}
     */
    private _deleteColorItem(id: number) {
        this.props.actions.ui.deleteColorItem(id);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { colorsList } = this.props;

        /*         MARKUP          */
        /***************************/
        return (

            <ColorsList colors={colorsList}
                        onDeleteClick={this.handleDeleteClick}/>
            
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { lists } = state.ui;
    const { colorsList } = lists;

    return {
        colorsList
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                deleteColorItem: (id) => dispatch(deleteColorItemAction(id))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const colorsListContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    colorsListContainerConnect
)(ColorsListContainer);