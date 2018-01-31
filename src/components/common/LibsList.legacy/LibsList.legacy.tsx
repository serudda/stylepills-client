/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Lib as LibModel } from './../../../models/lib/lib.model';

import Icon from './../../../app/components/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibsListProps = {
    libs: Array<LibModel>;
    onDelete: (element: LibModel) => any;
};


/**
 * @desc Represent a Libs List
 * @function LibsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const LibsList: React.SFC<LibsListProps> = ({ libs = [], onDelete }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <ul className="SimpleList sp-list sp-list--simple mt-4">

            {libs.map((lib: LibModel, index) => (
                <li key={index} className="item">
                    <span className="text">
                        {lib.url}
                    </span>
                    <span className="icon-btn ml-auto" onClick={onDelete(lib)}>
                        <Icon icon="close"
                            iconClass="icon stroke-silver strokeWidth-3"
                            width="18" height="18"/>
                    </span>
                </li>
            ))}

        </ul>
    );
    
};


/* Export */
export default LibsList;