/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Basic as BasicColorModel } from '../../../models/color/color.model';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorBoxProps = BasicColorModel;


/**
 * @desc Represent Color Box
 * @function ColorBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorBox: React.SFC<ColorBoxProps> = ({ hex, rgba }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="ColorBox boxShadow-raised borderRadius-md text-center bg-white">
            {
                rgba ?
                <div className="ColorBox__color borderColor-smoke" 
                     style={{background: `rgba(${ rgba.r }, ${ rgba.g }, ${ rgba.b }, ${ rgba.a })`}}/>
                :
                <div className="ColorBox__color borderColor-smoke" 
                     style={{ background: hex }}/>
            }
            <p className="ColorBox__label fontFamily-poppins fontSize-lg fontWeight-5 mt-1 color-silver">
                {hex}
            </p>
        </div>
    );
    
};


/* Export */
export default ColorBox;