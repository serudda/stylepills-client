/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { IUiState } from '../../../reducer/ui.reducer';
import { ISearchState } from '../../../reducer/search.reducer';

import { clearUiAction } from '../../../actions/ui.action';
import { searchAtomsAction } from '../../../actions/search.action';

import Icon from '../Icon/Icon';
import NavbarOptions from '../NavbarOptions/NavbarOptions.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {};

/* Own States */
type LocalStates = {
    text: string
};

/* Mapped State to Props */
type StateProps = {
    ui: IUiState;
    search: ISearchState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            clearUi: () => void;
        },
        search: {
            searchAtoms: (filters: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Header 
extends React.Component<ChildProps<HeaderProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
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
        this._handleSearchChange = this._handleSearchChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Search Change
     * @method _handleSearchChange
     * @example this._handleSearchChange()
     * @private 
     * @returns {void}
     */
    private _handleSearchChange (e: any) {
        // catch value
        let value = e.target.value;

        // Build the filter set
        // NOTE: Not take 'this.state.text' as a 'searchTerm' because it's async.
        let filters = {
            searchTerm: value,
            atomCategoryId: 0,
            sortBy: 'ALL'
        };

        // update the state
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
            <header className="Header">

                <div className="width-wrapper">

                    {/* Navbar */}
                    <div className="navbar navbar-light navbar-expand-lg borderColor-smoke borderBottomStyle-dashed borderBottom-1 mb-3 px-2 py-3">

                        {/* Logo */}
                        <a className="sp-logo sp-logo--sm sp-logo--black m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                iconClass="mr-2"
                                width="20" height="20"/>
                            <span>Stylepills</span>
                        </a>

                        {/* Navbar options */}
                        <NavbarOptions />

                    </div>

                    {/* Filter section */}
                    <div className="FilterSection row align-items-center">
                        <div className="col-9">

                            {/* Search Box */}
                            <div className="sp-search sp-search--md w-100">
                                <Icon icon="search"
                                    iconClass="sp-search__icon stroke-slate strokeWidth-2 mr-1"
                                    width="14" height="14"/>
                                <input type="text" 
                                    value={this.state.text} onChange={this._handleSearchChange}
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

                        <div className="col-3 d-flex align-content-center justify-content-end">

                            {/* Category Select List */}
                            <div className="sp-select-container mr-4">
                                <select className="sp-select sp-select--md sp-select--input"
                                        name="categories">
                                    <option value="All" selected={true}>All</option>
                                    <option value="Buttons">Buttons</option>
                                    <option value="Inputs">Inputs</option>
                                    <option value="Navbars">Navbars</option>
                                </select>
                                <Icon icon="chevronDown"
                                    iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                                    width="15" height="15"/>
                            </div>
                            
                            {/* Sort by section */}
                            <div className="sp-select-container">
                                <select className="sp-select sp-select--md sp-select--input"
                                        name="sortBy">
                                    <option value="Recent" selected={true}>Recent</option>
                                    <option value="Likes">Likes</option>
                                    <option value="Stores">Stores</option>
                                </select>
                                <Icon icon="chevronDown"
                                    iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                                    width="15" height="15"/>
                            </div>

                            {/* Sort by section 
                            <div className="SortBy d-flex align-items-center">
                                <span className="fontSize-sm color-silver mr-2">sort by</span>
                                // filter btn
                                <button className="sp-btn sp-btn--combo-neutral-ghost sp-btn--sm">
                                    <span>Likes</span>
                                    <Icon icon="chevronDown" 
                                        iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                                        width="15" height="15"/>
                                </button>
                            </div> */}
                        </div>
                    </div>

                </div>
                
            </header>
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        ui:  state.ui,
        search: state.search
    };
}

/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                clearUi: () => dispatch(clearUiAction())
            },
            search: {
                searchAtoms: (filters: any) => dispatch(searchAtomsAction(filters))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const headerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    headerConnect
)(Header);