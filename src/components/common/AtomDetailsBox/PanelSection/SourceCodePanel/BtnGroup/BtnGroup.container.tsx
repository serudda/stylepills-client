/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { requestEditAtomAction } from './../../../../../../actions/atom.action';

import { 
    Option as CopyOption 
} from './../../../../../../app/components/Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

import CopyToClipboardBtnContainer from './../../../../../../app/containers/Buttons/CopyToClipboardBtn/CopyToClipboardBtn.container';

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
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    watchingChanges: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
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

        // Bind methods
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
        const { currentTab, atomHtml, atomCss } = this.props;
        const { watchingChanges } = this.props;


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
                    {/* Copy Button */}
                    {currentTab === CopyOption.html &&
                        <CopyToClipboardBtnContainer text={atomHtml} type={CopyOption.html}/>
                    }

                    {currentTab === CopyOption.css &&
                        <CopyToClipboardBtnContainer text={atomCss} type={CopyOption.css}/>
                    }
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