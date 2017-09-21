/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect /* , Dispatch */ } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import * as model from '../../../models/uiComponent/uiComponent.model';
import { IRootState } from '../../../reducer/reducer.config';

import ColorPaletteSection from './sections/ColorPaletteSection';
import ComponentDetailSection from './sections/ComponentDetailSection';
import NotFound from '../NotFoundPage/NotFoundPage.presentation';
import * as hljs from 'highlight.js';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {}

/* Mapped State to Props */
interface IStateProps {
    // Tiene ? por que existe mapStateToProps, cuando decidamos que hacer con esa 
    // funcion, retiramos el ?
    data?: {
        loading: Boolean, 
        error: {message: string}, 
        uiComponent: model.UiComponent
    };
    match?: any;
    uiComponent: model.UiComponent;
}


/*            MAPSTATETOPROPS            */
/*****************************************/
/* Nota: viene 'state.uiComponent' por que al combinar los reducers (combineReducers)
   este le asignar el nombre que hayamos especificado en reducer.config.tsx, en este
   caso 'uiComponent' */
// TODO: Analizar si vamos a seguir usando el Store propio, o todo lo vamos a hacer através
// de Apollo, de ser asi, no vamos a necesitar esta funciona. Analizar que es lo mejor. 
function mapStateToProps (state: IRootState): IStateProps {
    return {
        uiComponent: state.uiComponents.item
    };
}


/**
 * @desc Represents Component Detail Page
 * @class ComponentPageContainer
 * @extends {React.Component}
 */
class ComponentPageContainer extends React.Component<IOwnProps & IStateProps /* & IDispatchProps */, {}> {

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
        
        const {data: {loading, error, uiComponent}/*, match */} = this.props;
        // (LEGACY) const { getUiComponentById } = this.props.data;

        if (loading) {
            return (<div>Loading</div>);
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (uiComponent === null) {
            return (<NotFound />);
        }

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
                                <img style={imgStyle} src={'https://s3.amazonaws.com/waysily-img/stylepill/medium-theme/medium-bg.jpg'} alt="medium-bg" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Color Palette Section */}
                <ColorPaletteSection options={uiComponent.colorPalette}/>

                {/* Component Detail Section */}
                <ComponentDetailSection />

            </div>
        );
    }

}


// NOTE: This will be automatically fired when the component is rendered, 
// sending this exact GraphQL query to the backend.
const getUiComponentByIdQuery = gql`
            query {
                uiComponent(id: 1) {
                    id
                    css
                    scss
                    html
                    __typename
                    colorPalette {
                        id
                        colors {
                            id
                            hex
                            label
                            __typename
                        }
                        category
                        description
                        __typename
                    }
                }
            }
        `;


/* Export */
export default compose(
    graphql(getUiComponentByIdQuery),
    connect(mapStateToProps)
)(ComponentPageContainer);