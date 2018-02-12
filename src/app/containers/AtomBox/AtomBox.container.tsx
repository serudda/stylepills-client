/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { IRootState } from './../../../reducer/reducer.config';

import { Atom as AtomModel } from './../../../models/atom/atom.model';

import { Lib as LibModel } from './../../../models/lib/lib.model';

import LibService from './../../../models/lib/lib.service';

import AtomBox from './../../components/AtomBox/AtomBox';

import IframeContainer from './../../../components/common/Iframe/Iframe.container';

import { showModalAction } from './../../../actions/ui.action';

import { 
    Option as ModalOption 
} from './../../containers/Modals/ModalManager/ModalManager.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomBoxContainerProps = {
    atom: AtomModel
};

/* Own States */
type LocalStates = {
    liked: boolean;
    showCover: boolean;
    mergedLibs: Array<LibModel>;
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            showModal: (modalType: ModalOption, modalProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomBoxContainer 
extends React.Component<ChildProps<AtomBoxContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomBoxContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('AtomBoxContainer actived');

        // Init local state
        this.state = {
            liked: false,
            showCover: false,
            mergedLibs: []
        };

        // Bind methods
        this._handleCoverClick = this._handleCoverClick.bind(this);
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleMouseHover = this._handleMouseHover.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {
        
        let { libs, project } = this.props.atom;

        // Join project's libs with atom's libs
        if (project) {
            libs = libs.concat(project.libs);
        }

        // Save merged libs on local state
        this.setState({
            mergedLibs: libs
        });
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleCoverClick
     * @method _handleCoverClick
     * @example this._handleCoverClick()
     * @private
     * @param {AtomModel} atom - atom data
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleCoverClick = (atom: AtomModel) => (e: React.FormEvent<{}>) => {
        this._showModal(atom.id);
    }


    /**
     * @desc HandleLikeClick
     * @method _handleLikeClick
     * @example this._handleLikeClick()
     * @private
     * @param {AtomModel} atom - atom data
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleLikeClick = (atom: AtomModel) => (e: React.FormEvent<{}>) => {
        e.stopPropagation();
        this.setState({
            liked: true
        });
    }


    /**
     * @desc HandleMouseHover
     * @method _handleMouseHover
     * @example this._handleMouseHover()
     * @private
     * @returns {void}
     */
    private _handleMouseHover() {
        this.setState(this._toggleHoverState);
    }
    

    /**
     * @desc HandleMouseHover
     * @method _toggleHoverState
     * @example this._toggleHoverState()
     * @private
     * @returns {void}
     */
    private _toggleHoverState(state: LocalStates) {
        return {
          showCover: !state.showCover,
        };
    }


    /**
     * @desc Show Modal 
     * @method _showModal
     * @example this._showModal()
     * @private
     * @param {number} atomId - atom id
     * @returns {void}
     */
    private _showModal(atomId: number) {
        this.props.actions.ui.showModal(ModalOption.AtomDetailsModal, {atomId});
    }


    /**
     * @desc Connect frame with this component
     * method sample
     */
    onLoad(): void {
        // LOG
        functionsUtil.consoleLog('IFrame connected with AtomBoxContainer component');
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { atom } = this.props;
        const { liked, showCover } = this.state;

        /* Send mergedLibs local state instead of Atom libs since
            it has atom and project libs together. */
        const { mergedLibs } = this.state;


        /*         MARKUP          */
        /***************************/
        return (
            <AtomBox atom={atom} 
                    liked={liked} 
                    showCover={showCover}
                    onCoverClick={this._handleCoverClick}
                    onCoverMouseEnter={this._handleMouseHover}
                    onCoverMouseLeave={this._handleMouseHover}
                    onLikeClick={this._handleLikeClick}>
                <IframeContainer onLoad={this.onLoad} 
                                children={atom.html} 
                                css={atom.css} 
                                title={atom.name}
                                background={atom.contextualBg}
                                stylesheets={LibService.getStylesheetsFromLibs(mergedLibs)} />
            </AtomBox>
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
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomBoxConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomBoxConnect
)(AtomBoxContainer);