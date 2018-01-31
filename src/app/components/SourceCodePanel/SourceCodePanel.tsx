/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import CodeTabMenu, { 
    Option as CodeTabMenuOption 
} from './../Tabs/CodeTabMenu/CodeTabMenu';

import {
    Option as CopyOption
} from './../Buttons/CopyToClipboardBtn/CopyToClipboardBtn';

import CopyToClipboardBtnContainer from './../../containers/Buttons/CopyToClipboardBtn/CopyToClipboardBtn.container';
import ActiveEditModeBtnContainer from './../../containers/Buttons/ActiveEditModeBtn/ActiveEditModeBtn.container';

import BannerAlert, { 
    BannerAlertProps 
} from './../Alerts/BannerAlert/BannerAlert';

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

/* Possible float menu buttons Options */
interface FloatMenuBtns {
    edit: () => JSX.Element;
    copy: () => JSX.Element;
}

/* Possible float menu options */
export enum FloatMenuOption {
    edit = 'edit',
    copy = 'copy'
}

/* Own Props */
type SourceCodePanelProps = {
    currentTab: CodeTabMenuOption,
    id?: number,
    name?: string,
    html: string,
    css: string,
    message?: BannerAlertProps,
    showMessage?: boolean,
    floatMenuBtns?: Array<FloatMenuOption>;
    onTabClick: (tab: CodeTabMenuOption) => void;
    onCodeChange: (newCode: string) => void;
};


/**
 * @desc Represent Source Code Panel
 * @function SourceCodePanel
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class SourceCodePanel extends React.Component<SourceCodePanelProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourceCodePanelProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            currentTab,
            id,
            html, 
            css,
            message,
            showMessage = false,
            floatMenuBtns = [],
            onTabClick,
            onCodeChange
        } = this.props;

        // Code Mirror HTML default options
        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: false,
            mode: currentTab === CodeTabMenuOption.html ? 'xml' : CodeTabMenuOption.css,
            theme: 'material',
            autoRefresh: true
        };

        // Float Menu Options
        const floatMenuOptions: FloatMenuBtns = {
            edit: () => {
                return (
                    <ActiveEditModeBtnContainer id={id} name={name} />
                );
            },
            copy: () => {
                return (
                    <CopyToClipboardBtnContainer text={this.props[currentTab]} type={CopyOption[currentTab]}/>
                );
            }          
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
                            tab={currentTab} 
                            onTabClick={onTabClick}/>


                {/* Source Code Panel */}
                <div className="row no-gutters w-100 sp-bg-mirage">
                    <div className="col-12 position-relative">


                        {/* Float Menu Buttons */}
                        <div className="sp-btnGroup zIndex-footer">
                            {floatMenuBtns.map((option: string, index: number) => (
                                <div key={index} className="sp-btnGroup__container">
                                    {floatMenuOptions[option]()}
                                </div> 
                            ))}
                        </div>                    

                        {/* Source Code */}
                        <div className="SourceCode position-relative">

                            {currentTab === CodeTabMenuOption.html && 
                                <CodeMirror value={html} 
                                            options={codeMirrorOptions} 
                                            onChange={onCodeChange}/>}

                            {currentTab === CodeTabMenuOption.css && 
                                <CodeMirror value={css} 
                                            options={codeMirrorOptions} 
                                            onChange={onCodeChange}/>}

                        </div>

                    </div>
                    
                    {/* Bottom Message */}
                    { showMessage && message &&
                        <div className="col-12 position-relative">
                            <BannerAlert type={message.type} 
                                        text={message.text}
                                        className={message.className}/>
                        </div>
                    }

                </div>

            </div>
        );


    }
    
}


/* Export */
export default SourceCodePanel;