/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ComponentBox from '../../../common/ComponentBox/ComponentBox';
import { UiComponent } from '../../../../models/uiComponent/uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {
    data: UiComponent;
}

/**
 * @desc Represents Preview Section Component
 * @class PreviewSectionContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class PreviewSectionContainer extends React.Component<IOwnProps, {}> {

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


        /*       PROPERTIES       */
        /**************************/
        const { data } = this.props;
        
    
        /*         MARKUP          */
        /***************************/
        return (
            <section className="PreviewSection h-100 pr-1 pl-1 pr-sm-5 pl-sm-5">

                {/* HEADER */}
                <div className="row justify-content-between pt-3 pb-3 no-gutters">
                    <div className="col-auto ml-auto">
                        {/* Header Menu */}
                        <div className="HeaderMenu d-lg-flex justify-content-between fontSmoothing-reset pr-4">
                            <div className="d-lg-flex">
                                <span className="d-block d-lg-inline-block">
                                    <div className="HeaderNavlink px-0 py-2 m-0 float-right">
                                    
                                        <a className="sp-link sp-link--box sp-link--box--secondary fontSize-sm fontWeight-9 mr-3" 
                                            href="https://stylepill.carrd.co/" 
                                            target="_blank">
                                            Open
                                        </a>
            
                                        <a className="sp-link sp-link--box sp-link--box--black fontSize-sm fontWeight-9" 
                                            href="https://rdmap.co/roadmap/218" 
                                            target="_blank">
                                            Now
                                        </a>
            
                                        <span className="textWeight-9 color-darkSmoke mr-3 ml-3">|</span>
            
                                        <a className="sp-btn sp-btn--sm sp-btn--black-ghost sp-bg-smoke--hover borderRadius-sm fontWeight-9" 
                                            href="http://eepurl.com/c1fttz">
                                            Sign Up
                                        </a>
            
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PREVIEW COMPONENT */}
                <div className="previewComponent boxShadow-float borderRadius-md">
                    <ComponentBox component={data}/>
                </div>
                
            </section>
        );


    }

}


/* Export */
export default PreviewSectionContainer;