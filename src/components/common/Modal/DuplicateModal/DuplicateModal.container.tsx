/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as classNames from 'classnames';

import { IRootState } from './../../../../reducer/reducer.config';
import { IAtomsProps, IAtomCodeProps } from './../../../../reducer/atom.reducer';
import { User as UserModel } from './../../../../models/user/user.model';

import { closeModalAction, duplicateAtomAction } from './../../../../actions/ui.action';
import { clearAtomStateAction } from './../../../../actions/atom.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type DuplicateModalProps = {
    atomId: number
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    duplicated: {
        atomId: number,
        isDuplicated: boolean
    };
    isAuthenticated: boolean;
    user: UserModel;
    isEdited: boolean;
    atoms: Array<IAtomsProps>;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            closeModal: () => void;
            duplicateAtom: (atomId: number, userId: number, atomCode: Array<IAtomCodeProps>) => void;
        },
        atomState: {
            clearAtomState: () => void;
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
    constructor(props: ChildProps<DuplicateModalProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Bind methods
        this._handleCloseClick = this._handleCloseClick.bind(this);
        this._handleDuplicateClick = this._handleDuplicateClick.bind(this);
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
     * @desc HandleDuplicateClick
     * @method _handleDuplicateClick
     * @example this._handleDuplicateClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleDuplicateClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { isDuplicated } = this.props.duplicated;

        if (!isDuplicated) {
            this._duplicateAtom();            
        }

    }


    /**
     * @desc Duplicate Atom
     * @method _duplicateAtom
     * @example this._duplicateAtom()
     * @private 
     * @returns {void}
     */
    private _duplicateAtom() {

        const { isAuthenticated, user } = this.props;
        const { atomId } = this.props;
        const { atoms } = this.props;
        let atomCode: Array<IAtomCodeProps> = null;

        if (isAuthenticated && user) {
            
            if (atoms.length > 0) {
                atoms.forEach(atom => {
                    if (atom.atomId === atomId) {
                        atomCode = atom.atomCode;
                    }
                });
            }

            this.props.actions.ui.duplicateAtom(atomId, user.id, atomCode);

        } else {
            alert('You should be logged in to store this component in your repo.');
        }

    }


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
        document.body.classList.remove('duplicateModal-open'); 
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
        const { user } = this.props;
        const { duplicated } = this.props;
        const { isDuplicated } = duplicated;
        const { isEdited } = this.props;

        // Duplicate modified version Classes
        const duplicateModifiedVersionClasses = classNames({
            'duplicateOption': true,
            'ml-sm-5': true,
            'duplicateOption--disabled': !isEdited
        });

        
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

                    {/* Modal Duplicate content */}
                    {!isDuplicated ? 
                        <div className="duplicateContent">

                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2 text-center">
                            Choose an option
                        </div>

                        {/* Duplicate options */}
                        <ul className="duplicateOptionsList marginTop-12">

                            {/* Duplicate original version option */}
                            <li className="duplicateOption"
                                onClick={this._handleDuplicateClick}>
                                <div className="duplicateOption__icon mt-4 mb-5" />
                                <div className="duplicateOption__text">
                                    Duplicate original version
                                </div>
                            </li>

                            {/* Duplicate modified version option */}
                            <li className={duplicateModifiedVersionClasses}
                                onClick={this._handleDuplicateClick}>
                                <div className="duplicateOption__icon duplicateOption__icon--edited mt-4 mb-5" />
                                <div className="duplicateOption__text">
                                    Duplicate including your changes
                                </div>
                            </li>

                        </ul>

                    </div> 
                    
                    :

                    <div className="duplicateContent">

                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-positive mt-2 text-center">
                            Duplicated successfully!
                        </div>

                        {/* Duplicate options */}
                        <ul className="duplicateOptionsList m-4">

                            {/* Duplicated successfully message */}
                            <li className="duplicateResult">
                                <div className="duplicateResult__icon mt-4 mb-5" />
                                <div className="duplicateResult__text mb-4">
                                    A new component just arrived on your dashboard.
                                </div>
                                <Link className="sp-btn sp-btn--md sp-btn--secondary-ghost"
                                      to={`/user/${user.username}`}>
                                    Go to your dashboard
                                </Link>
                            </li>

                        </ul>

                    </div>  }

                </Modal.Content>
            </Modal>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
        const { duplicated } = state.ui;
        const { isAuthenticated, user } = state.auth;
        const { isEdited, atoms } = state.atomState.edited;
    
        return {
            isAuthenticated,
            user,
            duplicated,
            isEdited,
            atoms
        };
    }


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                closeModal: () => dispatch(closeModalAction()),
                duplicateAtom: (atomId, userId, atomCode) => dispatch(duplicateAtomAction(atomId, userId, atomCode)),
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
const duplicateModalConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    duplicateModalConnect
)(DuplicateModal);