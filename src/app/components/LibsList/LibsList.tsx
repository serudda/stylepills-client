/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Lib as LibModel } from './../../../models/lib/lib.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibsListProps = {
    libs: Array<LibModel>;
    isEmpty?: boolean,
    onDeleteClick: (lib: LibModel) => any;
};


/**
 * @desc Represent a Libs List
 * @function LibsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const LibsList: React.SFC<LibsListProps> = ({ libs = [], isEmpty = false, onDeleteClick }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <ul className="LibsList sp-list sp-list--simple borderRadius-md mt-4">

            {isEmpty &&
            <div className="LibsList__message d-flex align-items-center justify-content-center fontSize-xl color-darkSmoke fontWeight-7">
                <span>
                    It doesn't have external libraries yet
                </span>
            </div>}

            {libs.map((lib: LibModel, index) => (
                <li key={index} className="item">
                    <span className="text">
                        {lib.url}
                    </span>
                    <span className="icon-btn ml-auto mr-3" onClick={onDeleteClick(lib)}>
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