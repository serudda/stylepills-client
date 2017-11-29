/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type UserStatsProps = {
    followers: number;
    following: number;
    components: number;
};


/**
 * @desc Represent User Stats
 * @function UserStats
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const UserStats: React.SFC<UserStatsProps> = ({ followers = 0, following = 0, components = 0 }) => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <ul className="UserStats color-slate p-0 m-0">
            <li className="UserStats__item pr-3 borderRight-1 borderColor-smoke text-center">
                <div className="fontWeight-9 mb-1">{followers}</div>
                <span className="UserStats__item__text fontSmoothing-reset color-silver">FOLLOWERS</span>
            </li>
            <li className="pr-3 ml-3 borderRight-1 borderColor-smoke text-center">
                <div className="fontWeight-9 mb-1">{following}</div>
                <span className="UserStats__item__text fontSmoothing-reset color-silver">FOLLOWING</span>
            </li>
            <li className="ml-3 text-center">
                <div className="fontWeight-9 mb-1">{components}</div>
                <span className="UserStats__item__text fontSmoothing-reset color-silver">COMPONENTS</span>
            </li>
        </ul>
    );
    
};


/* Export */
export default UserStats;