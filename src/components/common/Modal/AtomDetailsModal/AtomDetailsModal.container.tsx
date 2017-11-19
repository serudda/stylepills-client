/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Modal } from 'semantic-ui-react';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeModalAction } from './../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsModalProps = {
    atom: any
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            closeModal: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomDetailsModal 
extends React.Component<ChildProps<AtomDetailsModalProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

        // Bind methods
        this._handleCloseClick = this._handleCloseClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleCloseClick
     * @method _handleCloseClick
     * @example this._handleCloseClick()
     * @private 
     * @returns {void}
     */
    private _handleCloseClick (e: any) {
        e.preventDefault();
        this._closeModal();
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
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        // Destructuring props
        const { atom } = this.props;
        
        /*         MARKUP          */
        /***************************/
        return (
            <Modal
            basic={true}
            closeIcon="close"
            open={true}
            onClose={this._handleCloseClick}
            size="fullscreen">
                <Modal.Header>{atom.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>{atom.html}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions />
            </Modal>
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
                closeModal: () => dispatch(closeModalAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomDetailsModalConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomDetailsModalConnect
)(AtomDetailsModal);