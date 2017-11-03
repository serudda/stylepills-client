/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_ALL_ATOM_QUERY, GetAllResponse } from '../../../models/atom/atom.query';

import Header from '../../common/Header/Header.container';
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
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {   
        window.scrollTo(0, 0);
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

        if (data.allAtoms === null) {
            return (<div>No data</div>);
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentsListPage">
                <Header />
                <ComponentsList components={data.allAtoms}/>
            </div>
        );


    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllAtomsQuery = graphql<GetAllResponse, ComponentsListPageProps>(
    GET_ALL_ATOM_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllAtomsQuery
)(ComponentsListPage);