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
const Color: React.SFC<IColorProps> = ({options}) => {

    const colorStyle: React.CSSProperties = {
        backgroundColor: options.hex
    };

    return (
        <div className="margin-3">

            <div className="ma-color__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                <div className="ma-color__item__color-square borderColor-smoke" style={colorStyle} />
                <p className="ma-color__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                    {options.hex}
                </p>
            </div>

            <div className="marginTop-2">
                <p className="fontFamily-poppins fontSize-md color-silver">{options.label}</p>
            </div>

        </div>
    );

};

/* Export */
export default Color;