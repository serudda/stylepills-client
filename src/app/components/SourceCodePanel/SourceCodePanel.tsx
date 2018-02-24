/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { CodeSupportedOption } from './../../../core/interfaces/interfaces';

import SourceCodeTabMenuContainer from './../../containers/Tabs/SourceCodeTabMenu.container';

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
    currentTab: CodeSupportedOption,
    id?: number,
    name?: string,
    html: string,
    css: string,
    message?: BannerAlertProps,
    showMessage?: boolean,
    floatMenuBtns?: Array<FloatMenuOption>;
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
            onCodeChange
        } = this.props;

        // Code Mirror HTML default options
        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: false,
            mode: currentTab === CodeSupportedOption.html ? 'xml' : CodeSupportedOption.css,
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
        // TODO: REMOVER ESTO DE AQUI, HACERLO DINAMICO DEPENDIENDO DE QUE PREPROCESADOR SE VA A USAR, ETC
        let options: Array<CodeSupportedOption> = [
            CodeSupportedOption.html,
            CodeSupportedOption.css
        ];


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SourceCodePanel row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">


                {/* Source Code Tab Menu */}
                <SourceCodeTabMenuContainer options={options} isReversed={true}/>


                {/* Source Code Panel */}
                <div className="row no-gutters w-100 sp-bg-mirage">
                    <div className="col-12 position-relative">


                        {/* Float Menu Buttons */}
                        <div className="sp-btnGroup zIndex-footer">
                            {floatMenuBtns.map((option: string, index: number) => (
                                <div key={index} className="sp-btnGroup__container sp-btnGroup__container--one-child">
                                    {floatMenuOptions[option]()}
                                </div> 
                            ))}
                        </div>                    

                        {/* Source Code */}
                        <div className="SourceCode position-relative">

                            {currentTab === CodeSupportedOption.html && 
                                <CodeMirror value={html} 
                                            options={codeMirrorOptions} 
                                            onChange={onCodeChange}/>}

                            {currentTab === CodeSupportedOption.css && 
                                <CodeMirror value={css} 
                                            options={codeMirrorOptions} 
                                            onChange={onCodeChange}/>}

                        </div>

                    </div>
                    
                    {/* Bottom Message */}
                    { showMessage && !!message &&
                        <div className="col-12 position-relative">
                            {/* NOTE: 1 */}
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


/* 
(1) Uso BannerAlert directamente (en vez de AlertManager) ya que en este caso este Banner no es considerado un Alert,
Ademas no deberia estar agregando por todas partes el: AlertManager container, ya que si llegara a agregar 2 veces este
componente, se pifiaria su comportamiento. Este AlertManager container deberia estar en un solo lugar global solo para
gestionar los Alertas globales, como por ejemplo los modals.
*/