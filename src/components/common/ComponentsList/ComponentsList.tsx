/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import ComponentBox from '../ComponentBox/ComponentBox';
import ComponentInfoSection from '../ComponentBox/ComponentInfoSection/ComponentInfoSection';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsListProps = {
    components: Array<AtomModel>;
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
        <div className="ComponentsList row pt-5 pb-5 margin-0 no-gutters">
            <div className="col">
                <div className="d-sm-flex flex-wrap width-wrapper">

                    {/* Component Box */}
                    {components.map((component: AtomModel) => (
                        <div key={component.id} className="componentBox-container">
                            <ComponentBox component={component} />
                            <ComponentInfoSection />
                        </div>
                    ))}

                </div>
            </div>                
        </div>
    );
    
};


/* Export */
export default ComponentsList;