/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ComponentBox, { IComponentBoxOptions } from '../../../common/ComponentBox/ComponentBox.presentation';
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

    private componentBoxOptions: IComponentBoxOptions;

    constructor() {
        super();
        this.componentBoxOptions = {
            isClicked: false
        };
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
        
    
        /*         MARKUP          */
        /***************************/
        return (
            <section className="PreviewSection h-100 pr-5 pl-5">

                {/* HEADER */}
                <div className="row justify-content-between pt-3 pb-3 no-gutters">
                    <div className="col-auto ml-auto">
                        {/* Header Menu */}
                        <div className="HeaderMenu d-lg-flex justify-content-between fontSmoothing-reset pr-4">
                            <div className="d-lg-flex">
                                <span className="d-block d-lg-inline-block">
                                    <div className="HeaderNavlink px-0 py-2 m-0">
                                        <a className="fontWeight-9 color-darkSecondary no-underline" 
                                            href="/login">
                                            Open
                                        </a>
                                        <span className="textWeight-9 color-extraDarkSmoke mr-2 ml-2">|</span>
                                        <a className="textWeight-9 color-slate no-underline" 
                                            href="/join?source=header-home">
                                            Join List
                                        </a>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PREVIEW COMPONENT */}
                <div className="previewComponent boxShadow-float borderRadius-md">
                    <ComponentBox data={this.props.data} options={this.componentBoxOptions}/>
                </div>
                
            </section>
        );


    }

}


/* Export */
export default PreviewSectionContainer;