/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Link } from 'react-router-dom';
import Icon from '../../Icon/Icon';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
type AtomInfoSectionProps = {};


/**
 * @desc Represent UI Atom Info Section
 * @function AtomInfoSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AtomInfoSection: React.SFC<AtomInfoSectionProps> = () => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomInfo px-1">

            {/* Atom Name */}
            <p className="m-0 fontWeight-9 fontSize-md fontFamily-poppins fontSmoothing-reset text-truncate">
                Tertiary Button
            </p>

            {/* Designed by */}
            <div className="AtomInfo__user">

                <Link className="sp-designedBy sp-designedBy--xs link-reset fontFamily-poppins fontWeight-6 color-silver text-truncate"
                      to={`estudiar_url`}>
                    <span className="ml-1 order-3">Lee Williams</span>
                    <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                        <img width="22" height="22"
                            src="https://s3.amazonaws.com/waysily-img/stylepill/rands-avatar.jpg" 
                            alt="rosa7082" />
                    </div>
                </Link>

            </div>

            {/* Stats */}
            <div className="AtomInfo__stats">

                <div className="sp-stats">
                    <div className="like sp-stats__item">
                        <Icon icon="heart" 
                            iconClass="stroke-silver strokeWidth-2 mr-1"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">11</span>
                    </div>
                    <div className="comment sp-stats__item">
                        <Icon icon="messageCircle"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">0</span>
                    </div>
                    <div className="store sp-stats__item">
                        <Icon icon="package"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">0</span>
                    </div>
                    <div className="view sp-stats__item">
                        <Icon icon="eye" 
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">58</span>
                    </div>
                </div>

            </div>
        </div>
    );

};

/* Export */
export default AtomInfoSection;