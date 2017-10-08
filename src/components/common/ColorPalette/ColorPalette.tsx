/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Color from '../Color/Color';
import { ColorPalette as ColorPaletteModel } from '../../../models/colorPalette/colorPalette.model';
import { Color as ColorModel } from '../../../models/color/color.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteProps {
    options: ColorPaletteModel;
}


/**
 * @desc Represent Color Palette Component
 * @function ColorPalette
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorPalette: React.SFC<IColorPaletteProps> = ({ options }) => {


    /*       PROPERTIES       */
    /**************************/
    const {
        colors
    } = options;

    
    /*         MARKUP          */
    /***************************/
    return (
        <div className="ColorPalette">
            {colors.map((color: ColorModel) => (
                <div key={color.id} className="ColorPalette__content margin-3">
                    <Color options={color} />
                </div>
            ))}
        </div>
    );
    
};


/* Export */
export default ColorPalette;