/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import NavbarOptions from './../../../common/NavbarOptions/NavbarOptions.container';
import AtomSearchContainer from './../../../common/AtomSearch/AtomSearch.container';
import AtomCategoryFilterContainer from './../../../common/AtomCategoryFilter/AtomCategoryFilter.container';
// import SortBySelectListContainer from './../../../common/SortBySelectList/SortBySelectList.container';
import TypeSelectListContainer from './../../../common/TypeSelectList/TypeSelectList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Header 
extends React.Component<ChildProps<HeaderProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<HeaderProps & StateProps, {}>) {
        super(props);
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
                    <div className="navbar navbar-light navbar-expand-lg borderColor-smoke borderBottomStyle-dashed borderBottom-1 mb-3 px-2 py-3 justify-content-between">

                        {/* Navbar options */}
                        <NavbarOptions />

                    </div>

                    {/* Filter section */}
                    <div className="FilterSection row align-items-center">

                        <div className="col-12 mt-3 mb-4">
                            {/* Title */}
                            <h1 className="m-0 color-silver fontSize-xxl">
                                My Components
                            </h1>
                        </div>
                        
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        {/* Search Box */}
                        <div className="w-100">
                        <AtomSearchContainer />
                        </div>

                        {/* Type Select List */}
                        <div className="ml-4">
                            <TypeSelectListContainer />
                        </div>

                        {/* Category Select List */}
                        <div className="ml-4">
                            <AtomCategoryFilterContainer />
                        </div>

                        {/* Sort by List */}
                        {/*<SortBySelectListContainer />*/}
                    </div>

                </div>
                
            </header>
        );

    }

}


/*         EXPORT          */
/***************************/
export default Header;