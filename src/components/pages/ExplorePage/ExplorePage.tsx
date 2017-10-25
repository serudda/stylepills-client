/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import Icon from '../../common/Icon/Icon';


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
type ExplorePageProps = {};


/**
 * @desc Represent Explore Page
 * @function ExplorePage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const ExplorePage: React.SFC<ExplorePageProps> = () => {


    /*         MARKUP          */
    /***************************/

    return (
        <div className="ExplorePage sp-bg-darkSnow h-100">
            
            {/* Header */}
            <div className="Header">

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

                        {/* Navbar Options List */}
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-2 active">
                                    <a className="nav-link color-slate fontSize-sm" href="">
                                        Explore
                                    </a>
                                </li>
                                <li className="nav-item mx-2">
                                    <a className="nav-link color-slate fontSize-sm" href="">
                                        Sign Up
                                    </a>
                                </li>
                                <li className="nav-item mx-2">
                                    <a className="nav-link color-slate fontSize-sm" href="">
                                        Log In
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Filter section */}
                    <div className="FilterBar row align-items-center">
                        <div className="col-10">
                            {/* Search Box */}
                            <div className="sp-search sp-search--md w-100">
                                <Icon icon="search"
                                    iconClass="sp-search__icon stroke-slate strokeWidth-2 mr-1"
                                    width="14" height="14"/>
                                <input type="text" 
                                    placeholder="Search" 
                                    className="sp-search__input sp-input sp-input--md sp-input--block" />
                            </div>
                        </div>

                        <div className="col-2">
                            {/* Sort by section*/}
                            <div className="SortBy d-flex align-items-center justify-content-end">
                                <span className="fontSize-sm color-silver mr-2">sort by</span>
                                {/* filter btn */}
                                <button className="sp-btn sp-btn--combo-neutral-ghost sp-btn--sm">
                                    <span>Likes</span>
                                    <Icon icon="chevronDown" 
                                        iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                                        width="15" height="15"/>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    );

};

/* Export */
export default ExplorePage;