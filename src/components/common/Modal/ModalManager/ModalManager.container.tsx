/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import AtomDetailsModal from './../AtomDetailsModal/AtomDetailsModal.container';

// -----------------------------------

/* Here are all modal components */
const modalComponentList = {
    AtomDetailsModal
};


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ModalManagerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    currentModal: any;
};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ModalManager 
extends React.Component<ChildProps<ModalManagerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { currentModal } = this.props;

        let renderedModal;

        if (currentModal) {
            const {modalType, modalProps = {}} = currentModal;
            const ModalComponent = modalComponentList[modalType];

            renderedModal = <ModalComponent {...modalProps} />;
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <span>{renderedModal}</span>
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { modals } = state.ui;
    return {
        currentModal: modals
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const modalManagerConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    modalManagerConnect
)(ModalManager);