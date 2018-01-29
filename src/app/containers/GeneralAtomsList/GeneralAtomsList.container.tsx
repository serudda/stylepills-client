/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    SEARCH_ATOMS_QUERY, 
    SearchAtomQueryOptions, 
    SearchAtomsResponse
} from './../../../models/atom/atom.query';

import { IRootState } from './../../../reducer/reducer.config';
import { ISearchState } from './../../../reducer/search.reducer';
import { IPaginationState } from './../../../reducer/pagination.reducer';

import AtomsListWrapper, { WrapperTypeOptions } from './../../components/AtomsListWrapper/AtomsListWrapper';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type GeneralAtomsListContainerProps = {};

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
class GeneralAtomsListContainer 
extends React.Component<ChildProps<GeneralAtomsListContainerProps & StateProps, SearchAtomsResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<GeneralAtomsListContainerProps & StateProps, SearchAtomsResponse>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;
            
        
        /*         MARKUP          */
        /***************************/
        return (     
            
            <AtomsListWrapper type={WrapperTypeOptions.general} 
                                results={data.searchAtoms ? data.searchAtoms.results : null}
                                loading={data.loading}
                                error={data.error}
                                cursors={data.searchAtoms ? data.searchAtoms.cursors : null} />

        );

    }

}


/********************************/
/*            QUERY             */
/********************************/
const searchAtomsQuery = graphql<SearchAtomsResponse, GeneralAtomsListContainerProps>(
    SEARCH_ATOMS_QUERY, {
        options:  (ownProps: StateProps): SearchAtomQueryOptions => {

            // Destructuring props
            const { pagination, search} = ownProps;
            const { first, last, after, before } = pagination.paginationAtoms;
            const { filter, sortBy } = search.searchAtoms;
            const { type, text, atomCategoryId } = filter;
            const { isDuplicated, isPrivate } = type;

            return {
                variables: 
                {
                    pagination: {
                        first,
                        after,
                        last,
                        before
                    },
                    filter: {
                        type: {
                            isDuplicated,
                            isPrivate
                        },
                        text,
                        atomCategoryId
                    },
                    sortBy
                }
            };
        }
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
const generalAtomsListContainerConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    generalAtomsListContainerConnect,
    searchAtomsQuery
)(GeneralAtomsListContainer);