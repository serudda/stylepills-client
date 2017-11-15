/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { GET_ALL_ATOM_QUERY, GetAllResponse } from '../../../models/atom/atom.query';

import Header from '../../common/Header/Header.container';
import AtomsList from '../../common/AtomsList/AtomsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListPageProps = {/**/};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomsListPage 
extends React.Component<ChildProps<AtomsListPageProps, GetAllResponse>, {}> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {    
        super();
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    atomDidMount() {   
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
            <div className="AtomsListPage">
                <Header />
                <AtomsList atoms={data.allAtoms}/>
            </div>
        );


    }

}


/********************************/
/*            QUERY             */
/********************************/
const getAllAtomsQuery = graphql<GetAllResponse, AtomsListPageProps>(
    GET_ALL_ATOM_QUERY
);


/*         EXPORT          */
/***************************/
export default compose(
    getAllAtomsQuery
)(AtomsListPage);