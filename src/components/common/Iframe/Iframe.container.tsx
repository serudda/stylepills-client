/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as fs from 'fs';
import { pickBy, omit } from 'lodash';

import { functionsUtil } from '../../../core/utils/functionsUtil';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type IframeProps = {
    children: string;
    css: string;
    background?: string;
    stylesheets?: Array<string>;
    scripts?: Array<string>;
    title?: string;
    onLoad?: (DOMNode: any) => void;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Iframe extends React.Component<IframeProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: IframeProps) {    
        super(props);
        // LOG
        functionsUtil.consoleLog('IFrame container actived');
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {
        this._renderFrame();
    }


    /********************************/
    /*     COMPONENT DID UPDATE     */
    /********************************/
    componentDidUpdate() {
        this._renderFrame();
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Get IFrame Node on DOM
     * @method _getDOMNode
     * @example this._getDOMNode()
     * @private
     * @returns {void}
     */
    private _getDOMNode() {
        let DOMNode: any = findDOMNode(this);
        return (DOMNode.contentDocument || DOMNode.contentWindow.document);
    }


    /**
     * @desc To know if the Iframe component is ready
     * @method _isReady
     * @example this._isReady()
     * @private
     * @returns {Promise<boolean>} It's or not ready
     */
    private _isReady(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const DOMNode = this._getDOMNode();
      
            DOMNode.addEventListener('load', () => resolve(true));
      
            if (DOMNode.readyState === 'complete') {
              resolve(true);
            }
        });
    }


    /**
     * @desc Render the inner document iframe
     * @method _renderFrame
     * @example this._renderFrame()
     * @private
     * @returns {void}
     */
    private _renderFrame() {

        const {
            children, 
            stylesheets = [], 
            scripts = [],
            css,
            background} = this.props;

        return this._isReady().then(() => {
            
            // Get Iframe node on DOM and clear it
            const DOMNode = this._getDOMNode();
            DOMNode.head.innerHTML = '';
            DOMNode.body.innerHTML = '';

            // Hide scroll bars
            DOMNode.documentElement.style.overflow = 'hidden';
            
            // Assign Contextual Background
            DOMNode.body.style.backgroundColor = background || '#FFFFFF';

            // Append Html
            if (this.props.hasOwnProperty('children') && !this.props.hasOwnProperty('src')) {
                this._inlineHtml(children, DOMNode);
            }

            // Get Head Node from IFrame
            const head = DOMNode.getElementsByTagName('head')[0];

            // Append Stylesheets list in IFrame's Head tag
            if (this.props.hasOwnProperty('stylesheets')) {
                this._headStylesheets(stylesheets, head, DOMNode);
            }

            // Append Style
            if (css) {
                this._inlineStylesheet(css, DOMNode);
            }

            // Append Scripts list in IFrame's Head tag
            if (Boolean(scripts.length) && !head.querySelector(`script[of="${this.props.title}"]`)) {
                this._headScripts(scripts, DOMNode);
            }

            // If onLoad prop exist, launch it
            if (this.props.hasOwnProperty('onLoad')) {
                this.props.onLoad(DOMNode);
            }

        });
    }


    /**
     * @desc Insert Stylesheets list in Head Tag inside Document iframe
     * @method _headStylesheets
     * @example this._headStylesheets(stylesheets, head, container)
     * @private
     * @param {Array<string>} stylesheets - Stylesheets List
     * @param {any} head - Head tag inside Document Iframe
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {void}
     */
    private _headStylesheets(stylesheets: Array<string>, head: any, container: HTMLDocument) {
        stylesheets.forEach((url: string) => {
            if (!head.querySelector(`link[href="${url}"]`)) {
              const ref = container.createElement('link');
              ref.rel = 'stylesheet';
              ref.type = 'text/css';
              ref.href = url;
              head.appendChild(ref);
            }
        });
    }


    /**
     * @desc Insert inline Stylesheet inside Document iframe
     * @method _inlineStylesheet
     * @example this._inlineStylesheet(css, iframe.document)
     * @private
     * @param {string} style - name param description
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {void}
     */
    private _inlineStylesheet(style: string, container: HTMLDocument): void {
        let css = container.createElement('style');
        css.setAttribute('type', 'text/css');
        css.innerHTML = style;
        container.head.appendChild(css);
    }


    /**
     * @desc Insert Scripts list in Head Tag inside Document iframe
     * @method _headScripts
     * @example this._headScripts(scripts, container)
     * @private
     * @param {Arra<string>} scripts - scripts list
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {void}
     */
    private _headScripts(scripts: Array<string>, container: HTMLDocument) {

        const $script = fs.readFileSync('./node_modules/scriptjs/dist/script.min.js', 'utf8');
        const ref = container.createElement('script');
        ref.setAttribute('type', 'text/javascript');
        ref.setAttribute('of', this.props.title);
        ref.innerHTML = `${$script}; $script.order(${JSON.stringify(scripts)},'bundle')`;
        container.head.appendChild(ref);

    }


    /**
     * @desc Insert inline Html inside Document iframe
     * @method _inlineHtml
     * @example this._inlineHtml(html, iframe.document)
     * @private
     * @param {string} html - name param description
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {void}
     */
    private _inlineHtml (html: string, container: HTMLDocument): void {
        /* TODO: Esto fue extraido de la primera versión de este componente, siento 
        que este es más eficiente que la que estamos usando actualmente, investigar 
        cual es mejor para incrustar Html:
        container.body.insertAdjacentHTML('beforeend', html); */
        container.body.innerHTML = html;
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        let props = pickBy(omit(this.props,  ['stylesheets', 'scripts']));

        if (!props.src) {
            props.onLoad = this._renderFrame.bind(this);
        }

        /*         MARKUP          */
        /***************************/
        return (
            <iframe frameBorder="0"
                    sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms" 
                    {...props} /> 
        );

    }
}



/* Export */
export default Iframe;


/*
    Component built from 'react-sandbox-frame'
    reference: https://github.com/npm-dom/iframe/blob/master/index.js
*/