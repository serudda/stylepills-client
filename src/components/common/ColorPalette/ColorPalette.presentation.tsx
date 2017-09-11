/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as model from '../../../models/uiComponent/uiComponent.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteProps {
    options: model.UiComponent;
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
            <p>{options.id} {options.color} {options.label}</p>
            <div className="ma-color-palette__color" />
            <div className="ma-color-palette__label" />
        </div>
    );

};

/* Export */
export default ColorPalette;