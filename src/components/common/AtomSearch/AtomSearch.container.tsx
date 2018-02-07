/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';

import { searchAtomsAction } from '../../../actions/search.action';
import { clearPaginationAction } from '../../../actions/pagination.action';

import Icon from './../../../app/components/Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomSearchProps = {};

/* Own States */
type LocalStates = {
    text: string
};

/* Mapped State to Props */
type StateProps = {
    search: ISearchState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        search: {
            searchAtoms: (filters: ISearchState) => void;
        },
        pagination: {
            clearPagination: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomSearchContainer 
extends React.Component<ChildProps<AtomSearchProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomSearchProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Init state
        this.state = {
            text: ''
        };

        // Bind methods
        this._handleChange = this._handleChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Change
     * @method _handleChange
     * @example this._handleChange()
     * @private
     * @param {any} e - Event 
     * @returns {void}
     */
    private _handleChange (e: any) {
        // VARIABLES
        let value = e.target.value;
        let queryArgs: ISearchState = null;

        // Destructuring props
        const { filter, sortBy } = this.props.search.searchAtoms;
        const { type, atomCategoryId } = filter;
        const { isDuplicated, isPrivate } = type;

        // Build the filter set
        queryArgs = {
            searchAtoms: {
                filter: {
                    type: {
                        isDuplicated,
                        isPrivate
                    },
                    text: value,
                    atomCategoryId
                },
                sortBy
            }
        };

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, text: value };
        });
        
        // Trigger Clean Pagination Action
        this.props.actions.pagination.clearPagination();

        // Trigger Search Atoms Action
        this.props.actions.search.searchAtoms(queryArgs);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomSearch">
                <div className="sp-search sp-search--md w-100">
                    <Icon icon="search"
                        iconClass="sp-search__icon stroke-slate strokeWidth-2 mr-1"
                        width="14" height="14"/>
                    <input type="text" 
                        value={this.state.text} onChange={this._handleChange}
                        placeholder="Type a component name (e.g. primary button, secondary input, large select...)" 
                        className="sp-search__input sp-input sp-input--md sp-input--block" />
                </div>
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
                // TODO: Agregar el tipo correspondiente
                searchAtoms: (queryArgs: any) => dispatch(searchAtomsAction(queryArgs))
            },
            pagination: {
                clearPagination: () => dispatch(clearPaginationAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomSearchConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    atomSearchConnect
)(AtomSearchContainer);