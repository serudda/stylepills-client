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
export type BannerAlertProps = {
    type: Option,
    text: string,
    showIcon?: boolean,
    className?: string
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
            showIcon = false,
            type
        } = this.props;

        let icon = '';

        switch (type) {
            case Option.positive:
                icon = 'alert';
                break;
            case Option.negative:
                icon = 'alert';
                break;
            case Option.info:
                icon = 'alert';
                break;
            case Option.warning:
                icon = 'alert';
                break;
            default:
                break;
        }
        
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
            text,
            className
        } = this.props;


        // Baner Alert Classes
        const bannerAlertClasses = classNames ({
            [`sp-bg-${type}`]: true,
            'w-100': true,
            'p-3': true,
            'px-4': true,
            'd-flex': true,
            'align-items-center': true,
            'zIndex-footer': true,
            [`${className}`]: !!className
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