import * as React from 'react';

interface IColorPalette {
    id: number;
}

// Con React.SFC<interface> lo que hacemos es saltarnos la advertencia desde el lado
// del container padre, cuando quiero pasarle una prop, que me dice el sig error:
// 'Type '{ id: any; }' has no properties in common with type 'IntrinsicAttributes & { children?: ReactNode; }'.'
const ColorPalette: React.SFC<IColorPalette> = ({id}) => {

    /*const styleColor = {
        backgroundColor: color
    };

    const styleLabel = {
        color: labelColor
    };*/

    return (
        <div className="ma-color-palette">
            <p>{id}</p>
            <div className="ma-color-palette__color" />
            <div className="ma-color-palette__label" />
        </div>
    );
};

export default ColorPalette;