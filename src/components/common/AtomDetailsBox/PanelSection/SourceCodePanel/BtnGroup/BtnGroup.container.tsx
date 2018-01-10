/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { copySourceCodeAction } from './../../../../../../actions/ui.action';
import { requestEditAtomAction } from './../../../../../../actions/atom.action';

import CopyToClipboardBtn from './../../../../Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BtnGroupProps = {
    atomId: number,
    atomName: string,
    atomHtml: string,
    atomCss: string,
    currentTab: string;
};

/* Own States */
type LocalStates = {
    copied: boolean,
    html: string,
    css: string
};

/* Mapped State to Props */
type StateProps = {
    watchingChanges: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            copySourceCode: (type: string) => void;
        },
        atomState: {
            activeEditMode: (id: number, name: string) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class BtnGroupContainer 
extends React.Component<ChildProps<BtnGroupProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: BtnGroupProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            copied: false,
            html: props.atomHtml,
            css: props.atomCss
        };

        // Bind methods
        this._handleCopyClick = this._handleCopyClick.bind(this);
        this._handleEditClick = this._handleEditClick.bind(this);
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
        const { atomId, atomName } = this.props;

        // Launch active edit mode Action
        this.props.actions.atomState.activeEditMode(atomId, atomName);
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { currentTab } = this.props;
        const { watchingChanges } = this.props;
        const { html, css, copied } = this.state;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="BtnGroup sp-btnGroup zIndex-footer">

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
                    {currentTab === 'html' && <CopyToClipboardBtn text={html} copied={copied} onCopy={this._handleCopyClick} type="html"/>}
                    {currentTab === 'css' && <CopyToClipboardBtn text={css} copied={copied} onCopy={this._handleCopyClick} type="css"/>}
                </div>

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { watchingChanges } = state.atomState.edited;

    return {
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
                copySourceCode: (type) => dispatch(copySourceCodeAction(type))
            },
            atomState: {
                activeEditMode: (id, name) => dispatch(requestEditAtomAction(id, name))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const btnGroupConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    btnGroupConnect
)(BtnGroupContainer);