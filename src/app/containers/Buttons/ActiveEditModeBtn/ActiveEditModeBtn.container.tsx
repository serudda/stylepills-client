/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { requestEditAtomAction } from './../../../../actions/atom.action';

import GenericBtn, { 
    TypeOption 
} from './../../../components/Buttons/GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ActiveEditModeBtnContainerProps = {
    id: number,
    name: string
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    watchingChanges: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        atomState: {
            activeEditMode: (id: number, name: string) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ActiveEditModeBtnContainer 
extends React.Component<ChildProps<ActiveEditModeBtnContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ActiveEditModeBtnContainerProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            copied: false
        };

        // Bind methods
        this._handleEditClick = this._handleEditClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleEditClick
     * @method _handleEditClick
     * @example this._handleEditClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleEditClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._activeEditMode();
    }


    /**
     * @desc Active Edit Mode
     * @method _activeEditMode
     * @example this._activeEditMode()
     * @private
     * @returns {void}
     */
    private _activeEditMode() {
        // Destructuring props
        const { id, name } = this.props;

        // Launch active edit mode Action
        this.props.actions.atomState.activeEditMode(id, name);
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { watchingChanges } = this.props;


        /*         MARKUP          */
        /***************************/
        return (

            <GenericBtn type={TypeOption.secondary} 
                        label={watchingChanges ? 'Edit: ON' : 'Edit'}
                        onClick={this._handleEditClick}
                        disabled={watchingChanges} />
            
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { watchingChanges } = state.atomState.edited;

    return {
        watchingChanges
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            atomState: {
                activeEditMode: (id, name) => dispatch(requestEditAtomAction(id, name))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const activeEditModeBtnContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    activeEditModeBtnContainerConnect
)(ActiveEditModeBtnContainer);