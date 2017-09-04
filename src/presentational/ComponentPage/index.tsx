import * as React from 'react';
import ColorPaletteContainer from '../../containers/ColorPaletteContainer';
import { Link } from 'react-router-dom';

const ComponentPage = () => {
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