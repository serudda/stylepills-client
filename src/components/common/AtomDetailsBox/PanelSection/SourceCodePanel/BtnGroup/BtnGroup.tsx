/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { 
    Option as CopyOption 
} from './../../../../../../app/components/Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

import CopyToClipboardBtnContainer from './../../../../../../app/containers/Buttons/CopyToClipboardBtn/CopyToClipboardBtn.container';

import ActiveEditModeBtnContainer from './../../../../../../app/containers/Buttons/ActiveEditModeBtn/ActiveEditModeBtn.container';

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


/**
 * @desc Represent Button Group on SourceCodePanel (AtomDetailsBox)
 * @function BtnGroup
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class BtnGroup extends React.Component<BtnGroupProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: BtnGroupProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { 
            currentTab, 
            atomId, 
            atomName, 
            atomHtml, 
            atomCss 
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="BtnGroup sp-btnGroup zIndex-footer">

                {/* Edit Source Code Button */}
                <div className="sp-btnGroup__container">
                    <ActiveEditModeBtnContainer id={atomId} 
                                                name={atomName} />
                </div> 

                {/* Copy Source Code Button */}
                <div className="sp-btnGroup__container">
                    {/* Copy Button */}
                    {currentTab === CopyOption.html &&
                        <CopyToClipboardBtnContainer text={atomHtml} 
                                                     type={CopyOption.html}/>
                    }

                    {currentTab === CopyOption.css &&
                        <CopyToClipboardBtnContainer text={atomCss} 
                                                     type={CopyOption.css}/>
                    }
                </div>

            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default BtnGroup;