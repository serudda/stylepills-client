/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../reducer/reducer.config';

import { changeSourceCodeTabAction, copySourceCodeAction } from './../../../../../actions/ui.action';
import { changedAtomDetailsAction } from './../../../../../actions/atom.action';

import { Popup } from 'semantic-ui-react';
import * as CopyToClipboard from 'react-copy-to-clipboard';
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
    atomId: number,
    name: string,
    html: string,
    css: string
};

/* Own States */
type LocalStates = {
    copied?: boolean,
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
            copySourceCode: (type: string) => void;
        },
        atomState: {
            changedAtomDetails: (id: number, name: string, codeType: string, codeProps: any) => void;
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

        // Init local state
        this.state = {
            copied: false,
            html: props.html,
            css: props.css
        };

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this._handleCopyClick = this._handleCopyClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleOnChange
     * @method _handleOnChange
     * @example this._handleOnChange()
     * @private
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
     * @desc HandleCopyClick
     * @method _handleCopyClick
     * @example this._handleClick()
     * @private
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @param {any} e - Event
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
     * @desc Copy Source Code
     * @method _copySourceCode
     * @example this._copySourceCode()
     * @private
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @returns {void}
     */
    private _copySourceCode(type: string) {

        const TIMEOUT_COPIED_MESSAGE = 1000;
        
        // Show COPIED! message
        this.setState({
            copied: true
        });

        // Launch Copy Source Action
        this.props.actions.ui.copySourceCode(type);

        // Hide COPIED! message after 'TIMEOUT_COPIED_MESSAGE' time
        setTimeout(() => {
            this.setState({ copied: false });
        }, TIMEOUT_COPIED_MESSAGE);

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
        // Destructuring props
        const { atomId, name } = this.props;
        
        // Update local state
        this.setState({
            [type]: newCode
        });

        // Launch Atom details changed Action
        this.props.actions.atomState.changedAtomDetails(atomId, name, type, {code: newCode});
        
    }

    /**
     * @desc Get CopyToClipboard Btn
     * @method _getCopyToClipboardBtn
     * @example this._getCopyToClipboardBtn()
     * @private 
     * @param {string} code - source code block
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @returns {JSX.Element} <Popup />
     */
    private _getCopyToClipboardBtn(code: string, type: string): JSX.Element {
        return (
            <Popup
            trigger={
                <CopyToClipboard text={code} onCopy={this._handleCopyClick(type)}>
                    <button className="sp-btn sp-btn--secondary sp-btn--md">
                        Copy
                    </button>
                </CopyToClipboard>}
            position="top right"
            size="small">
                {this.state.copied ? 
                <span className="color-secondary fontWeight-9">COPIED!</span> : 
                <span>Copy <strong className="color-darkSecondary textTransform-uppercase">{type}</strong> to clipboard</span>}
            </Popup>
        );
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
            // readOnly: 'on',
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
                        {/* TODO: Creo que no es necesario hacer esto dos veces solo con enviar como parametro: type: html, o type: css, ya con eso discrimino de que tipo es */}
                        <div className="copyBtnContainer zIndex-footer">
                            {tab === 'html' && this._getCopyToClipboardBtn(html, 'html')}

                            {tab === 'css' && this._getCopyToClipboardBtn(css, 'css')}
                        </div>

                        {/* Source Code */}
                        <div className="SourceCode position-relative">
                            {tab === 'html' && <CodeMirror value={this.state.html} options={codeMirrorOptions} onChange={this.handleOnChange}/>}
                            {tab === 'css' && <CodeMirror value={this.state.css} options={codeMirrorOptions} onChange={this.handleOnChange}/>}
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
            },
            atomState: {
                changedAtomDetails: (id, name, codeType, codeProps) => dispatch(changedAtomDetailsAction(id, name, codeType, codeProps))
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