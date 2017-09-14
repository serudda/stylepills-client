/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as model from '../../../models/colorPalette/colorPalette.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteProps {
    options: model.ColorPalette;
}


/**
 * @desc Represent Color Palette Component
 * @function ColorPalette
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorPalette: React.SFC<IColorPaletteProps> = ({options}) => {

    return (
        <div className="ma-color-palette">
            <p>{options.id} {options.hex} {options.label}</p>
            <div className="ma-color-palette__color" />
            <div className="ma-color-palette__label" />
        </div>
    );

};

/* Export */
export default ColorPalette;