/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Link } from 'react-router-dom';

import * as appConfig from './../../../../core/constants/app.constants';

import { Atom as AtomModel } from './../../../../models/atom/atom.model';

import Icon from './../../Icon/Icon';

import AtomDetailsBoxContainer from './../../../../components/common/AtomDetailsBox/AtomDetailsBox.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsModalProps = {
    atom: AtomModel,
    loading: boolean,
    error: any
};


/**
 * @desc Represent Atom Details Modal
 * @function AtomDetailsModalProps
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class AtomDetailsModal extends React.Component<AtomDetailsModalProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AtomDetailsModalProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Build Loading screen
     * @method _buildLoading
     * @example this._buildLoading()
     * @private
     * @returns {JSX.Element}
     */
    private _buildLoading(): JSX.Element {

        return (
            <ul className="sp-messageBlock m-0 mx-4 mt-4">
                <li className="sp-messageBlock__container sp-messageBlock__container--md">
                    <Icon icon="loader"
                        iconClass="sp-loader"
                        color={appConfig.SECONDARY_COLOR_HEX}
                        width="80" height="80"/>
                    <div className="text text--xs color-slate fontFamily-openSans fontWeight-7 mt-3">
                        Loading component...
                    </div>
                </li>
            </ul>
        );
        
    }


    /**
     * @desc Build No Data Message
     * @method _buildNoData
     * @example this._buildNoData()
     * @private
     * @returns {JSX.Element}
     */
    private _buildNoData(): JSX.Element {

        return (
            <ul className="sp-messageBlock m-0 mx-4 mt-4">
                <li className="sp-messageBlock__container sp-messageBlock__container--md">
                    <div className="icon icon--md icon--noResult mt-4 mb-3" />
                    <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                        We couldn’t find the component that match.
                    </div>
                </li>
            </ul>
        );
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            atom, 
            loading,
            error
        } = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return this._buildLoading();
        }

        if (error) {
            return (<p className="fontSize-xl color-steel">{error.message}</p>);
        }

        if (atom === null) {
            return this._buildNoData();
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div>

                {/* Atom name */}
                <div className="d-flex align-items-center fontFamily-openSans fontWeight-7 fontSize-xl color-silver mt-5">
                    {atom.name}
                    {atom.duplicated &&
                    <span className="sp-tag sp-tag--xs sp-tag--primary fontWeight-7 fontSmoothing-reset ml-2">
                        Duplicated
                    </span>}
                </div>

                {/* Atom description */}
                { !!atom.description && 
                <div className="fontFamily-openSans fontWeight-5 fontSize-lg color-silver mt-1">
                    {atom.description}
                </div>}

                {/* Atom creation info */}
                <div className="d-flex align-items-center mt-3">

                    { !!atom.project &&
                        <div className="fontFamily-poppins fontSize-sm fontWeight-5 color-slate">
                            Belongs to
                            <Link to={`/project/${atom.project.id}`} target="_blank">
                                <span className="sp-tag sp-tag--xs sp-tag--white fontWeight-5 fontSmoothing-reset ml-2 boxShadow-close">
                                    {atom.project.name}
                                </span>
                            </Link>
                            <span className="mx-3 borderLeft-1 borderColor-darkSmoke" />
                        </div>
                    }

                    <Link className="sp-designedBy sp-designedBy--sm link-reset fontFamily-poppins fontWeight-5 color-slate text-truncate"
                        to={`/user/${atom.author.username}`} target="_blank">
                        <span className="order-1">by</span>
                        <span className="ml-2 order-3">{atom.author.firstname} {atom.author.lastname}</span>
                        <div className="sp-avatar sp-avatar--xxxs borderRadius-circle ml-2 order-2">
                            <img width="22" height="22"
                                src={atom.author.avatar} 
                                alt={atom.author.username} />
                        </div>
                    </Link>

                </div>

                {/* Atom Details Container */}
                <div className="mt-5">
                    <AtomDetailsBoxContainer atom={atom}/>
                </div>
            </div>
        );
    }
    
}


/* Export */
export default AtomDetailsModal;