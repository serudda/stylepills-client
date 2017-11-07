/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { SEARCH_ATOMS_QUERY, SearchAtomsResponse } from '../../../models/atom/atom.query';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';

import AtomsList from './AtomsList';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    search: ISearchState;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomsListContainer 
extends React.Component<ChildProps<AtomsListProps & StateProps, SearchAtomsResponse>, LocalStates> {
    
    
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

        if (data.searchAtoms.length === 0) {
            return (<div>No data</div>);
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div>
                <AtomsList atoms={data.searchAtoms}/>
            </div>

        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const searchAtomsQuery = graphql<SearchAtomsResponse, AtomsListProps>(
    SEARCH_ATOMS_QUERY, {
        options:  (ownProps: StateProps) => (
            { 
                variables: 
                {
                    filter: {
                        private: false,
                        text: ownProps.search.searchAtoms.filter.text,
                        atomCategoryId: ownProps.search.searchAtoms.filter.atomCategoryId
                    },
                    sortBy: ownProps.search.searchAtoms.sortBy,
                    limit:  ownProps.search.searchAtoms.limit
                }
            }
        )
    }
);


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        search: state.search
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomsListConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    atomsListConnect,
    searchAtomsQuery
)(AtomsListContainer);