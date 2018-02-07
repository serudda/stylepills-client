/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Modal } from 'semantic-ui-react';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeModalAction, clearUiAction } from './../../../../actions/ui.action';
import { clearAtomStateAction } from './../../../../actions/atom.action';

import { GET_ATOM_BY_ID_QUERY, GetByIdResponse } from './../../../../models/atom/atom.query';

import AtomDetailsModal from './../../../../app/components/Modals/AtomDetailsModal/AtomDetailsModal';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsModalContainerProps = {
    atomId: number
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
            clearUi: () => void;
        },
        atomState: {
            clearAtomState: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomDetailsModalContainer
extends React.Component<ChildProps<AtomDetailsModalContainerProps & StateProps & DispatchProps, GetByIdResponse>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomDetailsModalContainerProps & StateProps & DispatchProps, GetByIdResponse>) {
        super(props);

        // Bind methods
        this._handleCloseClick = this._handleCloseClick.bind(this);
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
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleCloseClick
     * @method _handleCloseClick
     * @example this._handleCloseClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleCloseClick (e: React.FormEvent<{}>) {
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
        // Clean atom states (close source code edition)
        this.props.actions.atomState.clearAtomState();
        // Clean tabs states and other ui states
        this.props.actions.ui.clearUi();
        document.body.classList.remove('atomDetailsModal-open');
    }


    /**
     * @desc Append 'atomDetailsModal-open' class in body tag in order to
     * manage the dimmer background color and other external styles
     * @method _appendModalOpenClassToBody
     * @example this._appendModalOpenClassToBody()
     * @private 
     * @returns {void}
     */
    private _appendModalOpenClassToBody() {
        document.body.classList.add('atomDetailsModal-open');
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {...data} = this.props.data;
        
        /*         MARKUP          */
        /***************************/
        return (
            <Modal
            basic={true}
            closeIcon="sp-close-icon"
            closeOnDimmerClick={false}
            open={true}
            onClose={this._handleCloseClick}
            size="fullscreen"
            className="scrolling AtomDetailsModal">
                <Modal.Content>

                    <AtomDetailsModal atom={data.atomById}
                                    loading={data.loading}
                                    error={data.error}/>

                </Modal.Content>
            </Modal>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/

// Query options
const config = {
    options: (ownProps: AtomDetailsModalContainerProps & StateProps) => {
        return { 
            variables: 
            { 
                id: ownProps.atomId
            } 
        };
    }
};

// Query
const getAtomByIdQuery = graphql<GetByIdResponse, AtomDetailsModalContainerProps>(
    GET_ATOM_BY_ID_QUERY, config
);


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                closeModal: () => dispatch(closeModalAction()),
                clearUi: () => dispatch(clearUiAction())
            },
            atomState: {
                clearAtomState: () => dispatch(clearAtomStateAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomDetailsModalContainerConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomDetailsModalContainerConnect,
    getAtomByIdQuery
)(AtomDetailsModalContainer);