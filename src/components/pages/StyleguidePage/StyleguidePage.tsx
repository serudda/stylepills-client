/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../common/Icon/Icon';
import Iframe from '../../common/Iframe/Iframe.container';

/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type StyleguidePageProps = {};


/**
 * @desc Represent Styleguide Page
 * @function StyleguidePage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const StyleguidePage: React.SFC<StyleguidePageProps> = () => {
    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div className="StyleguidePage width-wrapper p-0">

            {/* Title */}
            <div className="row my-5">
                <div className="col">
                    <h1 className="color-slate">Styleguide v1.0</h1>
                </div>
            </div>

            {/* Typography */}
            <div className="row mb-5">
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Typograph</h2>
                    <h1>Main Heading</h1>
                    <h2>Subpage title</h2>
                    <h3>Section header</h3>
                    <h4>Sub section heading</h4>
                    <p className="m-0 fontWeight-9">Bold content within body or form labels</p>
                    <p className="m-0">Body content / copy</p>
                    <p className="m-0 fontSize-sm">button labels / meta content</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="row mb-5">
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Buttons</h2>
                    
                    {/* Primary small button */}
                    <button className="sp-btn sp-btn--primary sp-btn--sm">
                        Primary small button
                    </button>

                    <br/><br/>

                    {/* Primary medium button */}
                    <button className="sp-btn sp-btn--primary sp-btn--md">
                        Primary medium button
                    </button>

                    <br/><br/>

                    {/* Primary large button */}
                    <button className="sp-btn sp-btn--primary sp-btn--lg">
                        Primary medium button
                    </button>

                    <br/><br/>

                    {/* Primary medium block button */}
                    <button className="sp-btn sp-btn--primary sp-btn--md sp-btn--block">
                        Primary medium block button
                    </button>

                    <br/><br/>

                    {/* Secondary small button */}
                    <button className="sp-btn sp-btn--secondary sp-btn--sm">
                        Secondary small button
                    </button>

                    <br/><br/>

                    {/* Secondary medium button */}
                    <button className="sp-btn sp-btn--secondary sp-btn--md">
                        Secondary medium button
                    </button>

                    <br/><br/>

                    {/* Secondary large button */}
                    <button className="sp-btn sp-btn--secondary sp-btn--lg">
                        Secondary large button
                    </button>

                    <br/><br/>

                    {/* Secondary block button */}
                    <button className="sp-btn sp-btn--secondary sp-btn--md sp-btn--block">
                        Secondary medium block button
                    </button>

                    <br/><br/>

                    {/* Neutral small button */}
                    <button className="sp-btn sp-btn--neutral sp-btn--sm">
                        Neutral small button
                    </button>

                    <br/><br/>

                    {/* Neutral medium button */}
                    <button className="sp-btn sp-btn--neutral sp-btn--md">
                        Neutral medium button
                    </button>

                    <br/><br/>

                    {/* Neutral large button */}
                    <button className="sp-btn sp-btn--neutral sp-btn--lg">
                        Neutral large button
                    </button>

                    <br/><br/>

                    {/* Neutral block button */}
                    <button className="sp-btn sp-btn--neutral sp-btn--md sp-btn--block">
                        Neutral medium block button
                    </button>

                    <br/><br/>

                    <div className="sp-bg-slate p-3">

                        {/* Primary Ghost small button */}
                        <button className="sp-btn sp-btn--primary-ghost sp-btn--sm">
                            Primary Ghost small button
                        </button>

                        <br/><br/>

                        {/* Primary Ghost medium button */}
                        <button className="sp-btn sp-btn--primary-ghost sp-btn--md">
                            Primary Ghost medium button
                        </button>

                        <br/><br/>

                        {/* Primary Ghost large button */}
                        <button className="sp-btn sp-btn--primary-ghost sp-btn--lg">
                            Primary Ghost large button
                        </button>

                        <br/><br/>

                        {/* Primary Ghost block button */}
                        <button className="sp-btn sp-btn--primary-ghost sp-btn--md sp-btn--block">
                            Primary Ghost medium block button
                        </button>
                    </div>

                    <br/><br/>

                    {/* Secondary Ghost small button */}
                    <button className="sp-btn sp-btn--secondary-ghost sp-btn--sm">
                        Secondary Ghost small button
                    </button>

                    <br/><br/>

                    {/* Secondary Ghost medium button */}
                    <button className="sp-btn sp-btn--secondary-ghost sp-btn--md">
                        Secondary Ghost medium button
                    </button>

                    <br/><br/>

                    {/* Secondary Ghost large button */}
                    <button className="sp-btn sp-btn--secondary-ghost sp-btn--lg">
                        Secondary Ghost large button
                    </button>

                    <br/><br/>

                    {/* Secondary Ghost block button */}
                    <button className="sp-btn sp-btn--secondary-ghost sp-btn--md sp-btn--block">
                        Secondary Ghost medium block button
                    </button>

                    <br/><br/>

                    <div className="sp-bg-slate p-3">

                        {/* White Ghost small button */}
                        <button className="sp-btn sp-btn--white-ghost sp-btn--sm">
                            White Ghost small button
                        </button>

                        <br/><br/>

                        {/* White Ghost medium button */}
                        <button className="sp-btn sp-btn--white-ghost sp-btn--md">
                            White Ghost medium button
                        </button>

                        <br/><br/>

                        {/* White Ghost large button */}
                        <button className="sp-btn sp-btn--white-ghost sp-btn--lg">
                            White Ghost large button
                        </button>

                        <br/><br/>

                        {/* White Ghost block button */}
                        <button className="sp-btn sp-btn--white-ghost sp-btn--md sp-btn--block">
                            White Ghost medium block button
                        </button>

                    </div>

                    <br/><br/>

                    {/* Black Ghost small button */}
                    <button className="sp-btn sp-btn--black-ghost sp-btn--sm">
                        Black Ghost small button
                    </button>

                    <br/><br/>

                    {/* Black Ghost medium button */}
                    <button className="sp-btn sp-btn--black-ghost sp-btn--md">
                        Black Ghost medium button
                    </button>

                    <br/><br/>

                    {/* Black Ghost large button */}
                    <button className="sp-btn sp-btn--black-ghost sp-btn--lg">
                        Black Ghost large button
                    </button>

                    <br/><br/>

                    {/* Black Ghost block button */}
                    <button className="sp-btn sp-btn--black-ghost sp-btn--md sp-btn--block">
                        Black Ghost medium block button
                    </button>

                    <br/><br/>

                    {/* Button Groups Subtitle */}
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Button Group</h2>

                    {/* Button Group */}
                    <div className="sp-btnGroup">
                        {/* First Button */}
                        <div className="sp-btnGroup__container">
                            <button className="sp-btn sp-btn--secondary sp-btn--md">
                                Edit
                            </button>
                        </div>
                        {/* Second Button */}
                        <div className="sp-btnGroup__container">
                            <button className="sp-btn sp-btn--neutral sp-btn--md">
                                Copy
                            </button>
                        </div>
                    </div>

                    <br/><br/>

                    {/* Button Group */}
                    <div className="sp-btnGroup">
                        {/* First Button */}
                        <div className="sp-btnGroup__container">
                            <button className="sp-btn sp-btn--secondary sp-btn--md">
                                Edit
                            </button>
                        </div>
                        {/* Second Button */}
                        <div className="sp-btnGroup__container">
                            <button className="sp-btn sp-btn--primary sp-btn--md">
                                Other
                            </button>
                        </div>
                        {/* Third Button */}
                        <div className="sp-btnGroup__container">
                            <button className="sp-btn sp-btn--neutral sp-btn--md">
                                Copy
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Filter buttons */}
            <div className="row mb-5">
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Filter buttons</h2>
                    
                    {/* small button */}
                    <button className="sp-btn sp-btn--combo sp-btn--sm">
                        <span>small combo button</span>
                        <Icon icon="chevronDown" 
                              iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* medium button */}
                    <button className="sp-btn sp-btn--combo sp-btn--md">
                        <span>medium combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                            width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* large button */}
                    <button className="sp-btn sp-btn--combo sp-btn--lg">
                        <span>large combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                            width="20" height="20"/>
                    </button>

                    <br/><br/>

                    {/* small secondary ghost button */}
                    <button className="sp-btn sp-btn--combo-secondary-ghost sp-btn--sm">
                        <span>small combo button</span>
                        <Icon icon="chevronDown" 
                              iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* medium secondary ghost button */}
                    <button className="sp-btn sp-btn--combo-secondary-ghost sp-btn--md">
                        <span>medium combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                            width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* large secondary ghost button */}
                    <button className="sp-btn sp-btn--combo-secondary-ghost sp-btn--lg">
                        <span>large combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                            width="20" height="20"/>
                    </button>

                    <br/><br/>

                    {/* small neutral ghost button */}
                    <button className="sp-btn sp-btn--combo-neutral-ghost sp-btn--sm">
                        <span>small combo button</span>
                        <Icon icon="chevronDown" 
                              iconClass="stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* medium neutral ghost button */}
                    <button className="sp-btn sp-btn--combo-neutral-ghost sp-btn--md">
                        <span>medium combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="stroke-secondary strokeWidth-3 ml-2"
                            width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* large neutral ghost button */}
                    <button className="sp-btn sp-btn--combo-neutral-ghost sp-btn--lg">
                        <span>large combo button</span>
                        <Icon icon="chevronDown" 
                            iconClass="stroke-secondary strokeWidth-3 ml-2"
                            width="20" height="20"/>
                    </button>

                </div>
            </div>

            {/* Stats */}
            <div className="row mb-5">
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Stats</h2>

                    {/* Small stats */}
                    <div className="sp-stats">
                        <div className="like sp-stats__item">
                            <Icon icon="heart" 
                                iconClass="stroke-black strokeWidth-3 mr-1"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="comment sp-stats__item">
                            <Icon icon="messageCircle"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="store sp-stats__item">
                            <Icon icon="package"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="view sp-stats__item">
                            <Icon icon="eye" 
                                iconClass="stroke-slate strokeWidth-3 mr-1 ml-3"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                        </div>
                    </div>

                    <br/>

                    {/* Medium stats */}
                    <div className="sp-stats">
                        <div className="like sp-stats__item">
                            <Icon icon="heart" 
                                iconClass="stroke-black strokeWidth-3 mr-1"
                                width="16" height="16"/>
                            <span className="fontSize-md fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="comment sp-stats__item">
                            <Icon icon="messageCircle"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="16" height="16"/>
                            <span className="fontSize-md fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="store sp-stats__item">
                            <Icon icon="package"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="16" height="16"/>
                            <span className="fontSize-md fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="view sp-stats__item">
                            <Icon icon="eye" 
                                iconClass="stroke-slate strokeWidth-3 mr-1 ml-3"
                                width="16" height="16"/>
                            <span className="fontSize-md fontWeight-9 color-silver">999</span>
                        </div>
                    </div>

                    <br/>

                    {/* Large stats */}
                    <div className="sp-stats">
                        <div className="like sp-stats__item">
                            <Icon icon="heart" 
                                iconClass="stroke-black strokeWidth-3 mr-1"
                                width="18" height="18"/>
                            <span className="fontSize-lg fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="comment sp-stats__item">
                            <Icon icon="messageCircle"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="18" height="18"/>
                            <span className="fontSize-lg fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="store sp-stats__item">
                            <Icon icon="package"
                                iconClass="stroke-black strokeWidth-3 mr-1 ml-3"
                                width="18" height="18"/>
                            <span className="fontSize-lg fontWeight-9 color-silver">999</span>
                        </div>
                        <div className="view sp-stats__item">
                            <Icon icon="eye" 
                                iconClass="stroke-slate strokeWidth-3 mr-1 ml-3"
                                width="18" height="18"/>
                            <span className="fontSize-lg fontWeight-9 color-silver">999</span>
                        </div>
                    </div> 

                </div>
            </div>

            {/* Inputs */}
            <div className="row mb-5">
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Inputs</h2>

                    {/* small text input */}
                    <input type="text" placeholder="Small text input" className="sp-input sp-input--sm" />

                    <br/>

                    {/* medium text input */}
                    <input type="text" placeholder="Medium text input" className="sp-input sp-input--md" />

                    <br/>

                    {/* large text input */}
                    <input type="text" placeholder="Large text input" className="sp-input sp-input--lg" />

                    <br/>

                    {/* medium block text input */}
                    <input type="text" placeholder="Medium block text input" className="sp-input sp-input--md sp-input--block" />

                    <br/>

                    {/* medium block search input */}
                    <div className="sp-search sp-search--md">
                        <Icon icon="search"
                              iconClass="sp-search__icon stroke-slate strokeWidth-2 mr-1"
                              width="14" height="14"/>
                        <input type="text" placeholder="Search" className="sp-search__input sp-input sp-input--md sp-input--block" />
                    </div>

                </div>
            </div>

            {/* Select List */}
            <div className="row mb-5">
                <div className="col">
                <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Select List</h2>

                    {/* Small Select List */}
                    <div className="sp-select-container">
                        <select className="sp-select sp-select--sm sp-select--input"
                                name="categories">
                            <option value="All">All</option>
                            <option value="Buttons" selected={true}>Buttons</option>
                            <option value="Inputs">Inputs</option>
                            <option value="Navbars">Navbars Options Large</option>
                        </select>
                        <Icon icon="chevronDown"
                              iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </div>

                    <br/><br/>

                    {/* Medium Select List */}
                    <div className="sp-select-container">
                        <select className="sp-select sp-select--md sp-select--input"
                                name="categories">
                            <option value="All">All</option>
                            <option value="Buttons" selected={true}>Buttons</option>
                            <option value="Inputs">Inputs</option>
                            <option value="Navbars">Navbars Options Large</option>
                        </select>
                        <Icon icon="chevronDown"
                              iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </div>

                    <br/><br/>

                    {/* Large Select List */}
                    <div className="sp-select-container">
                        <select className="sp-select sp-select--lg sp-select--input"
                                name="categories">
                            <option value="All">All</option>
                            <option value="Buttons" selected={true}>Buttons</option>
                            <option value="Inputs">Inputs</option>
                            <option value="Navbars">Navbars Options Large</option>
                        </select>
                        <Icon icon="chevronDown"
                              iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                              width="15" height="15"/>
                    </div>

                </div>
            </div>

            {/* Avatars */}
            < div className="row mb-5">

                <div className="col-12">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">
                        Avatars
                    </h2>
                </div>

                <div className="col-12 d-flex align-items-center mb-5">

                    {/* Extra extra extra small avatar */}
                    <div className="sp-avatar sp-avatar--xxxs borderRadius-circle">
                        <img width="22" height="22" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Sergio" />
                    </div>

                    {/* Extra extra small avatar */}
                    <div className="sp-avatar sp-avatar--xxs borderRadius-circle">
                        <img width="25" height="25" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Sergio" />
                    </div>

                    {/* Extra small avatar */}
                    <div className="sp-avatar sp-avatar--xs borderRadius-circle">
                        <img width="40" height="40" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Sergio" />
                    </div>

                    {/* Small avatar */}
                    <div className="sp-avatar sp-avatar--sm borderRadius-circle">
                        <img width="55" height="55" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Carlos" />
                    </div>

                    {/* Medium avatar */}
                    <div className="sp-avatar sp-avatar--md borderRadius-circle">
                        <img width="70" height="70" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Pedro" />
                    </div>

                    {/* Large avatar */}
                    <div className="sp-avatar sp-avatar--lg borderRadius-circle">
                        <img width="85" height="85" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Rosita" />
                    </div>

                    {/* Extra Large avatar */}
                    <div className="sp-avatar sp-avatar--xl borderRadius-circle">
                        <img width="100" height="100" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Rosita" />
                    </div>

                    {/* Extra Extra Large avatar */}
                    <div className="sp-avatar sp-avatar--xxl borderRadius-circle">
                        <img width="115" height="115" src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" alt="Rosita" />
                    </div>

                     {/* Extra Extra Large Empty avatar */}
                     <div className="sp-avatar sp-avatar--xxl borderRadius-circle">
                        <img width="115" height="115" src="" alt="Rosita" />
                    </div>
                </div>

                <div className="col-12">

                    {/* Extra Small Designed by */}
                    <a className="sp-designedBy sp-designedBy--xs link-reset fontFamily-poppins fontWeight-6 color-silver" 
                        href="https://www.twitter.com/rosa7082" target="_blank">
                        <span className="order-1">Designed by</span>
                        <span className="ml-1 order-3">Rosita & Sergio</span>
                        <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                            <img width="22" height="22"
                                 src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" 
                                 alt="rosa7082" />
                        </div>
                    </a>

                    <br/>

                    {/* Small Designed by */}
                    <a className="sp-designedBy sp-designedBy--sm link-reset fontFamily-poppins fontWeight-6 color-silver" 
                        href="https://www.twitter.com/rosa7082" target="_blank">
                        <span className="order-1">Designed by</span>
                        <span className="ml-1 order-3">Rosita & Sergio</span>
                        <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                            <img width="22" height="22"
                                 src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" 
                                 alt="rosa7082" />
                        </div>
                    </a>

                    <br/>

                    {/* Medium Designed by */}
                    <a className="sp-designedBy sp-designedBy--md link-reset fontFamily-poppins fontWeight-6 color-silver" 
                        href="https://www.twitter.com/rosa7082" target="_blank">
                        <span className="order-1">Designed by</span>
                        <span className="ml-1 order-3">Rosita & Sergio</span>
                        <div className="sp-avatar sp-avatar--xxs borderRadius-circle ml-1 order-2">
                            <img width="25" height="25"
                                 src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" 
                                 alt="rosa7082" />
                        </div>
                    </a>

                </div>

            </div>

            {/* Logo */}
            < div className="row mb-5" >
                <div className="col">
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Logos</h2>

                    {/* Small Logo (black) */}
                    <div className="d-inline-flex p-1">
                        <a className="sp-logo sp-logo--sm sp-logo--black m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                iconClass="mr-2"
                                width="20" height="20"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                    <br/>

                    {/* Small Logo (white) */}
                    <div className="sp-bg-slate d-inline-flex p-1">
                        <a className="sp-logo sp-logo--sm sp-logo--white m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                  iconClass="mr-2"
                                  width="20" height="20"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                    <br/>

                    {/* Medium Logo (black) */}
                    <div className="d-inline-flex p-1">
                        <a className="sp-logo sp-logo--md sp-logo--black m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                iconClass="mr-2"
                                width="25" height="25"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                    <br/>

                    {/* Medium Logo (white) */}
                    <div className="sp-bg-slate d-inline-flex p-1">
                        <a className="sp-logo sp-logo--md sp-logo--white m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                  iconClass="mr-2"
                                  width="25" height="25"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                    <br/>

                    {/* Large Logo (black) */}
                    <div className="d-inline-flex p-1">
                        <a className="sp-logo sp-logo--lg sp-logo--black m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                iconClass="mr-2"
                                width="28" height="28"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                    <br/>

                    {/* Large Logo (white) */}
                    <div className="sp-bg-slate d-inline-flex p-1">
                        <a className="sp-logo sp-logo--lg sp-logo--white m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                  iconClass="mr-2"
                                  width="28" height="28"/>
                            <span>Stylepills</span>
                        </a>
                    </div>

                </div>
            </div>

            {/* Atoms List Section */}
            < div className="row mb-5 no-gutters">
                <div className="col">
                <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Atoms List</h2>

                    {/* Atoms List */}
                    <div className="AtomsList row sp-bg-darkSnow pt-5 pb-5 margin-0 no-gutters">
                        <div className="col">
                            <div className="d-sm-flex flex-wrap width-wrapper">

                                {/* Atom Box */}
                                <div className="atomBox-container">
                                    <div className="AtomBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
                                        <div className="AtomBox__content borderRadius-xs">
                                            <Link to={`/styleguide`} className="cover-link" />
                                            <div className="Iframe-wrapper">
                                                <Iframe children="<div></div>" css="css" title="TEST IFRAME" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="AtomInfo px-1">

                                        {/* Atom Name */}
                                        <p className="m-0 fontWeight-9 fontSize-md fontFamily-poppins fontSmoothing-reset text-truncate">Tertiary Button</p>

                                        {/* Designed by */}
                                        <div className="AtomInfo__user">

                                            <a className="sp-designedBy sp-designedBy--xs link-reset fontFamily-poppins fontWeight-6 color-silver text-truncate" 
                                                href="https://www.twitter.com/rosa7082" target="_blank">
                                                <span className="ml-1 order-3">Rosita & Sergio</span>
                                                <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                                                    <img width="22" height="22"
                                                        src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" 
                                                        alt="rosa7082" />
                                                </div>
                                            </a>

                                        </div>

                                        {/* Stats */}
                                        <div className="AtomInfo__stats">

                                            <div className="sp-stats">
                                                <div className="like sp-stats__item">
                                                    <Icon icon="heart" 
                                                        iconClass="stroke-silver strokeWidth-2 mr-1"
                                                        width="14" height="14"/>
                                                    <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                                                </div>
                                                <div className="comment sp-stats__item">
                                                    <Icon icon="messageCircle"
                                                        iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                                        width="14" height="14"/>
                                                    <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                                                </div>
                                                <div className="store sp-stats__item">
                                                    <Icon icon="package"
                                                        iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                                        width="14" height="14"/>
                                                    <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                                                </div>
                                                <div className="view sp-stats__item">
                                                    <Icon icon="eye" 
                                                        iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                                        width="14" height="14"/>
                                                    <span className="fontSize-sm fontWeight-9 color-silver">999</span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>                
                    </div>
                </div>
            </div>

            {/* Icon Tab Menu */}
            <div className="row mb-5 no-gutters">
                <div className="col">
                <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Icon Tab Menu</h2>

                    {/* Tab Menu (is Reversed) */}
                    <div className="sp-iconTabMenu sp-iconTabMenu--is-reversed fontSmoothing-reset">
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="heartFull"
                                    iconClass="strokeWidth-2"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="share"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn sp-iconTabMenu__btn--active">
                            <div className="inner">
                                <Icon icon="messageCircle"
                                    iconClass="strokeWidth-2 stroke-darkPrimary"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="download"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="package"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                    </div>

                    <br/><br/>

                    {/* Tab Menu */}
                    <div className="sp-iconTabMenu fontSmoothing-reset">
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="heart"
                                    iconClass="strokeWidth-2"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="share"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn sp-iconTabMenu__btn--active">
                            <div className="inner">
                                <Icon icon="messageCircle"
                                    iconClass="strokeWidth-2 stroke-darkSecondary"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="download"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                        <button className="sp-iconTabMenu__btn">
                            <div className="inner">
                                <Icon icon="package"
                                    iconClass="strokeWidth-2 stroke-slate"
                                    width="22" height="22"/>
                            </div>
                        </button>
                    </div>

                </div>
            </div>


        </div >
    );
    
};


/* Export */
export default StyleguidePage;

