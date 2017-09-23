/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect /* , Dispatch */ } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import * as hljs from 'highlight.js';

import { UiComponent as UiComponentModel } from '../../../models/uiComponent/uiComponent.model';

import { IRootState } from '../../../reducer/reducer.config';
import ColorPaletteSection from './sections/ColorPaletteSection.presentation';
import ComponentDetailSection from './sections/ComponentDetailSection.presentation';
import NotFound from '../NotFoundPage/NotFoundPage.presentation';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {}


/* Mapped State to Props */
interface IStateProps {
    data?: {
        loading: Boolean, 
        error: {message: string}, 
        uiComponent: UiComponentModel
    };
    match?: any;
    uiComponent: UiComponentModel;
}


/*****************************************/
/*            MAPSTATETOPROPS            */
/*****************************************/
function mapStateToProps (state: IRootState): IStateProps {
    return {
        uiComponent: state.uiComponents.item
    };
}


/**
 * @desc Represents Component Detail Page
 * @class ComponentPageContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class ComponentPageContainer extends React.Component<IOwnProps & IStateProps /* & IDispatchProps */, {}> {

    
    /*   COMPONENTDIDMOUNT    */
    /**************************/
    componentDidMount() {        
        // Init Highlight js
        hljs.initHighlightingOnLoad();
    }

    
    /*        METHODS         */
    /**************************/ 


    /*         RENDER         */
    /**************************/
    render() {
        
        // TODO: Remover de aqui, no deberian haber inline styles si
        // no son dinamicas.
        const imgStyle = {
            width: '100%'
        };

        
        /*       PROPERTIES       */
        /**************************/
        const {
            /* count, */
            data: {
                loading, 
                error, 
                uiComponent,
            }/*, match */
        } = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (<div>Loading</div>);
        }

        if (error) {
            return (<p>(error.message)</p>);
        }

        if (uiComponent === null) {
            return (<NotFound />);
        }


        /*         MARKUP          */
        /***************************/
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