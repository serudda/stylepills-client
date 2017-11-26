/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeModalAction, clearUiAction } from './../../../../actions/ui.action';

import AtomDetailsBox from './../../AtomDetailsBox/AtomDetailsBox.container';

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
            clearUi: () => void;
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
        // Clean tabs states and other ui states
        this.props.actions.ui.clearUi();
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
        const { atom } = this.props;

        
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

                    {/* Atom name */}
                    <div className="fontFamily-openSans fontWeight-9 fontSize-xl color-silver mt-5">
                        {atom.name}
                    </div>

                    {/* Designed by */}
                    <div className="mt-2">

                        <Link className="sp-designedBy sp-designedBy--md link-reset fontFamily-poppins fontWeight-5 color-silver text-truncate"
                            to={`user/${atom.author.username}`} target="_blank">
                            <span className="order-1">by</span>
                            <span className="ml-2 order-3">{atom.author.firstname} {atom.author.lastname}</span>
                            <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-2 order-2">
                                <img width="22" height="22"
                                    src={atom.author.avatar} 
                                    alt={atom.author.username} />
                            </div>
                        </Link>

                    </div>

                    {/* Atom Details Container */}
                    <div className="mt-5">
                        <AtomDetailsBox atom={atom}/>
                    </div>

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
const atomDetailsModalConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomDetailsModalConnect
)(AtomDetailsModal);