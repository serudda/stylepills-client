/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible options */
export enum Option {
    positive = 'positive',
    negative = 'negative',
    info = 'info',
    warning = 'warning'
}

/* Own Props */
type BannerAlertProps = {
    type: Option,
    text: string,
    showIcon: boolean
};


/**
 * @desc Represent Banner Alert
 * @function BannerAlert
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class BannerAlert extends React.Component<BannerAlertProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: BannerAlertProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Build Icon
     * @method _buildIcon
     * @example this._buildIcon()
     * @private
     * @returns {void}
     */
    private _buildInfoSection() {

        // Destructuring props
        const {
            showIcon,
            type
        } = this.props;

        let icon = '';

        icon = type === 'positive' && 'alert';
        icon = type === 'negative' && 'alert';
        icon = type === 'warning'  && 'alert';
        icon = type === 'info'     && 'alert';
        
        if (showIcon) {
            return (
                <Icon icon={icon} iconClass="strokeWidth-2 stroke-white mr-2" width="22" height="22"/>
            );
        }

        return false;
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            type,
            text
        } = this.props;


        // Baner Alert Classes
        const bannerAlertClasses = classNames ({
            [`sp-bg-${type}`]: true,
            'w-100': true,
            'p-3': true,
            'px-4': true,
            'd-flex': true,
            'align-items-center': true,
            'position-absolute': true,
            'zIndex-footer': true
        });


        /*         MARKUP          */
        /***************************/
        return (
            <div className={bannerAlertClasses}>

                {/* Show Icon */}
                {this._buildInfoSection()}
                
                <span className="fontSize-md color-white fontWeight-9">
                    {text}
                </span>

            </div>
        );

    }

}

/* Export */
export default BannerAlert;