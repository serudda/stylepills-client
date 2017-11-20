/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Iframe from '../../Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreviewSectionProps = {
    html: string,
    style: string,
    contextualBg: string
};

/* Own States */
type LocalStates = {};



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreviewSection 
extends React.Component<PreviewSectionProps, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { html, style, contextualBg } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection boxShadow-raised sp-rounded-top-md sp-bg-white border-6 borderColor-white">
                <div className="PreviewSection__content borderRadius-xs">    
                    <Iframe html={html} style={style} background={contextualBg} />
                </div>
            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default PreviewSection;