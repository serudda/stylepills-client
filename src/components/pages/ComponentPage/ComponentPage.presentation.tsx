/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ColorPaletteContainer from '../../common/ColorPalette/ColorPalette.container';
import ColorPaletteSection from './sections/ColorPaletteSection';
import ComponentDetailSection from './sections/ComponentDetailSection';
import { Link } from 'react-router-dom';
import * as hljs from 'highlight.js';


/************************************/
/*            INTERFACES            */
/************************************/
interface IComponentPageProps {}



/**
 * @desc Represent Component Detail Page
 * @class ComponentPage
 * @extends {React.Component}
 */
class ComponentPage extends React.Component<IComponentPageProps> {

    /**
     * @desc Get UI components after all children Elements 
     * and our Component instances are mounted onto the Browser
     * @method componentDidMount
     * @memberof ComponentPage
     */
    componentDidMount() {        
        // Init Highlight js
        hljs.initHighlightingOnLoad();
    }


    /*         RENDER         */
    /**************************/
    render() {
        const imgStyle = {
            width: '100%'
        };
    
        return (
            <div>
                {/* Component Context */}
                <section className="bg-white padding-8">
                    <div className="container">
                        <div className="row middle-xs">
                            <div className="col-xs-12">
                                <h1 className="color-silver fontWeight-6 margin-0 borderBottom-2 borderColor-darkSnow paddingBottom-2 marginBottom-6">Components based on Medium</h1>
                            </div>
                            <div className="col-xs-12">
                                <img style={imgStyle} src={"https://s3.amazonaws.com/waysily-img/stylepill/medium-theme/medium-bg.jpg"} alt="medium-bg" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Color Palette Section */}
                <ColorPaletteSection />

                {/* Component Detail Section */}
                <ComponentDetailSection />
                
                <div className="section-color-palette">
                    <ColorPaletteContainer />
                </div>
    
                <Link to="library">
                    <button className="btn btn-lg btn-primary">Visit Library</button>
                </Link>
            </div>
        );
    }
}

/* Export */
export default ComponentPage;