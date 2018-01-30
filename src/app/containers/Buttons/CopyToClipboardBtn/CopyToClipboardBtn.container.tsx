/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { copySourceCodeAction } from './../../../../actions/ui.action';

import CopyToClipboardBtn, { 
    Option as CopyOption 
} from './../../../components/Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CopyToClipboardBtnContainerProps = {
    type: CopyOption,
    text: string
};

/* Own States */
type LocalStates = {
    copied: boolean
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            copySourceCode: (type: CopyOption) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class CopyToClipboardBtnContainer 
extends React.Component<ChildProps<CopyToClipboardBtnContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: CopyToClipboardBtnContainerProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            copied: false
        };

        // Bind methods
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
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleCopyClick = (type: CopyOption) => (e: any) => {
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
    private _copySourceCode(type: CopyOption) {

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


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { text, type } = this.props;
        const { copied } = this.state;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="CopyBtnContainer zIndex-footer">
                <CopyToClipboardBtn text={text} copied={copied} onCopy={this._handleCopyClick} type={type}/>
            </div>
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                copySourceCode: (type) => dispatch(copySourceCodeAction(type))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const copyBtnContainerConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    copyBtnContainerConnect
)(CopyToClipboardBtnContainer);