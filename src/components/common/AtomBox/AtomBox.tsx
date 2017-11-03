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
type AtomBoxProps = {
    atom: AtomModel
};


/**
 * @desc Represent UI Atom Box Component
 * @function AtomBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AtomBox: React.SFC<AtomBoxProps> = ({ atom }) => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
            <div className="AtomBox__content borderRadius-xs">
                <Link to={`/atom/${atom.id}`} className="cover-link" />
                <Iframe html={atom.html} style={atom.css} background={atom.contextualBg} />
            </div>
        </div>
    );

};

/* Export */
export default AtomBox;