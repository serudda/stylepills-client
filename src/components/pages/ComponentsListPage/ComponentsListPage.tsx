/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_ALL_UI_COMPONENTS_QUERY, GetAllResponse } from '../../../models/uiComponent/uiComponent.query';

import ComponentsList from '../../common/ComponentsList/ComponentsList';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsListPageProps = {/**/};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentsListPage 
extends React.Component<ChildProps<ComponentsListPageProps, GetAllResponse>, {}> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {    
        super();
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (data.error) {
            return (<p>{data.error.message}</p>);
        }

        if (data.uiComponents === null) {
            return (<div>No data</div>);
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentsListPage">
                <ComponentsList components={data.uiComponents}/>
            </div>
        );


    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllUiComponentsQuery = graphql<GetAllResponse, ComponentsListPageProps>(
    GET_ALL_UI_COMPONENTS_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllUiComponentsQuery
)(ComponentsListPage);