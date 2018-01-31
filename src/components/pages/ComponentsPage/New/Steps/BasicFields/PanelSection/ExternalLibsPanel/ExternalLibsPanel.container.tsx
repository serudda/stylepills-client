/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import { Lib as LibModel } from './../../../../../../../../models/lib/lib.model';

import {
    changeLibsTabAction, 
    changeLibsAction 
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
    tab: CodeTabMenuOption,
    libs: Array<LibModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeLibsTab: (tab: CodeTabMenuOption) => void;
            changeLibs: (libs: Array<LibModel>) => void;
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
        this.handleAddLibClick = this.handleAddLibClick.bind(this);
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


    /**
     * @desc HandleAddLibClick
     * @method handleAddLibClick
     * @example this.handleAddLibClick()
     * @public
     * @param {LibModel} newLib - new lib to add on the libs array
     * @returns {void}
     * NOTE: Uso esta forma en vez de () => () => {...} por que no funciona para cuando
     * paso este method por props, y es llamada en los child de la siguiente manera:
     * this.props.onAddLibClick(name, url);
     */
    handleAddLibClick(name: string, url: string) {
        this._addLib(name, url);
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


    /**
     * @desc Add Lib
     * @method _addLib
     * @example this._addLib()
     * @private 
     * @param {LibModel} newLib - new lib to add in the list
     * @returns {void}
     */
    private _addLib(name: string, url: string) {

        const { tab, libs } = this.props;

        let libsCopy = [].concat(libs);

        libsCopy.unshift({
            type: tab,
            name,
            url
        });

        this.props.actions.ui.changeLibs(libsCopy);
        
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
                               onAddLibClick={this.handleAddLibClick}
                               onTabClick={this.handleTabClick} />
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const {tabs, libsPanel} = state.ui;
    const {libsTab} = tabs;
    const {tab} = libsTab;

    const { libs } = libsPanel;

    return {
        tab,
        libs
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeLibsTab: (tab) => dispatch(changeLibsTabAction(tab)),
                changeLibs: (libs) => dispatch(changeLibsAction(libs))
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