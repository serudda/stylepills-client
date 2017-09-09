// Dependencies
import * as React from 'react';

// Interfaces
interface IColorPalette {
    id: number;
    color: string;
}

// Con React.SFC<interface> lo que hacemos es saltarnos la advertencia desde el lado
// del container padre, cuando quiero pasarle una prop, que me dice el sig error:
// 'Type '{ id: any; }' has no properties in common with type 'IntrinsicAttributes & { children?: ReactNode; }'.'
const ColorPalette: React.SFC<IColorPalette> = ({id, color}) => {

    console.log('(1.4) Render ColorPalette on common/ColorPalette/index.tsx');

    return (
        <div className="ma-color-palette">
            <p>{id} {color}</p>
            <div className="ma-color-palette__color" />
            <div className="ma-color-palette__label" />
        </div>
    );
};

export default ColorPalette;