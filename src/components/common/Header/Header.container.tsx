/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { IUiState } from '../../../reducer/ui.reducer';

import { clearUiAction } from '../../../actions/ui.action';

import Icon from './../../../app/components/Icon/Icon';
import NavbarOptions from '../NavbarOptions/NavbarOptions.container';
import AtomSearchContainer from '../AtomSearch/AtomSearch.container';
import AtomCategoryFilterContainer from '../AtomCategoryFilter/AtomCategoryFilter.container';
// import SortBySelectListContainer from '../SortBySelectList/SortBySelectList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {
    showFilterSection?: boolean
};

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
    constructor(props: ChildProps<HeaderProps & StateProps & DispatchProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { showFilterSection = false } = this.props;
            
        
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
                            <span>Stylepill</span>
                            <span className="sp-tag sp-tag--primary sp-tag--xxs fontSmoothing-reset ml-2">
                                Alpha
                            </span>
                        </a>

                        {/* Navbar options */}
                        <NavbarOptions />

                    </div>

                    {/* Filter section */}
                    {showFilterSection && 
                    <div className="d-flex align-items-center"> 

                        {/* Search Box */}
                        <div className="w-100">
                            <AtomSearchContainer />
                        </div>

                        {/* Category Select List */}
                        <div className="ml-4">
                            <AtomCategoryFilterContainer />
                        </div>
                        
                        {/* Sort by section  */}
                        {/* <SortBySelectListContainer /> */}

                    </div>}

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