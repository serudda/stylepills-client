import * as React from 'react';
import ColorPalette from '../../common/ColorPalette';


class ColorPaletteContainer extends React.Component {
    render() {
        return(
            <div className="color-palette-container">
                <h3>Color Palette</h3>
                <ul>
                    <ColorPalette/>
                </ul>
            </div>
        );
    }
}

export default ColorPaletteContainer;