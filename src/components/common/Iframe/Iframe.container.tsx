/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {
    html: string;
    style: string;
}


/**
 * @desc Represents Iframe Component
 * @class IframeContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class IframeContainer extends React.Component<IOwnProps, {}> {

    private iframeHtml: any;    

    _inlineStylesheet(text: any, container: any) {
        var style = container.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = text;
        return container.head.appendChild(style);
    }

    _inlineHtml (html: any, container: any) {
        return container.body.insertAdjacentHTML('beforeend', html);
    }

    _buildFrame() {
        let iframe = this.iframeHtml.contentWindow.document;

        // Clean iframe
        iframe.head.innerHTML = '';
        iframe.body.innerHTML = '';

        if (iframe.readyState === 'complete') {
            // Html Input
            this._inlineHtml(this.props.html, iframe);
            
            // Append HTML, style and script
            this._inlineStylesheet(this.props.style, iframe);
        } else {
            setTimeout(this._buildFrame, 0);
        }
    }

    componentDidMount() {
        this._buildFrame();
    }

    componentDidUpdate() {
        this._buildFrame();
    }


    /*         RENDER         */
    /**************************/
    render() {
    

        /*         MARKUP          */
        /***************************/
        return (
            <div className="Iframe-wrapper">
                {/* tslint:disable-next-line:jsx-self-close */}
                <iframe ref={(iframe) => { this.iframeHtml = iframe; }} 
                        frameBorder="0"
                        sandbox="allow-forms allow-popups allow-scripts allow-same-origin">
                </iframe>
            </div>
        );


    }
}



/* Export */
export default IframeContainer;
