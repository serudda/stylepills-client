/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { config } from './../../../config/config';
import { IRootState } from '../../../reducer/reducer.config';

import { clearUiAction } from '../../../actions/ui.action';

import Icon from './../../../app/components/Icon/Icon';
import Slider from './../../../app/components/Slider/Slider';
import NavbarOptionsContainer from './../../../app/containers/Navbars/NavbarOptions/NavbarOptions.container';
import AtomSearchContainer from '../AtomSearch/AtomSearch.container';
import AtomCategoryFilterContainer from '../AtomCategoryFilter/AtomCategoryFilter.container';
// import SortBySelectListContainer from '../SortBySelectList/SortBySelectList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {
    showFilterSection?: boolean,
    showSliderSection?: boolean
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
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
        const { 
            isAuthenticated = false,
            showFilterSection = false,
            showSliderSection = false,
        } = this.props;

        // Get server config object
        const serverConfig = config.getServerConfig();
            
        
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
                        <NavbarOptionsContainer />

                    </div>


                    {/* PUV Section */}
                    {!isAuthenticated &&
                    <div className="container" style={{marginTop: '100px', marginBottom: '100px'}}>
                        <div className="row align-items-center px-5">
                            <div className="col-12 text-center px-5">
                                <h2 className="color-slate fontSize-xxl px-5 mb-5">
                                    The best place to host and show off your UI Components, 
                                    create Styleguides for your projects, and find inspiration 
                                    from the community's open source components.
                                </h2>
                                <a href={serverConfig.authGoogleUrl} className="sp-btn sp-btn--primary sp-btn--lg">
                                    Create UI repository
                                </a>
                            </div>
                        </div>
                    </div>}
                    
                    {/* Project Slider section */}
                    {showSliderSection &&
                    <div className="row borderColor-smoke borderTopStyle-dashed borderTop-1 no-gutters py-5">
                        <div className="col-12">
                            <h2 className="color-silver fontSize-xl">
                                Featured Projects
                            </h2>
                            <Slider />
                        </div>
                    </div>  
                    }


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
    const { isAuthenticated } = state.auth;
    return {
        isAuthenticated
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