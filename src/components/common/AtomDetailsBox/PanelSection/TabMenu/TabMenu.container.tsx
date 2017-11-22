/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../reducer/reducer.config';

import Icon from './../../../Icon/Icon';

import { changeAtomDetailsTabAction } from './../../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: string) => void;
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
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
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
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private 
     * @returns {void}
     */
    private _changeTab(tab: string) {
        this.props.actions.ui.changeAtomDetailsTab(tab);
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
                <button className={codeBtnClasses}>
                    <div className="inner"
                        onClick={this._handleTabClick('code')}>
                        <Icon icon="code"
                            iconClass={codeIconClasses}
                            width="25" height="16"/>
                    </div>
                </button>
                {/*<button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="package"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>*/}
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

    return {
        tab
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeAtomDetailsTab: (tab) => dispatch(changeAtomDetailsTabAction(tab))
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