/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ColorPalette from '../../../common/ColorPalette/ColorPalette.presentation';
import * as model from '../../../../models/colorPalette/colorPalette.model';

/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteSectionProps {
    options: model.ColorPalette;
}


/**
 * @desc Color Palette Section
 * @function ColorPaletteSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @memberof ComponentPage
 * @returns page view
 */
const ColorPaletteSection: React.SFC<IColorPaletteSectionProps> = ({options}) => {

    const codeStyle: React.CSSProperties = {
        whiteSpace: 'pre'
    };

    const code = `
    $color: (
        lightPrimary:   #07C27C,
        primary:        #00AB6B,
        darkPrimary:    #167D51,
        black:          #2D2C2C,
        lightGray:      #949494,
        white:          #FFFFFF,
    );

    //Usage
    $body-font-color: map-get($color, lightPrimary);
    `;


    return(
        <section className="bg-white padding-8">
            <div className="container">
                <div className="row middle-xs">

                    {/* COLORS LIST */}
                    <div className="col-xs-12 col-sm-7">

                        {/* Color Palette Title */}
                        <h2 className="color-slate fontWeight-6 margin-0 marginBottom-1">Color Palette</h2>
                        <p className="color-silver marginBottom-4 fontSize-lg">
                            Color type: <strong className="fontFamily-sourceCodePro">Vibrant</strong>
                        </p>

                        {/* Color Palette */}
                        <ColorPalette options={options}/>

                    </div>

                    {/* SOURCE CODE */}
                    <div className="col-xs-12 col-sm-5">

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="float-right"><p className="fontFamily-poppins fontSmoothing-reset fontSize-md">Scss</p></div>
                            </div>
                            <div className="col-xs-12">
                                <pre className="fontSize-sm fontSmoothing-reset bg-darkSnow"><code className="scss borderRadius-sm" style={codeStyle}>
                                {code}
                                </code></pre>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

/* Export */
export default ColorPaletteSection;