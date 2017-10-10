/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { UiComponent as UiComponentModel } from '../../../models/uiComponent/uiComponent.model';

import ComponentBox from '../ComponentBox/ComponentBox';

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsListProps = {
    components: Array<UiComponentModel>;
};


/**
 * @desc Represent Components List
 * @function ComponentsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ComponentsList: React.SFC<ComponentsListProps> = ({ components }) => {
    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div className="ComponentsList row sp-bg-darkSnow pt-5 pb-5 margin-0">
            <div className="col">
                <div className="container position-relative">
                    <div className="color-slate fontSize-xl borderBottom-1 borderColor-extraDarkSmoke pb-2 mb-5">
                        Recent
                    </div>
                </div>

                <div className="d-sm-flex flex-wrap width-wrapper">
                    {components.map((component: UiComponentModel) => (
                        <div key={component.id} className="componentBox-container boxShadow-float borderRadius-md">
                            <ComponentBox component={component} isClicked={true}/>
                        </div>
                    ))}
                </div>
            </div>                
        </div>
    );
    
};


/* Export */
export default ComponentsList;