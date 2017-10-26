/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type IframeProps = {
    html: string;
    style: string;
    background?: string;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Iframe extends React.Component<IframeProps, {}> {


    /*      PRIVATE PROPERTIES      */
    /********************************/
    private iframeHtml: HTMLIFrameElement;


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {    
        super();
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {   
        this._buildFrame();
    }


    /********************************/
    /*     COMPONENT DID UPDATE     */
    /********************************/
    componentDidUpdate() {
        this._buildFrame();
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Insert inline Stylesheet inside Document iframe
     * @method _inlineStylesheet
     * @example this._inlineStylesheet(css, iframe.document)
     * @private
     * @param {string} style - name param description
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {HTMLStyleElement}
     */
    private _inlineStylesheet(style: string, container: HTMLDocument): HTMLStyleElement {
        let css = container.createElement('style');
        css.setAttribute('type', 'text/css');
        css.innerHTML = style;
        return container.head.appendChild(css);
    }


    /**
     * @desc Insert inline Html inside Document iframe
     * @method _inlineHtml
     * @example this._inlineHtml(html, iframe.document)
     * @private
     * @param {string} style - name param description
     * @param {HTMLDocument} container - document content of the iframe
     * @returns {void}
     */
    private _inlineHtml (html: string, container: HTMLDocument): void {
        return container.body.insertAdjacentHTML('beforeend', html);
    }


    /**
     * @desc Build the inner document iframe
     * @method _buildFrame
     * @example this._buildFrame()
     * @private
     * @returns {void}
     */
    private _buildFrame(): void {

        // VARIABLES
        let iframe = this.iframeHtml.contentWindow.document;

        // Clean iframe
        iframe.head.innerHTML = '';
        iframe.body.innerHTML = '';

        if (iframe.readyState === 'complete') {

            // Append Html
            this._inlineHtml(this.props.html, iframe);
            
            // Append Style
            this._inlineStylesheet(this.props.style, iframe);

            // Assign Contextual Background
            iframe.body.style.backgroundColor = this.props.background || '#FFFFFF';

        } else {
            setTimeout(this._buildFrame, 0);
        }
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
    

        /*         MARKUP          */
        /***************************/
        return (
            // FIXME: No esta compilando los scripts externos, revisar por que.
            <div className="Iframe-wrapper">
                <iframe ref={(iframe) => { this.iframeHtml = iframe; }} 
                        frameBorder="0"
                        sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms" />
            </div>
        );

    }
}



/* Export */
export default Iframe;
