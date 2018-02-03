/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';

import * as appConfig from './../../../../core/constants/app.constants';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeModalAction, clearUiAction } from './../../../../actions/ui.action';
import { clearAtomStateAction } from './../../../../actions/atom.action';

import { GET_ATOM_BY_ID_QUERY, GetByIdResponse } from './../../../../models/atom/atom.query';

import AtomDetailsBoxContainer from './../../AtomDetailsBox/AtomDetailsBox.container';
import Icon from './../../../../app/components/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsModalProps = {
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
extends React.Component<ChildProps<AtomDetailsModalProps & StateProps & DispatchProps, GetByIdResponse>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomDetailsModalProps & StateProps & DispatchProps, GetByIdResponse>) {
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


    /**
     * @desc Build Modal
     * @method _buildModal
     * @example this._buildModal()
     * @private
     * @returns {JSX.Element}
     */
    private _buildModal(): JSX.Element {

        // Destructuring props
        const {...data} = this.props.data;

        if (data.loading) {
            return (
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <Icon icon="loader"
                            iconClass="sp-loader"
                            color={appConfig.SECONDARY_COLOR_HEX}
                            width="80" height="80"/>
                        <div className="text text--xs color-slate fontFamily-openSans fontWeight-7 mt-3">
                            Loading component...
                        </div>
                    </li>
                </ul>
            );
        }

        if (data.error) {
            return (<p className="fontSize-xl color-steel">{data.error.message}</p>);
        }

        if (data.atomById === null) {
            return (
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <div className="icon icon--md icon--noResult mt-4 mb-3" />
                        <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                            We couldn’t find the component that match.
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                {/* Atom name */}
                <div className="d-flex align-items-center fontFamily-openSans fontWeight-7 fontSize-xl color-silver mt-5">
                    {data.atomById.name}
                    {data.atomById.duplicated &&
                    <span className="sp-tag sp-tag--xs sp-tag--primary fontWeight-7 fontSmoothing-reset ml-2">
                        Duplicated
                    </span>}
                </div>

                {/* Designed by */}
                <div className="mt-2">

                    <Link className="sp-designedBy sp-designedBy--md link-reset fontFamily-poppins fontWeight-5 color-silver text-truncate"
                        to={`/user/${data.atomById.author.username}`} target="_blank">
                        <span className="order-1">by</span>
                        <span className="ml-2 order-3">{data.atomById.author.firstname} {data.atomById.author.lastname}</span>
                        <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-2 order-2">
                            <img width="22" height="22"
                                src={data.atomById.author.avatar} 
                                alt={data.atomById.author.username} />
                        </div>
                    </Link>

                </div>

                {/* Atom Details Container */}
                <div className="mt-5">
                    <AtomDetailsBoxContainer atom={data.atomById}/>
                </div>
            </div>
        );
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        
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

                    {this._buildModal()}

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
    options: (ownProps: AtomDetailsModalProps & StateProps) => {
        return { 
            variables: 
            { 
                id: ownProps.atomId
            } 
        };
    }
};

// Query
const getAtomByIdQuery = graphql<GetByIdResponse, AtomDetailsModalProps>(
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
const atomDetailsModalConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomDetailsModalConnect,
    getAtomByIdQuery
)(AtomDetailsModalContainer);