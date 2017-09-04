import React from 'react';
import ColorPalette from '../../../../components/ColorPalette';


class ColorPaletteContainer extends React.Component {
    render() {
        return(
            <div className="color-palette-container">
                <ul>
                    <ColorPalette color="#CCCCCC"/>
                </ul>
            </div>
        )
    }
}

export default ColorPaletteContainer;