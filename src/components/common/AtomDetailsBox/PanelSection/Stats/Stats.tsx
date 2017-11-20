/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Icon from './../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
// TODO: Cuando devolvamos la cantidad de comentarios, remover el ?
type StatsProps = {
    likes: number,
    comments?: number,
    stores: number,
    views: number
};


/**
 * @desc Represent Stats Section in Atom Details Box (Panel Section)
 * @function Stats
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns section view
 */
const Stats: React.SFC<StatsProps> = ({ likes = 0, stores = 0, comments = 0, views = 0 }) => {

    
    /*         MARKUP          */
    /***************************/
    
    return (
        <div className="Stats sp-stats">
            <div className="like sp-stats__item">
                <Icon icon="heart" 
                    iconClass="stroke-silver strokeWidth-2 mr-1"
                    width="16" height="16"/>
                <span className="fontSize-md fontWeight-9 color-silver">
                    {likes}
                </span>
            </div>
            <div className="comment sp-stats__item">
                <Icon icon="messageCircle"
                    iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                    width="16" height="16"/>
                <span className="fontSize-md fontWeight-9 color-silver">
                    {comments}
                </span>
            </div>
            <div className="store sp-stats__item">
                <Icon icon="package"
                    iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                    width="16" height="16"/>
                <span className="fontSize-md fontWeight-9 color-silver">
                    {stores}
                </span>
            </div>
            <div className="view sp-stats__item">
                <Icon icon="eye" 
                    iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                    width="16" height="16"/>
                <span className="fontSize-md fontWeight-9 color-silver">
                    {views}
                </span>
            </div>
        </div>
    );
    
};


/* Export */
export default Stats;