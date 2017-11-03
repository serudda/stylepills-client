/************************************/
/*           DEPENDENCIES           */
/************************************/
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
type ExplorePageProps = {};

/* Own States */
type LocalStates = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExplorePage 
extends React.Component<ChildProps<ExplorePageProps, GetAllResponse>, LocalStates> {


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
            return (<div>Loading</div>);
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
            <div className="ExplorePage sp-bg-darkSnow h-100">
                
                {/* Header */}
                <Header />

                {/* Components list */}
                <ComponentsList components={data.allAtoms}/>

            </div>
        );
    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllAtomsQuery = graphql<GetAllResponse, ExplorePageProps>(
    GET_ALL_ATOM_QUERY, {
        options:  () => (
            { 
                variables: 
                 { 
                    limit:  12
                } 
            }
        )
    }
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllAtomsQuery
)(ExplorePage);