/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Color as ColorModel } from '../../../models/color/color.model';

import ColorBox from './../ColorBox/ColorBox';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorBoxesListProps = {
    colorPalette: Array<ColorModel>;
};


/**
 * @desc Represent Color Boxes List
 * @function ColorBoxesList
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ColorBoxesList: React.SFC<ColorBoxesListProps> = ({ colorPalette = [] }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="ColorBoxesList row pt-3 m-0 no-gutters">

            <div className="col">

                <div className="d-flex flex-wrap width-wrapper justify-content-center justify-content-md-start">

                    {/* Color Box */}
                    {colorPalette.map((color: ColorModel) => (
                        <div key={color.id} className="colorBox-container">
                            
                            <ColorBox hex={color.hex} rgba={color.rgba} />

                            <div className="mt-2">
                                <p className="fontFamily-poppins fontSize-md color-silver">
                                    {color.name}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
    
};


/* Export */
export default ColorBoxesList;