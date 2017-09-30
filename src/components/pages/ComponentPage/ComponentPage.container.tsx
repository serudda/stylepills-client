/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
// import * as hljs from 'highlight.js';

import { UiComponent as UiComponentModel } from '../../../models/uiComponent/uiComponent.model';

// import { IRootState } from '../../../reducer/reducer.config';
import NotFound from '../NotFoundPage/NotFoundPage.presentation';
import PanelSection from './sections/PanelSection.container';
import PreviewSection from './sections/PreviewSection.container';



/**
 * @desc Represents Component Detail Page
 * @class ComponentPageContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class ComponentPageContainer extends React.Component<ChildProps<InputProps, Response>, {}> {

    
    /*   COMPONENTDIDMOUNT    */
    /**************************/
    componentDidMount() {        
        // Init Highlight js
        // hljs.initHighlightingOnLoad();
        let header = document.getElementById('header');
        let footer = document.getElementById('footer');

        header.style.display = 'none';
        footer.style.display = 'none';
    }

    
    /*        METHODS         */
    /**************************/ 
    getId() {
        return this.props.data.loading;
    }


    /*         RENDER         */
    /**************************/
    render() {

        
        /*       PROPERTIES       */
        /**************************/
        const {loading, error, uiComponent} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (uiComponent === null) {
            return (<NotFound />);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentPage row sp-bg-darkSnow no-gutters">

                {/* Left Column: Panel Section */}
                <div className="leftCol col-12 col-sm-5 order-12 order-sm-12 sp-bg-slate">
                    <PanelSection options={uiComponent}/>
                </div>

                {/* Right Column: Preview */}
                <div className="rightCol col-12 col-sm-7 order-1 order-sm-1 mb-5 mb-sm-0 sp-bg-darkSnow">
                    <PreviewSection data={uiComponent}/>
                </div>

            </div>
        );
    }

}


const getUiComponentByIdQuery = gql`
            query getUiComponentById ($id: ID!) {
                uiComponent(id: $id) {
                    id
                    name
                    html
                    css
                    scss
                    background
                    download
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

type Response = {
    uiComponent: UiComponentModel;
};

type InputProps = {
    match: {
        params: {
            id: number
        }
    }
};

/* Export */
export default compose(
    graphql<Response, InputProps>(getUiComponentByIdQuery, {
        options: (ownProps: InputProps) => (
            { 
                variables: 
                { 
                    id: ownProps.match.params.id 
                } 
            }
        )
    })
)(ComponentPageContainer);