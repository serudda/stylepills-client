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
            <div className="row">
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
                              iconClass="stroke-secondary strokeWidth-3"                              
                              width="15" height="15"/>
                    </button>

                    <br/><br/>

                    {/* Primary medium button */}
                    <button className="sp-btn sp-btn--primary sp-btn--md">
                        Primary medium button
                    </button>

                </div>
            </div>
        </div>
    );
    
};


/* Export */
export default StyleguidePage;