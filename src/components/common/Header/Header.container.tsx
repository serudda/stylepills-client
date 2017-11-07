/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { IUiState } from '../../../reducer/ui.reducer';

import { clearUiAction } from '../../../actions/ui.action';

import Icon from '../Icon/Icon';
import NavbarOptions from '../NavbarOptions/NavbarOptions.container';
import AtomSearchContainer from '../AtomSearch/AtomSearch.container';
import AtomCategoryFilterContainer from '../AtomCategoryFilter/AtomCategoryFilter.container';
import SortBySelectListContainer from '../SortBySelectList/SortBySelectList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    ui: IUiState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            clearUi: () => void;
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
                            <AtomSearchContainer />

                        </div>

                        <div className="col-3 d-flex align-content-center justify-content-end">

                            {/* Category Select List */}
                            <AtomCategoryFilterContainer />
                            
                            {/* Sort by section */}
                            <SortBySelectListContainer />

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
        ui:  state.ui
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