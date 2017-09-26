/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as hljs from 'highlight.js';

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

    /*   COMPONENTDIDMOUNT    */
    /**************************/
    componentDidMount() {        
        // Init Highlight js
        hljs.initHighlightingOnLoad();
    }


    /*         RENDER         */
    /**************************/
    render() {
        
    
        /*         MARKUP          */
        /***************************/
        return (
            <section className="PanelSection">
                <div className="row">
                    <div className="col">

                        {/* PANEL HEADER */}
                        <div className="row justify-content-between pt-3 pb-3">
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
                        <div className="SourceCode">
                            <pre className="fontSize-sm fontSmoothing-reset bg-darkSnow">
                                <code className="scss borderRadius-sm">
                                    Texto
                                </code>
                            </pre>
                        </div>

                    </div>
                </div>
            </section>
        );


    }

}


/* Export */
export default PanelSectionContainer;