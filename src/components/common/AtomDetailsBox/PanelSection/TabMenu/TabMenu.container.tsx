/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../reducer/reducer.config';
import { User as UserModel } from './../../../../../models/user/user.model';

import Icon from './../../../Icon/Icon';

import { changeAtomDetailsTabAction, duplicateAtomAction } from './../../../../../actions/ui.action';

import { DUPLICATE_ATOM_MUTATION } from './../../../../../models/atom/atom.mutation';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuProps = {
    atomId: number;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: string;
    isAuthenticated: boolean;
    user: UserModel;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: string) => void;
            duplicateAtom: (atomId: number, userId: number) => void;
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
    constructor() {
        super();

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this._handleDuplicateClick = this._handleDuplicateClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


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
        this._duplicateAtom();
    }

    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private 
     * @returns {void}
     */
    private _changeTab(tab: string) {
        this.props.actions.ui.changeAtomDetailsTab(tab);
    }

    /**
     * @desc Duplicate Atom
     * @method _duplicateAtom
     * @example this._duplicateAtom()
     * @private 
     * @returns {void}
     */
    private _duplicateAtom() {

        const {isAuthenticated, user} = this.props;
        const { atomId } = this.props;

        if (isAuthenticated && user) {

            this.props.actions.ui.duplicateAtom(atomId, user.id);

        } else {
            alert('You should be logged in to store this component in your repo.');
        }

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { tab } = this.props;

        // Tab Menu Classes
        const tabMenuClasses = classNames({
            'TabMenu': true, 
            'sp-iconTabMenu': true, 
            'fontSmoothing-reset': true,
            'sp-iconTabMenu--is-reversed': tab === 'code'
        });

        // Comments Btn Classes
        /* const commentsBtnClasses = classNames({
            'sp-iconTabMenu__button': true, 
            'sp-iconTabMenu__button--active': tab === 'comments'
        });*/

        // Comments Icon on Btn Classes
        /* const commentsIconClasses = classNames({
            'strokeWidth-2': true, 
            'stroke-darkSecondary': tab === 'comments',
            'stroke-slate': tab !== 'comments'
        });*/

        // Code Btn Classes
        const codeBtnClasses = classNames({
            'sp-iconTabMenu__button': true, 
            'sp-iconTabMenu__button--active': tab === 'code'
        });

        // Code Icon on Btn Classes
        const codeIconClasses = classNames({
            'strokeWidth-2': true, 
            'stroke-darkPrimary': tab === 'code',
            'stroke-slate': tab !== 'code'
        });


        /*         MARKUP          */
        /***************************/
        return (
            <div className={tabMenuClasses}>
                {/* TODO: Ir agregando uno por uno al momento de implementarlo */}
                {/*<button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="heartFull"
                            iconClass="strokeWidth-2"
                            width="22" height="22"/>
                    </div>
                </button>*/}
                {/*<button className="sp-iconTabMenu__button">
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
                {/*<button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="download"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>*/}
                <button className={codeBtnClasses}
                        onClick={this._handleTabClick('code')}>
                    <div className="inner">
                        <Icon icon="code"
                            iconClass={codeIconClasses}
                            width="25" height="16"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button"
                        onClick={this._handleDuplicateClick}>
                    <div className="inner">
                        <Icon icon="package"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { tabs } = state.ui;
    const { atomDetailsTab } = tabs;
    const { tab } = atomDetailsTab;
    const { isAuthenticated, user } = state.auth;

    return {
        tab,
        isAuthenticated,
        user
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
                duplicateAtom: (atomId, userId) => dispatch(duplicateAtomAction(atomId, userId))
            }
        }
    };
}


/********************************/
/*           MUTATION           */
/********************************/
const duplicateAtomMutation = graphql<any, any>(
    DUPLICATE_ATOM_MUTATION
);


/********************************/
/*         REDUX CONNECT        */
/********************************/
const tabMenuConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    duplicateAtomMutation,
    tabMenuConnect
)(TabMenu);