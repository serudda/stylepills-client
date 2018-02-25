/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { CodeSupportedOption } from './../../../core/interfaces/interfaces';
import * as appConfig from './../../../core/constants/app.constants';

import SourceCodeTabMenuContainer from './../../containers/Tabs/SourceCodeTabMenu.container';
import CopyToClipboardBtnContainer from './../../containers/Buttons/CopyToClipboardBtn/CopyToClipboardBtn.container';
import ActiveEditModeBtnContainer from './../../containers/Buttons/ActiveEditModeBtn/ActiveEditModeBtn.container';
import CodeMirrorContainer from './../../containers/CodeMirrorContainer/CodeMirror.container';

import BannerAlert, { 
    BannerAlertProps 
} from './../Alerts/BannerAlert/BannerAlert';

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
    message?: BannerAlertProps,
    showMessage?: boolean,
    floatMenuBtns?: Array<FloatMenuOption>;
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
            currentTab = appConfig.SOURCE_CODE_DEFAULT_OPTION_TAB,
            id,
            message,
            showMessage = false,
            floatMenuBtns = [],
        } = this.props;

        // Float Menu Options
        const floatMenuOptions: FloatMenuBtns = {
            edit: () => {
                return (
                    <ActiveEditModeBtnContainer id={id} name={name} />
                );
            },
            copy: () => {
                return (
                    <CopyToClipboardBtnContainer text={this.props[currentTab]} type={CodeSupportedOption[currentTab]}/>
                );
            }          
        };


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SourceCodePanel row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">


                {/* Source Code Tab Menu */}
                <SourceCodeTabMenuContainer isReversed={true}/>


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
                            <CodeMirrorContainer/>
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