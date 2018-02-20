/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as appConfig from './../../../core/constants/app.constants';

import { ColorListItem } from './../../../reducer/ui.reducer';
import { Color as ColorModel } from './../../../models/color/color.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorsListProps = {
    colors: Array<ColorModel | ColorListItem>,
    isEmpty?: boolean,
    emptyMessage?: string,
    onDeleteClick: (tempId: string) => any
};


/**
 * @desc Represent a Sources List
 * @function ColorsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorsList: React.SFC<ColorsListProps> = ({ 
    colors = [], isEmpty = false, emptyMessage = appConfig.EMPTY_MESSAGE, onDeleteClick 
}) => {


    /*         MARKUP          */
    /***************************/
    return (
        <ul className="LibsList sp-list sp-list--simple borderRadius-md mt-4">

            {colors.map((color: ColorListItem) => (
                <li key={color.tempId} className="item">

                    {/* Color Preview box */}
                    <span className="sample-color borderRadius-sm" style={{backgroundColor: color.hex}}/>

                    {/* Color name */}
                    <span className="text">
                        {color.name}
                    </span>

                    {/* Color HEX */}
                    <span className="text-tag">
                        <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                            HEX
                        </span>
                        <span className="text">
                            {color.hex}
                        </span>
                    </span>

                    {/* Color RGBA */}
                    <span className="text-tag">
                        <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                            RGB
                        </span>
                        <span className="text">
                            {color.rgba.r}, {color.rgba.g}, {color.rgba.b}, {color.rgba.a}
                        </span>
                    </span>

                    {/* Delete Button */}
                    <span className="icon-btn ml-auto mr-3" onClick={onDeleteClick(color.tempId)}>
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
export default ColorsList;