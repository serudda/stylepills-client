import React from 'react';
import Header from '../../components/Header';
import ColorPaletteContainer from '../ComponentPage/containers/ColorPaletteContainer';

class ComponentPage extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <div className="section-color-palette">
                    <ColorPaletteContainer />
                </div>
            </div>
        )
    }
}

export default ComponentPage;