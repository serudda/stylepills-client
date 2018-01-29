/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

import { User as UserModel } from './../../../models/user/user.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type InfoSectionProps = {
    title: string,
    stats?: {
        likes: number,
        stores: number,
        comments?: number,
        views: number
    },
    author: UserModel
};


/**
 * @desc Represent Info Section on a Box
 * @function InfoSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AtomInfoSection: React.SFC<InfoSectionProps> = ({
    title,
    stats,
    author
}) => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomInfo px-1">

            {/* Title */}
            <p className="m-0 fontSize-md fontFamily-poppins fontSmoothing-reset text-truncate">
                {title}
            </p>

            {/* Designed by */}
            { author &&
                <div className="AtomInfo__user">

                    <Link className="sp-designedBy sp-designedBy--xs link-reset fontFamily-poppins fontWeight-6 color-silver text-truncate"
                        to={`/user/${author.username}`}>
                        <span className="ml-1 order-3">{author.firstname} {author.lastname}</span>
                        <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                            <img width="22" height="22"
                                src={author.avatar} 
                                alt={author.username} />
                        </div>
                    </Link>

                </div>
            }

            {/* Stats */}
            { stats &&
                <div className="AtomInfo__stats">

                    <div className="sp-stats">

                        <div className="like sp-stats__item">
                            <Icon icon="heart" 
                                iconClass="stroke-silver strokeWidth-2 mr-1"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-7 color-silver">{stats.likes}</span>
                        </div>

                        <div className="comment sp-stats__item">
                            <Icon icon="messageCircle"
                                iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-7 color-silver">{stats.comments}</span>
                        </div>

                        <div className="store sp-stats__item">
                            <Icon icon="duplicate"
                                iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-7 color-silver">{stats.stores}</span>
                        </div>

                        <div className="view sp-stats__item">
                            <Icon icon="eye" 
                                iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                                width="14" height="14"/>
                            <span className="fontSize-sm fontWeight-7 color-silver">{stats.views}</span>
                        </div>

                    </div>

                </div>
            }

        </div>
    );

};

/* Export */
export default AtomInfoSection;