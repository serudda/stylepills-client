/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';

import { SEARCH_ATOMS_QUERY, SearchAtomsResponse } from '../../../../../models/atom/atom.query';

import { IRootState } from '../../../../../reducer/reducer.config';
import { ISearchState } from '../../../../../reducer/search.reducer';
import { IPaginationState } from '../../../../../reducer/pagination.reducer';

import AtomsList from './AtomsList';
import PaginationBtnsContainer from '../../../../common/PaginationBtns/PaginationBtns.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListProps = {
    firstname: string;
    lastname: string;
    username: string;
};

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
    constructor(props: ChildProps<AtomsListProps & StateProps, SearchAtomsResponse>) {
        super(props);
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

        if (data.searchAtoms.results.length === 0) {
            return (
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <div className="icon icon--md icon--noResult mt-4 mb-3" />
                        <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                            We couldn’t find any component that match.
                        </div>
                    </li>
                </ul>
            );
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div>
                <AtomsList atoms={data.searchAtoms.results}/>

                <div className="row pt-5 pb-5 margin-0 no-gutters">
                    <div className="col">
                        <div className="d-sm-flex flex-wrap width-wrapper justify-content-around">
                            
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
        options:  (ownProps: AtomsListProps & StateProps) => (
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
                    include: {
                        model: 'User',
                        as: 'Owner',
                        where: {
                            username: ownProps.username 
                        }
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
export default compose<any>(
    atomsListConnect,
    searchAtomsQuery
)(AtomsListContainer);