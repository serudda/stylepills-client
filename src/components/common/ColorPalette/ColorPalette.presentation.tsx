/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import Color from '../Color/Color.presentation';
import * as model from '../../../models/colorPalette/colorPalette.model';
// FIXME: Buscar alternativa mucho mejor para este tipo de casos donde esta el Componente
// y esta el type importados en el mismo archivo (ColorModel)
import * as ColorModel from '../../../models/color/color.model';


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
        <div className="colorPalette-container">
            {options.colors.map((color: ColorModel.Color) => (
                <Color key={color.id} options={color} />
            ))}
        </div>
    );
    
};


/* Export */
export default ColorPalette;