/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Color from '../Color/Color.presentation';
/* NOTE: We choose this naming convetion so it is a frequent case when I have you import a Component named
    'Color', and the model has the same name, for this reason we add an alias to the Model (Keep this throughout project)*/
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
    // We put explicity only the properties that we're going to use.
    // We assign default values
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