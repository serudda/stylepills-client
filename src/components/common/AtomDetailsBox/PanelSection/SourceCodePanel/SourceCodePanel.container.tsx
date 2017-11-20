/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../reducer/reducer.config';

import { changeSourceCodeTabAction, copySourceCodeAction } from './../../../../../actions/ui.action';

import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';
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
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: string) => void;
            copySourceCode: (type: string) => void;
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
    constructor() {
        super();

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this._handleCopyClick = this._handleCopyClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleCopyClick
     * @method _handleCopyClick
     * @example this._handleClick()
     * @private 
     * @returns {void}
     */
    private _handleCopyClick = (type: string) => (e: any) => { 
        this._copySourceCode(type);
    }


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
        this.props.actions.ui.changeSourceCodeTab(tab);
    }

    /**
     * @desc Copy Source Code
     * @method _copySourceCode
     * @example this._copySourceCode()
     * @private 
     * @returns {void}
     */
    private _copySourceCode(type: string) {
        this.props.actions.ui.copySourceCode(type);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { html, css } = this.props;
        const { tab } = this.props;

        // Html Tab Btn Classes
        const htmlTabBtnClasses = classNames({
            'sp-tabMenu__button': true, 
            'sp-tabMenu__button--active': tab === 'html'
        });

        // Css Tab Btn Classes
        const cssTabBtnClasses = classNames({
            'sp-tabMenu__button': true, 
            'sp-tabMenu__button--active': tab === 'css'
        });

        // Code Mirror HTML default options
        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: tab === 'html' ? 'xml' : 'css',
            theme: 'material',
            autoRefresh: true
        };


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SourceCodePanel row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">
            
                {/* Source Code Tab Menu TODO: Remover estos style inline */}
                <div className="row no-gutters w-100" style={{backgroundColor: '#141619', borderTop: '1px solid #000000'}}>
                    <div className="col">

                        <div className="sp-tabMenu sp-tabMenu--is-reversed fontSmoothing-reset">
                            <button className={htmlTabBtnClasses}
                                    onClick={this._handleTabClick('html')}>
                                <div className="inner">
                                    HTML
                                </div>
                            </button>
                            <button className={cssTabBtnClasses}
                                    onClick={this._handleTabClick('css')}>
                                <div className="inner">
                                    CSS
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Source Code Panel */}
                <div className="row no-gutters w-100 sp-bg-mirage">
                    <div className="col position-relative">

                        {/* Copy Source Code Button */}
                        <div className="copyBtnContainer zIndex-footer">

                            {tab === 'html' && <CopyToClipboard text={html} onCopy={this._handleCopyClick('html')}>
                                <button className="sp-btn sp-btn--secondary sp-btn--md">
                                    Copy
                                </button>
                            </CopyToClipboard>}

                            {tab === 'css' && <CopyToClipboard text={css} onCopy={this._handleCopyClick('css')}>
                                <button className="sp-btn sp-btn--secondary sp-btn--md">
                                    Copy
                                </button>
                            </CopyToClipboard>}
                        </div>

                        {/* Source Code */}
                        <div className="SourceCode position-relative">
                            {tab === 'html' && <CodeMirror value={html} options={codeMirrorOptions}/>}
                            {tab === 'css' && <CodeMirror value={css} options={codeMirrorOptions}/>}
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
                copySourceCode: (type) => dispatch(copySourceCodeAction(type)),
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