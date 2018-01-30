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
type DownloadProps = {
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Download option from Tab Menu component
 * @function Download
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Download: React.SFC<DownloadProps> = ({ onClick }) => {    

    /*         MARKUP          */
    /***************************/
    return (
        <button className="sp-iconTabMenu__btn"
                onClick={onClick}>
            <div className="inner">
                <Icon icon="download"
                    iconClass="strokeWidth-2"
                    width="22" height="22"/>
            </div>
        </button>
    );
    
};


/* Export */
export default Download;