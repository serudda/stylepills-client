/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import * as appConfig from '../../../core/constants/app.constants';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';
import { IAtomTypeArgs } from './../../../models/atom/atom.query';

import { searchAtomsAction } from '../../../actions/search.action';
import { clearPaginationAction } from '../../../actions/pagination.action';

import Icon from '../Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TypeSelectListProps = {};

/* Own States */
type LocalStates = {
    value: string
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
class TypeSelectListContainer 
extends React.Component<ChildProps<TypeSelectListProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<TypeSelectListProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Init state
        this.state = {
            value: appConfig.ATOM_SEARCH_TYPE_DEFAULT
        };

        // Bind methods
        this._handleChange = this._handleChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method _handleChange
     * @example this._handleChange()
     * @private
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleChange (e: any) {

        // VARIABLES
        let value = e.target.value;
        let typeArgs: IAtomTypeArgs = {
            isDuplicated: null,
            isPrivate: null
        };
        let queryArgs: ISearchState = null;

        // Destructuring props
        const { filter, sortBy } = this.props.search.searchAtoms;
        const { text, atomCategoryId } = filter;

        // Build type filter

        if (value === 'public') {
            typeArgs.isPrivate = false;
        }

        if (value === 'private') {
            typeArgs.isPrivate = true;
        }

        if (value === 'duplicated') {
            typeArgs.isDuplicated = true;
        }

        // Build the filter set
        queryArgs = {
            searchAtoms: {
                filter: {
                    type: {
                        isDuplicated: typeArgs.isDuplicated,
                        isPrivate: typeArgs.isPrivate
                    },
                    text,
                    atomCategoryId
                },
                sortBy
            }
        };

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        });

        // Trigger Clean Pagination Action
        this.props.actions.pagination.clearPagination();
        
        // Trigger Search Atoms Action
        this.props.actions.search.searchAtoms(queryArgs);
    }


    /**
     * @desc Get Type List
     * @method _getTypeFilterList
     * @example this._getTypeFilterList()
     * @private
     * @returns {JSX.Element} <Popup />
     */
    private _getTypeFilterList (): JSX.Element {
        return (
            <Popup
            trigger={
                <div className="sp-select-container">
                    <select value={this.state.value} onChange={this._handleChange}
                            className="sp-select sp-select--md sp-select--input"
                            name="type">
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="duplicated">Duplicated</option>
                        {/*<option value="likes">Likes</option>*/}
                    </select>
                    <Icon icon="chevronDown"
                        iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                        width="15" height="15"/>
                </div>
            }
            position="top center"
            size="tiny"
            inverted={true}>
                Filter by type
            </Popup>
        );
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="TypeSelectList">
                {this._getTypeFilterList()}
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
const typeSelectListConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    typeSelectListConnect
)(TypeSelectListContainer);