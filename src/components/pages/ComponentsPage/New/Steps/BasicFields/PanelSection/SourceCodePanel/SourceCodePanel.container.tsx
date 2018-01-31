/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import { 
    changeSourceCodeTabAction, 
    changeSourceCodeAction 
} from './../../../../../../../../actions/ui.action';

import { 
    Option as CodeTabMenuOption 
} from './../../../../../../../../app/components/Tabs/CodeTabMenu/CodeTabMenu';


import SourceCodePanel, { 
    FloatMenuOption 
} from './../../../../../../../../app/components/SourceCodePanel/SourceCodePanel';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceCodePanelContainerProps = {
    html: string,
    css: string
};

/* Own States */
type LocalStates = {
    html: string,
    css: string
};

/* Mapped State to Props */
type StateProps = {
    tab: CodeTabMenuOption;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: CodeTabMenuOption) => void;
            changeSourceCode: (codeType: string, codeProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceCodePanelContainer 
extends React.Component<ChildProps<SourceCodePanelContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourceCodePanelContainerProps & StateProps & DispatchProps) {
        super(props);

        const DEFAULT_HTML_CODE = '<!-- Put your HTML code here -->';
        const DEFAULT_CSS_CODE = '/* Put your CSS code here */';

        // LOG
        functionsUtil.consoleLog('ComponentsPage/New/Steps/BasicFields/PanelSection/SourceCodePanel container actived');

        // Init local state
        this.state = { 
            html: props.html || DEFAULT_HTML_CODE,
            css: props.css || DEFAULT_CSS_CODE
        };

        // Bind methods
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleOnChange
     * @method handleOnChange
     * @example this.handleOnChange()
     * @public
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @param {string} newCode - new source code
     * @param {any} e - Event
     * @returns {void}
     */
    handleOnChange (newCode: string) {
        this._updateCode(this.props.tab, newCode);
    }


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
     * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css') 
     * @returns {void}
     */
    private _changeTab(tab: CodeTabMenuOption) {
        this.props.actions.ui.changeSourceCodeTab(tab);
    }


    /**
     * @desc Update Code
     * @method _updateCode
     * @example this._updateCode()
     * @private
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @param {string} newCode - new source code
     * @returns {void}
     */
    private _updateCode(type: string, newCode: string) {

        // Update local state
        this.setState((previousState) => {
            return {
                ...previousState,
                [type]: newCode
            };
        }, () => {
            // Launch Change Source Code UI Action
            this.props.actions.ui.changeSourceCode(type, {code: newCode});
        });
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { tab } = this.props;
        const { html, css } = this.state;

        // VARIABLES
        let options: Array<FloatMenuOption> = [
             FloatMenuOption.copy
        ];


        /*         MARKUP          */
        /***************************/
        return (
            <SourceCodePanel currentTab={tab} 
                             html={html} 
                             css={css}
                             floatMenuBtns={options}
                             onTabClick={this.handleTabClick}
                             onCodeChange={this.handleOnChange}/>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { tabs } = state.ui;
    const { sourceCodeTab } = tabs;
    const { tab } = sourceCodeTab;

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
                changeSourceCodeTab: (tab) => dispatch(changeSourceCodeTabAction(tab)),
                changeSourceCode: (codeType, codeProps) => dispatch(changeSourceCodeAction(codeType, codeProps)),
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourceCodePanelContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourceCodePanelContainerConnect
)(SourceCodePanelContainer);