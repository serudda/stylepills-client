/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Modal } from 'semantic-ui-react';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeModalAction, clearUiAction } from './../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type DuplicateModalProps = {
    atomId: number,
    userId: number
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
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class DuplicateModal 
extends React.Component<ChildProps<DuplicateModalProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

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
        document.body.classList.remove('duplicateModal-open');
        // Clean tabs states and other ui states
        // this.props.actions.ui.clearUi();
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
        document.body.classList.add('duplicateModal-open');
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        // Destructuring props
        // const { atomId, userId } = this.props;

        
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
            className="scrolling DuplicateModal">
                <Modal.Content>

                    {/* Title */}
                    <div className="fontFamily-openSans fontWeight-5 fontSize-sm color-silver mt-5 text-center">
                        DUPLICATE COMPONENT
                    </div>

                    {/* Subtitle */}
                    <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2 text-center">
                        Choose an option
                    </div>

                    {/* Duplicate options */}
                    <ul className="duplicateOptionsList marginTop-12">

                        {/* Duplicate original version option */}
                        <li className="duplicateOption">
                            <div className="duplicateOption__icon mt-4 mb-5" />
                            <div className="duplicateOption__text">
                                Duplicate original version
                            </div>
                        </li>

                        {/* Duplicate modified version option */}
                        <li className="duplicateOption ml-sm-5">
                            <div className="duplicateOption__icon mt-4 mb-5" />
                            <div className="duplicateOption__text">
                                Duplicate including your changes
                            </div>
                        </li>

                    </ul>

                </Modal.Content>
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
                closeModal: () => dispatch(closeModalAction()),
                clearUi: () => dispatch(clearUiAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const duplicateModalConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    duplicateModalConnect
)(DuplicateModal);