/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { SEARCH_ATOMS_QUERY, SearchAtomsResponse } from '../../../models/atom/atom.query';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';
import { IPaginationState } from '../../../reducer/pagination.reducer';

import AtomsList from './AtomsList';
import PaginationBtnsContainer from '../../common/PaginationBtns/PaginationBtns.container';


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
    pagination: IPaginationState;
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

        if (data.searchAtoms.results.length === 0) {
            return (<div>No data</div>);
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div>
                <AtomsList atoms={data.searchAtoms.results}/>

                <div className="row pt-5 pb-5 margin-0 no-gutters">
                    <div className="col">
                        <div className="d-sm-flex flex-wrap width-wrapper justify-content-around">

                            <hr/>
                            
                            {/* Pagination Buttons */}
                            <PaginationBtnsContainer cursors={data.searchAtoms.cursors}/>

                        </div>
                    </div>
                </div>
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
                    pagination: {
                        first: ownProps.pagination.paginationAtoms.first,
                        after: ownProps.pagination.paginationAtoms.after,
                        last: ownProps.pagination.paginationAtoms.last,
                        before: ownProps.pagination.paginationAtoms.before
                    },
                    filter: {
                        isPrivate: false,
                        text: ownProps.search.searchAtoms.filter.text,
                        atomCategoryId: ownProps.search.searchAtoms.filter.atomCategoryId
                    },
                    sortBy: ownProps.search.searchAtoms.sortBy
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
        search: state.search,
        pagination: state.pagination
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