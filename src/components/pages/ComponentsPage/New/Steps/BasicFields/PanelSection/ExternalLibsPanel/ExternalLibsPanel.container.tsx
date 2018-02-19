/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import {
    changeLibsTabAction,
} from './../../../../../../../../actions/ui.action';

import { 
    Option as CodeTabMenuOption 
} from './../../../../../../../../app/components/Tabs/CodeTabMenu/CodeTabMenu';

import ExternalLibsPanel from './../../../../../../../../app/components/ExternalLibsPanel/ExternalLibsPanel';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExternalLibsPanelContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: CodeTabMenuOption
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeLibsTab: (tab: CodeTabMenuOption) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExternalLibsPanelContainer 
extends React.Component<ChildProps<ExternalLibsPanelContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ExternalLibsPanelContainerProps & StateProps & DispatchProps) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ComponentsPage/New/Steps/BasicFields/PanelSection/ExternalLibsPanel container actived');

        // Bind methods
        this.handleTabClick = this.handleTabClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/

    /**
     * @desc HandleTabClick
     * @method handleTabClick
     * @example this.handleTabClick()
     * @public
     * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css')
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleTabClick = (tab: CodeTabMenuOption) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this._changeTab(tab);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private
     * @param {string} tab - type code tab (e.g. 'js', 'css') 
     * @returns {void}
     */
    private _changeTab(tab: CodeTabMenuOption) {
        this.props.actions.ui.changeLibsTab(tab);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { tab } = this.props;

        /*         MARKUP          */
        /***************************/
        return (
            <ExternalLibsPanel currentTab={tab} 
                               onTabClick={this.handleTabClick} />
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const {tabs} = state.ui;
    const {libsTab} = tabs;
    const {tab} = libsTab;

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
                changeLibsTab: (tab) => dispatch(changeLibsTabAction(tab))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const externalLibsPanelContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    externalLibsPanelContainerConnect
)(ExternalLibsPanelContainer);