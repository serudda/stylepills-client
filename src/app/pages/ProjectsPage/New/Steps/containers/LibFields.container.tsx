/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../reducer/reducer.config';

import {
    changeLibsTabAction,
    changeLibsAction 
} from './../../../../../../actions/ui.action';

import { 
    Option as CodeTabMenuOption 
} from './../../../../../components/Tabs/CodeTabMenu/CodeTabMenu';

import { Lib as LibModel } from './../../../../../../models/lib/lib.model';

import LibFields from './../components/LibFields';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibFieldsContainerProps = {
    nextStep: Function,
    previousStep: Function
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: CodeTabMenuOption,
    libs: Array<LibModel>
    isAuthenticated: boolean
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
class LibFieldsContainer
extends React.Component<ChildProps<LibFieldsContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<LibFieldsContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 3 - LibFields actived');

        // Bind methods
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleAddLibClick = this.handleAddLibClick.bind(this);
        this.handlePrevClick =  this.handlePrevClick.bind(this);
        this.handleNextClick =  this.handleNextClick.bind(this);
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


    /**
     * @desc HandlePrevClick
     * @method handlePrevClick
     * @example this.handlePrevClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handlePrevClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._previousStep();
    }


    /**
     * @desc HandleNextClick
     * @method handleNextClick
     * @example this.handleNextClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleNextClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._nextStep();
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

        // let libsCopy = [].concat(libs); LEGACY
        let libsCopy = functionsUtil.copyArray(libs);

        libsCopy.unshift({
            type: tab,
            name,
            url
        });

        this.props.actions.ui.changeLibs(libsCopy);
        
    }


    /**
     * @desc Previous Step
     * @method _previousStep
     * @example this._previousStep()
     * @private
     * @returns {void}
     */
    private _previousStep() {
        this.props.previousStep();
    }


    /**
     * @desc Next Step
     * @method _nextStep
     * @example this._nextStep()
     * @private
     * @returns {void}
     */
    private _nextStep() {

        // Copy state
        let libs = [].concat(this.props.libs);

        this.props.nextStep({ libs });        
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const { isAuthenticated } = this.props;
        const { tab } = this.props;
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (!isAuthenticated) {
            return (
                <Redirect to="/explore"/>
            );
        }
        

        
        /*         MARKUP          */
        /***************************/
        return (
            <LibFields  currentTab={tab} 
                        onAddLibClick={this.handleAddLibClick}
                        onTabClick={this.handleTabClick}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { isAuthenticated } = state.auth;

    const {tabs, libsPanel} = state.ui;
    const {libsTab} = tabs;
    const {tab} = libsTab;

    const { libs } = libsPanel;

    return {
        tab,
        libs,
        isAuthenticated
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
const libFieldsContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    libFieldsContainerConnect
)(LibFieldsContainer);