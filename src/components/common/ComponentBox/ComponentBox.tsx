/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import Iframe from '../Iframe/Iframe.container';
import { Link } from 'react-router-dom';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
type ComponentBoxProps = {
    component: AtomModel
};


/**
 * @desc Represent UI Component Box Component
 * @function ComponentBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ComponentBox: React.SFC<ComponentBoxProps> = ({ component }) => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="ComponentBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
            <div className="ComponentBox__content borderRadius-xs">
                <Link to={`/component/${component.id}`} className="cover-link" />
                <Iframe html={component.html} style={component.css} background={component.contextualBg} />
            </div>
        </div>
    );

};

/* Export */
export default ComponentBox;