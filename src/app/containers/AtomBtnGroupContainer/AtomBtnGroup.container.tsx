/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { 
    Option as CopyOption 
} from './../../../app/components/Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

import CopyToClipboardBtnContainer from './../../../app/containers/Buttons/CopyToClipboardBtn/CopyToClipboardBtn.container';

import ActiveEditModeBtnContainer from './../../../app/containers/Buttons/ActiveEditModeBtn/ActiveEditModeBtn.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomBtnGroupContainerProps = {
    atomId: number,
    atomName: string,
    atomHtml: string,
    atomCss: string,
    currentTab: string;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


 /***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomBtnGroupContainer 
extends React.Component<ChildProps<AtomBtnGroupContainerProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props:  AtomBtnGroupContainerProps & StateProps) {
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
export default AtomBtnGroupContainer;