import * as React from 'react';
import ColorPalette from '../../common/ColorPalette';
import getUiComponents from '../../api/api';


class ColorPaletteContainer extends React.Component {

    componentDidMount() {
        let data = getUiComponents();
        console.log('UIComponents', data);
    }

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