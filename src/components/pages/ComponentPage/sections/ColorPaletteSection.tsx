/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
interface IColorPaletteSectionProps {}


/**
 * @desc Color Palette Section
 * @function ColorPaletteSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @memberof ComponentPage
 * @returns page view
 */
const ColorPaletteSection: React.SFC<IColorPaletteSectionProps> = () => {

    const colorStyle: React.CSSProperties = {
        backgroundColor: '#07C27C'
    };

    const colorSecondaryStyle: React.CSSProperties = {
        backgroundColor: '#00AB6B'
    };

    const colorTertiaryStyle: React.CSSProperties = {
        backgroundColor: '#167D51'
    };

    const black: React.CSSProperties = {
        backgroundColor: '#2D2C2C'
    };

    const silver: React.CSSProperties = {
        backgroundColor: '#949494'
    }

    const white: React.CSSProperties = {
        backgroundColor: '#FFFFFF'
    }

    const codeStyle: React.CSSProperties = {
        whiteSpace: 'pre'
    }

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
                    <div className="col-xs-12 col-sm-7">

                        {/* Color Palette Title */}
                        <h2 className="color-slate fontWeight-6 margin-0 marginBottom-1">Color Palette</h2>
                        <p className="color-silver marginBottom-4 fontSize-lg">
                            Color type: <strong className="fontFamily-sourceCodePro">Vibrant</strong>
                        </p>

                        {/* Color Palette List */}
                        <div className="colorPalette-container">
                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={colorStyle}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #07C27C
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">Light Primary</p>
                                </div>
                            </div>

                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={colorSecondaryStyle}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #00AB6B
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">Primary</p>
                                </div>
                            </div>

                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={colorTertiaryStyle}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #167D51
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">Dark Primary</p>
                                </div>
                            </div>

                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={black}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #2D2C2C
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">Black</p>
                                </div>
                            </div>

                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={silver}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #949494
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">Light Gray</p>
                                </div>
                            </div>

                            <div className="margin-3">
                                <div className="colorPalette-container__item boxShadow-float borderRadius-md padding-1 textAlign-center fontSize-md">
                                    <div className="colorPalette-container__item__color borderColor-smoke" style={white}></div>
                                    <p className="colorPalette-container__item__label fontFamily-poppins fontSize-sm fontWeight-6 marginTop-1 color-silver">
                                        #FFFFFF
                                    </p>
                                </div>
                                <div className="marginTop-2">
                                    <p className="fontFamily-poppins fontSize-md color-silver">White</p>
                                </div>
                            </div>

                        </div>

                    </div>
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