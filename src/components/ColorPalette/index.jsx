import React from 'react';

const ColorPalette = (props) => {

    const style = {
        backgroundColor: props.color
    };

    return (
        <div className="ma-color-palette">
            <div className="ma-color-palette__color" style={style}></div>
            <div className="ma-color-palette__label"></div>
        </div>
    )
};

export default ColorPalette;