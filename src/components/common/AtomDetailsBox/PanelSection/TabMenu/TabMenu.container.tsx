/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

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
     * @returns {void}
     */
    private _handleTabClick = (tab: string) => (e: any) => {
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


        /*         MARKUP          */
        /***************************/
        return (
            <div className="TabMenu sp-iconTabMenu sp-iconTabMenu--is-reversed fontSmoothing-reset">
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="heartFull"
                            iconClass="strokeWidth-2"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="share"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className={tab === 'comments' ? 'sp-iconTabMenu__button sp-iconTabMenu__button--active-secondary' : 'sp-iconTabMenu__button'}>
                    <div className="inner"
                        onClick={this._handleTabClick('comments')}>
                        <Icon icon="messageCircle"
                            iconClass={tab === 'comments' ? 'strokeWidth-2 stroke-darkSecondary' : 'strokeWidth-2 stroke-slate'}
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="download"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className={tab === 'code' ? 'sp-iconTabMenu__button sp-iconTabMenu__button--active-primary' : 'sp-iconTabMenu__button'}>
                    <div className="inner"
                        onClick={this._handleTabClick('code')}>
                        <Icon icon="code"
                            iconClass={tab === 'code' ? 'strokeWidth-2 stroke-darkPrimary' : 'strokeWidth-2 stroke-slate'}
                            width="25" height="16"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
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