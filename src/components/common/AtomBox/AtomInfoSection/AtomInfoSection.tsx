/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Atom } from '../../../../models/atom/atom.model';

// import BasicModal from '../../Modal/BasicModal';
import Icon from '../../Icon/Icon';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
interface AtomInfoSectionProps extends Atom {}


/**
 * @desc Represent UI Atom Info Section
 * @function AtomInfoSection
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AtomInfoSection: React.SFC<AtomInfoSectionProps> = ({
    name, 
    likes, 
    stores,
    comments, 
    views,
    author
}) => {


    /*         MARKUP          */
    /***************************/
    return (
        <div className="AtomInfo px-1">

            {/* Atom Name */}
            <p className="m-0 fontWeight-9 fontSize-md fontFamily-poppins fontSmoothing-reset text-truncate">
                {name}
            </p>

            {/* Designed by */}
            <div className="AtomInfo__user">

                <Link className="sp-designedBy sp-designedBy--xs link-reset fontFamily-poppins fontWeight-6 color-silver text-truncate"
                      to={`estudiar_url`}>
                    <span className="ml-1 order-3">{author.firstname} {author.lastname}</span>
                    <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-1 order-2">
                        <img width="22" height="22"
                            src={author.avatar} 
                            alt={author.username} />
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
                        <span className="fontSize-sm fontWeight-9 color-silver">{likes}</span>
                    </div>

                    {/*
                    // TODO: Traer count desde Sequelize: 
                        http://static.html-js.com/sequelizejs/index.html#
                    <div className="comment sp-stats__item">
                        <Icon icon="messageCircle"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">{comments}</span>
                    </div>
                    */}

                    <div className="store sp-stats__item">
                        <Icon icon="package"
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">{stores}</span>
                    </div>

                    <div className="view sp-stats__item">
                        <Icon icon="eye" 
                            iconClass="stroke-silver strokeWidth-2 mr-1 marginLeft-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-9 color-silver">{views}</span>
                    </div>

                </div>

            </div>
        </div>
    );

};

/* Export */
export default AtomInfoSection;