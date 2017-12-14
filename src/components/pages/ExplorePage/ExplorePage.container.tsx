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
import SidebarWrapper from '../../common/SidebarWrapper/SidebarWrapper';
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
    constructor(props: ChildProps<ExplorePageProps & StateProps & DispatchProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ExplorePage sp-bg-darkSnow h-100">

                {/* SidebarWrapper */}
                <SidebarWrapper>
                
                    {/* Header */}
                    <Header showFilterSection={true} />

                    {/* Atoms list container */}
                    <AtomsListContainer />

                </SidebarWrapper>

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