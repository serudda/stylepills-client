/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
// import * as hljs from 'highlight.js';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/display/autorefresh';

const logo = require('../../../../resources/images/Stylepills-main-short-logo.svg');


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {
    options: {
        html: string,
        css: string,
        scss: string
    };
}

/**
 * @desc Represents Panel Section Component
 * @class PanelSectionContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class PanelSectionContainer extends React.Component<IOwnProps, {}> {

    private codeHtml: any; 

    constructor() {
        super();
    }

    /*   COMPONENTDIDMOUNT    */
    /**************************/
    componentDidMount() {        
        // Init Highlight js
        // hljs.highlightBlock(this.codeHtml);
        // hljs.initHighlightingOnLoad();
    
    }


    /*         RENDER         */
    /**************************/
    render() {

        const codeMirrorOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: 'css',
            theme: 'material',
            autoRefresh: true
        };
        
    
        /*         MARKUP          */
        /***************************/
        return (
            <section className="PanelSection h-100">
                <div className="row no-gutters h-100" style={{minHeight: '100%'}}>
                    <div className="col h-100" style={{minHeight: '100%'}}>

                        {/* PANEL HEADER */}
                        <div className="row justify-content-between pt-3 pb-3 no-gutters">
                            <div className="col-auto mr-auto">
                                {/* Logo */}
                                <div className="ml-4">
                                    <a className="Header__logo m-0 link-reset" href="https://stylepills.co">
                                        <img src={logo} alt="Stylepills" width="28px"/>
                                        <span className="fontFamily-quicksand fontWeight-9">Stylepills</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-auto">
                                {/* Close Panel */}
                                <span className="color-silver mr-3">X</span>
                            </div>
                        </div>


                        {/* TABS */}
                        <div className="tabs fontSmoothing-reset">
                            <button className="tabs__button tabs__button--active">
                                <div className="inner">
                                    HTML
                                </div>
                            </button>
                            <button className="tabs__button">
                                <div className="inner">
                                    CSS
                                </div>
                            </button>
                            <button className="tabs__button">
                                <div className="inner">
                                    SASS
                                </div>
                            </button>
                        </div>


                        {/* SOURCE CODE */}
                        <div className="SourceCode position-relative">
                            <CodeMirror ref={(sourceCode: any) => { this.codeHtml = sourceCode; }}  value={this.props.options.css} options={codeMirrorOptions}/>
                        </div>


                        {/* BUTTONS OPTIONS */}
                        <footer className="actionsFooter sp-bg-silver">
                            <div className="otherActions"></div>
                            <div className="mainAction"></div>
                        </footer>

                    </div>
                </div>
            </section>
        );


    }

}


/* Export */
export default PanelSectionContainer;