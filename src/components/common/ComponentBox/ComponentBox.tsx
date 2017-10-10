/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { UiComponent as UiComponentModel } from '../../../models/uiComponent/uiComponent.model';

import Iframe from '../Iframe/Iframe.container';
import { Link } from 'react-router-dom';


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
type ComponentBoxProps = {
    component: UiComponentModel;
    isClicked: boolean;
};


/**
 * @desc Represent UI Component Box Component
 * @function ComponentBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ComponentBox: React.SFC<ComponentBoxProps> = ({ component, isClicked }) => {


    /*   INLINE DYNAMIC STYLES    */
    /******************************/
    
    const COMPONENTBOX_CONTENT: React.CSSProperties = {
        backgroundColor: component.background,
        height: '0',
        paddingTop: '56.25%',
        overflow: 'hidden',
        position: 'relative'
    };

    const COMPONENTBOX_FOOTER: React.CSSProperties = {
        whiteSpace: 'nowrap',
        padding: '8px 10px 4px',
        zIndex: 3
    };

    const DESIGN_BY: React.CSSProperties = {
        order: -1
    };


    /*         MARKUP          */
    /***************************/

    return (
        <div className="ComponentBox sp-bg-white border-6 borderColor-white">
            <div className="ComponentBox__title pt-1 pb-2">
                <p className="fontSize-lg fontFamily-poppins color-silver m-0 ml-3">
                    {component.name}
                </p>
            </div>
            <div className="ComponentBox__content borderRadius-xs" style={COMPONENTBOX_CONTENT}>
                {isClicked &&
                    <Link to={`/component/${component.id}`} className="cover-link" />
                }
                <Iframe html={component.html} style={component.css}/>
            </div>
            <div className="ComponentBox__footer sp-bg-white position-relative clearfix" style={COMPONENTBOX_FOOTER}>
                <div className="DesignedBy float-right">
                    <a className="d-flex flex-wrap align-items-center link-reset fontFamily-poppins fontSize-xs fontWeight-6 color-silver" 
                        href="https://www.twitter.com/rosa7082" target="_blank">
                        <span style={DESIGN_BY}>Designed by</span>
                        <span className="ml-1">@rosa7082</span>
                        <div className="ml-1" style={DESIGN_BY}>
                            <img src="https://s3.amazonaws.com/waysily-img/stylepill/rouse-profile.png" 
                                 alt="rosa7082" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );

};

/* Export */
export default ComponentBox;