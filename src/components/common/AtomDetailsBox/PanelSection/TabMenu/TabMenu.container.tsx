/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import * as classNames from 'classnames';

import * as appConfig from './../../../../../core/constants/app.constants';

import { functionsUtil } from '../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';
import { User as UserModel } from './../../../../../models/user/user.model';

import Icon from './../../../Icon/Icon';

import { changeAtomDetailsTabAction, showModalAction } from './../../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuProps = {
    atomId: number;
};

/* Own States */
type LocalStates = {
    isToggleCode: boolean
};

/* Mapped State to Props */
type StateProps = {
    tab: string;
    duplicated: {
        atomId: number,
        isDuplicated: boolean;
    };
    isAuthenticated: boolean;
    user: UserModel;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: string | null) => void;
            showModal: (modalType: string, modalProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class TabMenu 
extends React.Component<ChildProps<TabMenuProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<TabMenuProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Init state
        this.state = { isToggleCode: false };

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox -> PanelSection -> TabMenu container actived');

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this._handleCodeClick = this._handleCodeClick.bind(this);
        this._handleDuplicateClick = this._handleDuplicateClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleCodeClick
     * @method _handleCodeClick
     * @example this._handleCodeClick()
     * @private
     * @returns {void}
     */
    private _handleCodeClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState((prevState: LocalStates) => ({
            isToggleCode: !prevState.isToggleCode
        }), () => {
            if (this.state.isToggleCode) {
                this._changeTab('code');
            } else {
                this._changeTab(null);
            }
        });
    }


    /**
     * @desc HandleTabClick
     * @method _handleTabClick
     * @example this._handleTabClick()
     * @private
     * @param {string} tab - string tab id (e.g. 'comments', 'code', etc) 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleTabClick = (tab: string) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this._changeTab(tab);
    }

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
            this._showDuplicateModal();
        }

    }

    /**
     * @desc Show Modal 
     * @method _showModal
     * @example this._showModal()
     * @private
     * @param {AtomModel} atom - atom data
     * @returns {void}
     */
    private _showDuplicateModal() {
        const {isAuthenticated, user} = this.props;
        const { atomId } = this.props;

        if (isAuthenticated && user) {

            this.props.actions.ui.showModal(appConfig.DUPLICATE_MODAL_TYPE, {atomId});

        } else {
            alert('You should be logged in to store this component in your repo.');
        }
    }

    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private 
     * @returns {void}
     */
    private _changeTab(tab: string | null) {
        this.props.actions.ui.changeAtomDetailsTab(tab);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { tab, duplicated } = this.props;
        const { isDuplicated } = duplicated;
        

        // Tab Menu Classes
        const tabMenuClasses = classNames({
            'TabMenu': true, 
            'sp-iconTabMenu': true, 
            'fontSmoothing-reset': true,
            'sp-iconTabMenu--is-reversed': tab === 'code'
        });

        // Comments Btn Classes
        /* const commentsBtnClasses = classNames({
            'sp-iconTabMenu__btn': true, 
            'sp-iconTabMenu__btn--active': tab === 'comments'
        });*/

        // Comments Icon on Btn Classes
        /* const commentsIconClasses = classNames({
            'strokeWidth-2': true, 
            'stroke-darkSecondary': tab === 'comments',
            'stroke-slate': tab !== 'comments'
        });*/

        // Code Btn Classes
        const codeBtnClasses = classNames({
            'sp-iconTabMenu__btn': true, 
            'sp-iconTabMenu__btn--active': tab === 'code'
        });

        // Code Icon on Btn Classes
        const codeIconClasses = classNames({
            'strokeWidth-2': true, 
            'stroke-darkPrimary': tab === 'code',
            'stroke-slate': tab !== 'code'
        });

        // Duplicate Btn Classes
        const duplicateClasses = classNames({
            'sp-iconTabMenu__btn': true,
            'sp-iconTabMenu__btn--inner-btn': true,
            'sp-iconTabMenu__btn--disabled': isDuplicated
        });


        /*         MARKUP          */
        /***************************/
        return (
            <div className={tabMenuClasses}>
                {/* TODO: Ir agregando uno por uno al momento de implementarlo */}
                {/*<button className="sp-iconTabMenu__btn">
                    <div className="inner">
                        <Icon icon="heartFull"
                            iconClass="strokeWidth-2"
                            width="22" height="22"/>
                    </div>
                </button>*/}
                {/*<button className="sp-iconTabMenu__btn">
                    <div className="inner">
                        <Icon icon="share"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>*/}
                {/*<button className={commentsBtnClasses}>
                    <div className="inner"
                        onClick={this._handleTabClick('comments')}>
                        <Icon icon="messageCircle"
                            iconClass={commentsIconClasses}
                            width="22" height="22"/>
                    </div>
                </button>*/}
                {/*<button className="sp-iconTabMenu__btn">
                    <div className="inner">
                        <Icon icon="download"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>*/}
                <button className={codeBtnClasses}
                        onClick={this._handleCodeClick}>
                    <div className="inner">
                        <Icon icon="code"
                            iconClass={codeIconClasses}
                            width="25" height="16"/>
                    </div>
                </button>

                {/* Duplicate button */}
                {/* TODO: Mover a una funcion para tener más organizado */}
                <Popup trigger={
                    <button className={duplicateClasses}
                    onClick={this._handleDuplicateClick}>
                        <div className="inner">
                            <div className="inner__btn sp-btn sp-btn--md sp-btn--secondary">
                                <Icon icon="duplicate"
                                    iconClass="strokeWidth-2 stroke-white"
                                    width="22" height="22"/>
                            </div>
                        </div>
                    </button>}
                    size="small"
                    inverted={true}>
                    {isDuplicated ?
                        <span className="color-primary fontWeight-9">DUPLICATED!</span> :
                        <span className="fontWeight-9">Duplicate component</span> }
                </Popup>

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { tabs, duplicated } = state.ui;
    const { atomDetailsTab } = tabs;
    const { tab } = atomDetailsTab;
    const { isAuthenticated, user } = state.auth;

    return {
        tab,
        isAuthenticated,
        user,
        duplicated
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeAtomDetailsTab: (tab) => dispatch(changeAtomDetailsTabAction(tab)),
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const tabMenuConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    tabMenuConnect
)(TabMenu);