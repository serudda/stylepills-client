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
import NotFound from '../NotFoundPage/NotFoundPage.presentation';
import PanelSection from './sections/PanelSection.container';


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
            <div className="ComponentPage row sp-bg-darkSnow no-gutters">

                {/* Left Column: Menu */}
                <div className="col sp-bg-slate">
                    <PanelSection options={uiComponent}/>
                </div>

                {/* Right Column: Preview */}
                <div className="col-8">
                    <section>
                        {}
                    </section>
                </div>

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