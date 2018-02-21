/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import AtomDetailsModalContainer from './../AtomDetailsModal/AtomDetailsModal.container';
import DuplicateModalContainer from './../../../../components/common/Modal/DuplicateModal/DuplicateModal.container';
import SourceModal from './../../../components/Modals/SourceModal/SourceModal';

// -----------------------------------

/* Here are all modal components */
const modalComponentList = {
    AtomDetailsModal: AtomDetailsModalContainer,
    DuplicateModal: DuplicateModalContainer,
    SourceModal
};


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible modal options */
export enum Option {
    AtomDetailsModal = 'AtomDetailsModal',
    DuplicateModal = 'DuplicateModal',
    SourceModal = 'SourceModal'
}

/* Own Props */
type ModalManagerContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    currentModals: Array<{modalType: Option, modalProps: any}>;
};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ModalManagerContainer 
extends React.Component<ChildProps<ModalManagerContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ModalManagerContainerProps & StateProps & DispatchProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { currentModals } = this.props;

        /* LEGACY
        let renderedModal;

        if (currentModal) {
            const {modalType, modalProps = {}} = currentModal;
            const ModalComponent = modalComponentList[modalType];

            renderedModal = <ModalComponent {...modalProps} />;
        }
        */

        const renderedModals = currentModals.map(
            (modalDescription, index) => {
                const { modalType, modalProps = {} } = modalDescription;
                const ModalComponent = modalComponentList[modalType];
                return <ModalComponent {...modalProps} key={modalType + index} />;
            }
        );
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <span>{renderedModals}</span>
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { modals } = state.ui;
    return {
        currentModals: modals
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const modalManagerContainerConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    modalManagerContainerConnect
)(ModalManagerContainer);