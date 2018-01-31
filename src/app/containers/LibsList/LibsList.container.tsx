/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import { Lib as LibModel } from './../../../models/lib/lib.model';

import { changeLibsAction } from './../../../actions/ui.action';

import LibsList from './../../components/LibsList/LibsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibsListContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    libs: Array<LibModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeLibs: (libs: Array<LibModel>) => void;
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
     * @param {LibModel} lib - lib that I want to remove of the libs list
     * @returns {void}
     */
    handleDeleteClick(lib: LibModel) {
        this._deleteLib(lib);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Delete Lib
     * @method _deleteLib
     * @example this._deleteLib()
     * @private 
     * @param {LibModel} lib - lib that I want to remove of the libs list
     * @returns {void}
     */
    private _deleteLib(lib: LibModel) {

        // Destructuring state
        const { libs } = this.props;
        
        let libArray = libs.filter(function (candidateLib: LibModel) {
            return candidateLib !== lib;
        });

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            libs: libArray
        }), () => {
            this.props.actions.ui.changeLibs(libArray);
        });

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { libs } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <LibsList libs={libs} onDelete={this.handleDeleteClick}/>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const {libsPanel} = state.ui;
    const { libs } = libsPanel;

    return {
        libs
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeLibs: (libs) => dispatch(changeLibsAction(libs))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const libsListContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    libsListContainerConnect
)(LibsListContainer);