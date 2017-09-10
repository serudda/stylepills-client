/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ColorPaletteContainer from '../../common/ColorPalette/ColorPalette.container';
import { Link } from 'react-router-dom';


/************************************/
/*            INTERFACES            */
/************************************/
interface IComponentPageProps {}


/**
 * @desc Represent Component Detail Page
 * @function ComponentPage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const ComponentPage: React.SFC<IComponentPageProps> = () => {
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

/* Export */
export default ComponentPage;