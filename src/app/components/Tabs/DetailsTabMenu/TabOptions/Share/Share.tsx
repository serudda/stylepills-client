/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Icon from './../../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ShareProps = {
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Share option from Tab Menu component
 * @function Share
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Share: React.SFC<ShareProps> = ({ onClick }) => {    

    /*         MARKUP          */
    /***************************/
    return (
        <button className="sp-iconTabMenu__btn"
                onClick={onClick}>
            <div className="inner">
                <Icon icon="share"
                    iconClass="strokeWidth-2 stroke-slate"
                    width="22" height="22"/>
            </div>
        </button>
    );
    
};


/* Export */
export default Share;