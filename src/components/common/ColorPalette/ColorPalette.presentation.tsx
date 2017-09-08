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


/***********************************************************************/
/*           STATELESS FUNCTIONAL COMPONENT (SFC) DEFINITION           */
/***********************************************************************/
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