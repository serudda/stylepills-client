/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import { changeSourceCodeTabAction, changeSourceCodeAction } from './../../../../../../../../actions/ui.action';

import CodeTabMenu, { 
    Option as CodeTabMenuOption 
} from './../../../../../../../../app/components/Tabs/CodeTabMenu/CodeTabMenu';
import CopyBtnContainer from './CopyBtn/CopyBtn.container';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';
// TODO: Remover cuando no se necesite
// import 'codemirror/mode/sass/sass';
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/display/autorefresh';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceCodePanelProps = {
    html: string,
    css: string
};

/* Own States */
// TODO: Mirar si es posible remover los ?, no tiene sentido
type LocalStates = {
    html?: string,
    css?: string
};

/* Mapped State to Props */
type StateProps = {
    tab: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: string) => void;
            changeSourceCode: (codeType: string, codeProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceCodePanel 
extends React.Component<ChildProps<SourceCodePanelProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourceCodePanelProps & StateProps & DispatchProps) {
        super(props);

        const DEFAULT_HTML_CODE = '<!-- Put your HTML code here -->';
        const DEFAULT_CSS_CODE = '/* Put your CSS code here */';

        // Init local state
        this.state = { 
            html: props.html || DEFAULT_HTML_CODE,
            css: props.css || DEFAULT_CSS_CODE
        };

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
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


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleTabClick
     * @method _handleTabClick
     * @example this._handleTabClick()
     * @private
     * @param {string} tab - source code tab (e.g. 'html', 'css')
     * @param {React.FormEvent<{}>} e - Event
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
     * @param {string} tab - source code tab (e.g. 'html', 'css') 
     * @returns {void}
     */
    private _changeTab(tab: string) {
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
        this.setState({
            [type]: newCode
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

        // Code Mirror HTML default options
        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: false,
            mode: tab === 'html' ? 'xml' : 'css',
            theme: 'material',
            autoRefresh: true
        };

        // VARIABLES
        let options: Array<CodeTabMenuOption> = [
            CodeTabMenuOption.html,
            CodeTabMenuOption.css
        ]; 


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SourceCodePanel row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">
            
                {/* Source Code Tab Menu */}
                <CodeTabMenu options={options} 
                             isReversed={true}
                             tab={tab} 
                             onTabClick={this._handleTabClick}/>

                {/* Source Code Panel */}
                <div className="row no-gutters w-100 sp-bg-mirage">
                    <div className="col-12 position-relative">

                    {/* Copy Button */}
                    <CopyBtnContainer atomHtml={html} 
                                        atomCss={css}
                                        currentTab={tab} />

                        {/* Source Code */}
                        <div className="SourceCode position-relative">
                            {tab === 'html' && <CodeMirror value={html} 
                                                            options={codeMirrorOptions} 
                                                            onChange={this.handleOnChange}/>}
                            {tab === 'css' && <CodeMirror value={css} 
                                                            options={codeMirrorOptions} 
                                                            onChange={this.handleOnChange}/>}
                        </div>

                    </div>

                </div>

            </div>
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
const sourceCodePanelConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourceCodePanelConnect
)(SourceCodePanel);