import * as React from 'react';
import ColorPaletteContainer from '../../common/ColorPalette/ColorPalette.container';
import { Link } from 'react-router-dom';

const ComponentPage = () => {

    // LOG
    console.log('(1.1) Activated ComponentPage on presentational/ComponentPage');

    return (
        <div>
            <div className="section-color-palette">
                <ColorPaletteContainer />
            </div>

            <Link to="library">
                <button className="btn btn-lg btn-primary">Visit Library</button>
            </Link>
        </div>
    );
};

export default ComponentPage;