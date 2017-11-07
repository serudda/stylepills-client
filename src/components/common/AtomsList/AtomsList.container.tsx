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
/* FIXME: Tratar de unificar la estructura de los filtros, limit, sortBy y DESC or ASC 
ya que esta todo muy separado, y en cada componente que quiero usar esto, tengo una forma
diferente de hacerlo, eso esta mal. */

const searchAtomsQuery = graphql<SearchAtomsResponse, AtomsListProps>(
    SEARCH_ATOMS_QUERY, {
        options:  (ownProps: StateProps) => (
            { 
                variables: 
                {
                    filter: {
                        private: false,
                        text: ownProps.search.text,
                        atomCategoryId: ownProps.search.atomCategoryId
                    },
                    sortBy: ownProps.search.sortBy,
                    limit:  12
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