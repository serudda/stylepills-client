/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as appConfig from './../../../core/constants/app.constants';

import { Source as SourceModel } from './../../../models/source/source.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourcesListProps = {
    sources: Array<SourceModel>,
    isEmpty?: boolean,
    emptyMessage?: string,
    onEditClick: (source: SourceModel) => any
    onDeleteClick: (id: number) => any
};


/**
 * @desc Represent a Sources List
 * @function SourcesList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const SourcesList: React.SFC<SourcesListProps> = ({ 
    sources = [], isEmpty = false, emptyMessage = appConfig.EMPTY_MESSAGE, onEditClick, onDeleteClick 
}) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <ul className="LibsList sp-list sp-list--simple borderRadius-md mt-4">

            {isEmpty &&
            <div className="LibsList__message d-flex align-items-center justify-content-center fontSize-xl color-darkSmoke fontWeight-7">
                <span>
                    {emptyMessage}
                </span>
            </div>}

            {sources.map((source: SourceModel, index) => (
                <li key={index} className="item">

                    {/* Sortable button */}
                    <span className="icon-btn icon-btn--grab ml-3">
                        <Icon icon="menu"
                            iconClass="icon stroke-darkSmoke strokeWidth-2"
                            width="18" height="18"/>
                    </span>

                    {/* Source name */}
                    <span className="text">
                        {source.name}
                    </span>

                    {/* Source filename */}
                    <span className="text-tag">
                        <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7">
                            {source.filename}
                        </span>
                    </span>

                    {/* Source preprocessor */}
                    <span className="text-tag ml-auto">
                        <span className="sp-tag sp-tag--primary sp-tag--xxs fontWeight-7 text-uppercase">
                            {source.preprocessor.type}
                        </span>
                    </span>

                    {/* Edit Button */}
                    <span className="icon-btn mr-3" onClick={onEditClick(source)}>
                        <Icon icon="edit"
                            iconClass="icon stroke-silver strokeWidth-2"
                            width="18" height="18"/>
                    </span>

                    {/* Delete Button */}
                    <span className="icon-btn mr-3" onClick={onDeleteClick(source.id)}>
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
export default SourcesList;