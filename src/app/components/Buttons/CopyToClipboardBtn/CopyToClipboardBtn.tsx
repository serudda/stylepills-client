/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible options */
export enum Option {
    html = 'html',
    css = 'css',
    text = 'text'
}

/* Own Props */
type CopyToClipboardBtnProps = {
    type?: Option;
    text: string;
    copied: boolean;
    onCopy: (type: Option) => any;
};


/**
 * @desc Represent Copy to clipboard button
 * @function CopyToClipboardBtn
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class CopyToClipboardBtn extends React.Component<CopyToClipboardBtnProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: CopyToClipboardBtnProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            type = Option.text,
            text,
            copied,
            onCopy
        } = this.props;

        
        /*         MARKUP          */
        /***************************/
        return (
            <Popup
                trigger={
                    <CopyToClipboard text={text} onCopy={onCopy(type)}>
                        <button className="sp-btn sp-btn--neutral sp-btn--md">
                            Copy
                        </button>
                    </CopyToClipboard>}
                position="top right"
                size="small">
                {copied ? 
                <span className="color-secondary fontWeight-9">COPIED!</span> : 
                <span>Copy <strong className="color-darkSecondary textTransform-uppercase">{type}</strong> to clipboard</span>}
            </Popup>
        );

    }
    
}


/* Export */
export default CopyToClipboardBtn;