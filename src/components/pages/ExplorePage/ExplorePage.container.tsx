/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { compose, ChildProps } from 'react-apollo';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';

import { searchAtomsAction } from '../../../actions/search.action';

import Header from '../../common/Header/Header.container';
import AtomsListContainer from '../../common/AtomsList/AtomsList.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExplorePageProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    search: ISearchState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        search: {
            searchAtoms: (filters: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExplorePage 
extends React.Component<ChildProps<ExplorePageProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*     COMPONENT_WILL_MOUNT     */
    /********************************/
    componentWillMount() { 
        // VARIABLES
        // let queryArgs: ISearchState = null;
        
        // Build the filter set
        /* queryArgs = {
            searchAtoms: {
                filter: {
                    text: this.props.search.searchAtoms.filter.text,
                    atomCategoryId: this.props.search.searchAtoms.filter.atomCategoryId
                },
                sortBy: this.props.search.searchAtoms.sortBy
            }
        }; */

        // Trigger searchAtoms action in order to save 'limit' value on Store
        // this.props.actions.search.searchAtoms(queryArgs);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ExplorePage sp-bg-darkSnow h-100">
                
                {/* Header */}
                <Header />

                {/* Atoms list container */}
                <AtomsListContainer />

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        search: state.search
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            search: {
                searchAtoms: (queryArgs: any) => dispatch(searchAtomsAction(queryArgs))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const explorePageConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    explorePageConnect
)(ExplorePage);