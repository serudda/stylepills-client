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
type LikeProps = {
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Like option from Tab Menu component
 * @function Like
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Like: React.SFC<LikeProps> = ({ onClick }) => {    

    /*         MARKUP          */
    /***************************/
    return (
        <button className="sp-iconTabMenu__btn"
                onClick={onClick}>
            <div className="inner">
                <Icon icon="heartFull"
                    iconClass="strokeWidth-2"
                    width="22" height="22"/>
            </div>
        </button>
    );
    
};


/* Export */
export default Like;