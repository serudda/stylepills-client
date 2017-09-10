/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteProps {
    id: number;
    color: string;
}


/**
 * @desc Represent Color Palette Component
 * @function ColorPalette
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorPalette: React.SFC<IColorPaletteProps> = ({id, color}) => {

    return (
        <div className="ma-color-palette">
            <p>{id} {color}</p>
            <div className="ma-color-palette__color" />
            <div className="ma-color-palette__label" />
        </div>
    );

};

/* Export */
export default ColorPalette;