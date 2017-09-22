/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as model from '../../../models/color/color.model';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorProps {
    options: model.Color;
}


/**
 * @desc Represent Color Component
 * @function Color
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Color: React.SFC<IColorProps> = ({ options }) => {

    /*       PROPERTIES       */
    /**************************/
    // We put explicity only the properties that we're going to use.
    // We assign default values
    const {
        hex = '#FFFFFF', 
        label = 'white'
    } = options;


    /*   INLINE DYNAMIC STYLES    */
    /******************************/
    // Used UPPERCASE to differentiate it quickly inside the JSX
    // We take a explicit identify class from the element to name the const.
    const MACOLOR_ITEM_COLORSQUARE: React.CSSProperties = {
        backgroundColor: hex
    };


    /*         MARKUP          */
    /***************************/
    return (
        <div className="Color">

            <div className="Color__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                <div className="Color__item__color-square borderColor-smoke" 
                     style={MACOLOR_ITEM_COLORSQUARE} />
                <p className="Color__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                    {hex}
                </p>
            </div>

            <div className="marginTop-2">
                <p className="fontFamily-poppins fontSize-md color-silver">{label}</p>
            </div>

        </div>
    );

};

/* Export */
export default Color;