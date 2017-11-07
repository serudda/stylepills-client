/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { ISearchState } from '../../../reducer/search.reducer';

import { searchAtomsAction } from '../../../actions/search.action';

import Icon from '../../common/Icon/Icon';


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
            searchAtoms: (filters: any) => void;
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
    constructor() {
        super();

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
     * @returns {void}
     */
    private _handleChange (e: any) {
        // VARIABLES
        let value = e.target.value;
        let filters: ISearchState = null;

        // Build the filter set
        filters = {
            text: value,
            atomCategoryId: this.props.search.atomCategoryId,
            sortBy: this.props.search.sortBy
        };

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, text: value };
        });
        
        // Trigger Search Atoms Action
        this.props.actions.search.searchAtoms(filters);
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
                {/*<button className="sp-search__btn sp-btn sp-btn--combo sp-btn--sm fontSmoothing-reset">
                    <span>Category</span>
                    <Icon icon="chevronDown" 
                          iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                          width="15" height="15"/>
                </button>*/}
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
                searchAtoms: (filters: any) => dispatch(searchAtomsAction(filters))
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