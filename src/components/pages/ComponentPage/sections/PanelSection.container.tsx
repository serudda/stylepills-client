/*
TODO: Rehacer todo el sistema de Tabs, usando State, estudiar si es mejor
atraves de Redux o State locales.
*/

/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
// import * as hljs from 'highlight.js';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/xml/xml';
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
    currentTab?: number;
    options: {
        html: string,
        css: string,
        scss: string,
        download: string
    };
}

/**
 * @desc Represents Panel Section Component
 * @class PanelSectionContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class PanelSectionContainer extends React.Component<IOwnProps, any> {


    constructor() {
        super();
        this.state = {currentTab: 1};
    }


    _handleClick(tab: number) {
        this.setState({ currentTab: tab });
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


        /*       PROPERTIES       */
        /**************************/
        const { options: {html, css, scss, download} } = this.props;


        const hmtlOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: 'xml',
            theme: 'material',
            autoRefresh: true
        };

        const cssOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: 'css',
            theme: 'material',
            autoRefresh: true
        };

        const scssOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: 'sass',
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
                                    <a className="Header__logo m-0 link-reset" href="/">
                                        <img src={logo} alt="Stylepills" width="28px"/>
                                        <span className="fontFamily-quicksand fontWeight-9">Stylepills</span>
                                    </a>
                                </div>
                            </div>
                            {/*
                            <div className="col-auto">
                                <span className="color-silver mr-3">X</span>
                            </div> 
                            */}
                        </div>


                        {/* TABS */}
                        <div className="tabs fontSmoothing-reset">
                            <button className={this.state.currentTab === 1 ? 'tabs__button tabs__button--active' : 'tabs__button'}
                                    onClick={() => this._handleClick(1)}>
                                <div className="inner">
                                    HTML
                                </div>
                            </button>
                            <button className={this.state.currentTab === 2 ? 'tabs__button tabs__button--active' : 'tabs__button'}
                                    onClick={() => this._handleClick(2)}>
                                <div className="inner">
                                    CSS
                                </div>
                            </button>
                            <button className={this.state.currentTab === 3 ? 'tabs__button tabs__button--active' : 'tabs__button'}
                                    onClick={() => this._handleClick(3)}>
                                <div className="inner">
                                    SCSS
                                </div>
                            </button>
                        </div>


                        {/* SOURCE CODE */}
                        <div className="SourceCode position-relative">
                            <CodeMirror className={this.state.currentTab !== 1 ? 'd-none' : null}   
                                        value={html} options={hmtlOptions}/>
                            <CodeMirror className={this.state.currentTab !== 2 ? 'd-none' : null} 
                                        value={css} options={cssOptions}/>
                            <CodeMirror className={this.state.currentTab !== 3 ? 'd-none' : null} 
                                        value={scss} options={scssOptions}/>
                        </div>


                        {/* BUTTONS OPTIONS */}
                        <footer className="actionsFooter sp-bg-black">
                            {/* <div className="otherActions"></div> */}
                            <div className="mainAction">
                                <a href={download} 
                                    className="btn btn-primary btn-block fontSmoothing-reset cursor-pointer link-reset">
                                    Download Component
                                </a>
                            </div>
                        </footer>

                    </div>
                </div>
            </section>
        );


    }

}


/* Export */
export default PanelSectionContainer;