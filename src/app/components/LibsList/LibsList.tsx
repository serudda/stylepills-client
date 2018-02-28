/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import { LibListItem } from './../../../reducer/ui.reducer';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibsListProps = {
    libs: Array<LibListItem>,
    isEmpty?: boolean,
    onDeleteClick: (tempId: string) => any
};


/**
 * @desc Represent a Libs List
 * @function LibsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const LibsList: React.SFC<LibsListProps> = ({ libs = [], isEmpty = false, onDeleteClick }) => {

    // Item Classes
    const itemClasses = (lib: LibListItem) => {
        return classNames({
            'item': true,
            'item--disabled': !!lib.project
        });    
    };
    

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

            {libs.map((lib: LibListItem, index) => (
                <li key={index} className={itemClasses(lib)}>
                    <span className="text">
                        {lib.url}
                    </span>
                    {!lib.project ?
                        <span className="icon-btn ml-auto mr-3" onClick={onDeleteClick(lib.tempId)}>
                            <Icon icon="close"
                                iconClass="icon stroke-silver strokeWidth-3"
                                width="18" height="18"/>
                        </span>
                        :
                        <span className="sp-tag sp-tag--xs sp-tag--primary fontWeight-7 fontSmoothing-reset ml-auto mr-3">
                            {lib.project.name}
                        </span>
                    }
                </li>
            ))}

        </ul>
    );
    
};


/* Export */
export default LibsList;