/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import Icon from '../../common/Icon/Icon';

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
        <div className="StyleguidePage container">

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
                    <h2 className="m-0 color-silver mb-4 borderBottom-2 borderColor-darkSmoke pb-2">Stats</h2>

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

        </div>
    );
    
};


/* Export */
export default StyleguidePage;