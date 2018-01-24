/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import * as appConfig from './../../../../../../core/constants/app.constants';
import { functionsUtil } from './../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { Atom as AtomModel } from '../../../../../../models/atom/atom.model';

import Iframe from './../../../../../common/Iframe/Iframe.container';

import { showModalAction } from './../../../../../../actions/ui.action';

import Icon from './../../../../../common/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomBoxProps = {
    atom: AtomModel
};

/* Own States */
type LocalStates = {
    liked: boolean;
    showCover: boolean;
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            showModal: (modalType: string, modalProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomBox 
extends React.Component<ChildProps<AtomBoxProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomBoxProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('AtomBox container actived');

        // Init local state
        this.state = {
            liked: false,
            showCover: false
        };

        // Bind methods
        this._handleCoverClick = this._handleCoverClick.bind(this);
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleMouseHover = this._handleMouseHover.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {AtomModel} atom - atom data
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleCoverClick = (atom: AtomModel) => (e: React.FormEvent<{}>) => {
        this._showModal(atom);
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

    private _handleMouseHover() {
        this.setState(this._toggleHoverState);
    }
    
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
     * @param {AtomModel} atom - atom data
     * @returns {void}
     */
    private _showModal(atom: AtomModel) {
        this.props.actions.ui.showModal(appConfig.ATOM_DETAILS_MODAL_TYPE, {atom});
    }


    /**
     * @desc Connect frame with this component
     * method sample
     */
    onLoad(): void {
        // LOG
        functionsUtil.consoleLog('IFrame connected with AtomBox component');
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { atom } = this.props;
        const { liked, showCover } = this.state;

        // Like Button Classes
        const likeBtnClasses = classNames({
            'icon': true,
            'stroke-black': !liked,
            'strokeWidth-2': !liked,
            'active': liked
        });

        // Cover Link Classes
        const coverLinkClasses = classNames({
            'cover-link': true,
            'active': showCover
        });

        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
                <div className="AtomBox__content borderRadius-xs">

                    <div onClick={this._handleCoverClick(atom)} 
                        onMouseEnter={this._handleMouseHover}
                        onMouseLeave={this._handleMouseHover}
                        className={coverLinkClasses}>

                        <div className="cover-link__header position-relative">
                            {atom.duplicated &&
                            <span className="sp-tag sp-tag--xs sp-tag--primary fontWeight-7 fontSmoothing-reset">
                                Duplicated
                            </span>}

                            <div className="icon-container float-right"
                                onClick={this._handleLikeClick(atom)}>
                                <Icon icon={liked ? 'heartFull' : 'heart'}
                                    iconClass={likeBtnClasses}
                                    width="23" height="23"/>
                            </div>
                        </div>

                        <div className="cover-link__content color-silver fontSize-sm p-2">
                            {functionsUtil.truncateText(atom.description, 200, null)}
                        </div>
                        
                    </div>

                    <div className="Iframe-wrapper">
                        <Iframe onLoad={this.onLoad} 
                                children={atom.html} 
                                css={atom.css} 
                                title={atom.name}
                                background={atom.contextualBg}
                                stylesheets={['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css']} />
                    </div>

                </div>
            </div>
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
)(AtomBox);