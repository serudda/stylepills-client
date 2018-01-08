/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Color as ColorModel } from '../../../models/color/color.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorsListProps = {
    colors: Array<ColorModel>;
    onDelete: (color: ColorModel) => any;
};


/**
 * @desc Represent Colors List
 * @function ColorsList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorsList: React.SFC<ColorsListProps> = ({ colors = [], onDelete }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <ul className="ColorsList sp-list sp-list--simple mt-4">

            {colors.map((color: ColorModel) => (
                <li key={(new Date()).getTime()} className="item">
                    <span className="sample-color borderRadius-sm" style={{backgroundColor: color.hex}}/>
                    <span className="text">
                        {color.name}
                    </span>
                    <span className="text-tag">
                        <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                            HEX
                        </span>
                        <span className="text">
                            {color.hex}
                        </span>
                    </span>
                    <span className="text-tag">
                        <span className="sp-tag sp-tag--neutral sp-tag--xxs fontWeight-7 mr-2">
                            RGB
                        </span>
                        <span className="text">
                            {color.rgba.r}, {color.rgba.g}, {color.rgba.b}, {color.rgba.a}
                        </span>
                    </span>
                    <span className="icon-btn ml-auto" onClick={onDelete(color)}>
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