/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import Icon from './../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomBoxProps = {
    atom: AtomModel,
    liked?: boolean,
    showCover?: boolean,
    onCoverClick?: (atom: AtomModel) => any,
    onLikeClick?: (atom: AtomModel) => any,
    onCoverMouseEnter?: () => any,
    onCoverMouseLeave?: () => any
};


/**
 * @desc Represent Atom Box
 * @function AtomBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class AtomBox extends React.Component<AtomBoxProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AtomBoxProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            atom, 
            liked, 
            showCover, 
            onCoverClick, 
            onCoverMouseLeave, 
            onCoverMouseEnter,
            onLikeClick
        } = this.props;

        // Like Button Classes
        const likeBtnClasses = classNames({
            'icon': true,
            'stroke-black': !liked,
            'strokeWidth-2': !liked,
            'active': liked
        });

        // Cover Link Classes
        const coverLinkClasses = classNames({
            'cover-link': true,
            'active': showCover
        });


        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
                <div className="AtomBox__content borderRadius-xs">

                    { !!onCoverClick &&

                        <div onClick={onCoverClick(atom)} 
                            onMouseEnter={onCoverMouseEnter}
                            onMouseLeave={onCoverMouseLeave}
                            className={coverLinkClasses}>

                            <div className="cover-link__header position-relative">
                                {atom.duplicated &&
                                <span className="sp-tag sp-tag--xs sp-tag--primary fontWeight-7 fontSmoothing-reset">
                                    Duplicated
                                </span>}

                                <div className="icon-container float-right"
                                    onClick={onLikeClick(atom)}>
                                    <Icon icon={liked ? 'heartFull' : 'heart'}
                                        iconClass={likeBtnClasses}
                                        width="23" height="23"/>
                                </div>
                            </div>

                            <div className="cover-link__content p-2">
                                <p className="color-silver fontSize-sm">
                                    {functionsUtil.truncateText(atom.description, 200)}
                                </p>

                                { !!atom.project &&
                                    <div className="d-flex pt-3 align-items-center borderTop-1 borderTopStyle-dashed borderColor-smoke fontFamily-poppins fontSize-sm fontWeight-5 color-slate">
                                        Belongs to 
                                        <span className="sp-tag sp-tag--xs sp-tag--neutral fontWeight-5 fontSmoothing-reset ml-2">
                                            {atom.project.name}
                                        </span>
                                    </div>
                                }
                                    
                            </div>
                            
                        </div>

                    }

                    <div className="Iframe-wrapper">
                        {this.props.children}
                    </div>

                </div>
            </div>
        );
    }
    
}


/* Export */
export default AtomBox;