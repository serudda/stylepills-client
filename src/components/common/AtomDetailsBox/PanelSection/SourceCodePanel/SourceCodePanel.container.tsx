/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import * as CopyToClipboard from 'react-copy-to-clipboard';

import { functionsUtil } from '../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';

import { changeSourceCodeTabAction, copySourceCodeAction } from './../../../../../actions/ui.action';
import { changedAtomDetailsAction, requestEditAtomAction } from './../../../../../actions/atom.action';

import { Popup } from 'semantic-ui-react';
import TabMenu from './../../../SourceCodePanel/TabMenu/TabMenu';
import Icon from './../../../Icon/Icon';
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
// TODO: Mirar si es posible remover los ?, no tiene sentido
type LocalStates = {
    copied?: boolean,
    html?: string,
    css?: string,
    codeMirror?: {
        readOnly: boolean
    }
};

/* Mapped State to Props */
type StateProps = {
    tab: string;
    watchingChanges: boolean;
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
            activeEditMode: (id: number, name: string) => void;
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

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox -> PanelSection -> SourceCodePanel container actived');

        // Init local state
        this.state = {
            copied: false,
            html: props.html,
            css: props.css,
            codeMirror: {
                readOnly: true
            }
        };

        // Bind methods
        this._handleTabClick = this._handleTabClick.bind(this);
        this._handleCopyClick = this._handleCopyClick.bind(this);
        this._handleEditClick = this._handleEditClick.bind(this);
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
    

    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: SourceCodePanelProps & StateProps) {   

        if (this.props.watchingChanges !== nextProps.watchingChanges &&
            nextProps.watchingChanges) {
            
            // Active Edit Mode after launch user's action
            this.setState({
                codeMirror: {
                    readOnly: false
                }
            });

        }
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleEditClick
     * @method _handleEditClick
     * @example this._handleEditClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleEditClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._activeEditMode();
    }


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
     * @desc Active Edit Mode
     * @method _activeEditMode
     * @example this._activeEditMode()
     * @private
     * @returns {void}
     */
    private _activeEditMode() {
        // Destructuring props
        const { atomId, name } = this.props;

        // Launch active edit mode Action
        this.props.actions.atomState.activeEditMode(atomId, name);
        
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
                    <button className="sp-btn sp-btn--neutral sp-btn--md">
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
        const { tab } = this.props;
        const { watchingChanges } = this.props;

        // Code Mirror HTML default options
        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: this.state.codeMirror.readOnly,
            mode: tab === 'html' ? 'xml' : 'css',
            theme: 'material',
            autoRefresh: true
        };


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SourceCodePanel row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">
            
                {/* Source Code Tab Menu */}
                <TabMenu tab={tab} onTabClick={this._handleTabClick}/>

                {/* Source Code Panel */}
                <div className="row no-gutters w-100 sp-bg-mirage">
                    <div className="col-12 position-relative">

                        {/* Button Group */}
                        <div className="sp-btnGroup zIndex-footer">
                            {/* Edit Source Code Button */}
                            <div className="sp-btnGroup__container">
                                <button className="sp-btn sp-btn--secondary sp-btn--md"
                                        onClick={this._handleEditClick}
                                        disabled={watchingChanges}>
                                    {watchingChanges ? 'Edit: ON' : 'Edit'}
                                </button>
                            </div> 
                            {/* Copy Source Code Button */}
                            <div className="sp-btnGroup__container">
                                {tab === 'html' && this._getCopyToClipboardBtn(this.state.html, 'html')}

                                {tab === 'css' && this._getCopyToClipboardBtn(this.state.css, 'css')}
                            </div>
                        </div>

                        {/* Source Code */}
                        <div className="SourceCode position-relative">
                            {tab === 'html' && <CodeMirror value={this.state.html} options={codeMirrorOptions} onChange={this.handleOnChange}/>}
                            {tab === 'css' && <CodeMirror value={this.state.css} options={codeMirrorOptions} onChange={this.handleOnChange}/>}
                        </div>

                    </div>

                    <div className="col-12 position-relative">
                        {/* Bottom Message */}
                        { watchingChanges && 
                            <div className="bg-info w-100 p-3 px-4 d-flex align-items-center">
                                {/*<Icon icon="alert" iconClass="strokeWidth-2 stroke-white mr-2" width="22" height="22"/>*/}
                                <span className="fontSize-md color-white fontWeight-9">
                                    You can now edit the code live. To keep your changes, duplicate the component by pressing the button:
                                </span>
                                <Icon icon="duplicate" iconClass="strokeWidth-2 stroke-white ml-3" width="22" height="22"/>
                            </div>
                        }
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
    const { watchingChanges } = state.atomState.edited;

    return {
        tab,
        watchingChanges
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
                changedAtomDetails: (id, name, codeType, codeProps) => dispatch(changedAtomDetailsAction(id, name, codeType, codeProps)),
                activeEditMode: (id, name) => dispatch(requestEditAtomAction(id, name))
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