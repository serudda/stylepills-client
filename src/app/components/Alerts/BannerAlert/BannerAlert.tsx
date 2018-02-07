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
    id?: string,
    type: Option,
    text: string,
    showIcon?: boolean,
    className?: string,
    readonly onCloseClick?: (id: string) => any;
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
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private 
     * @param {string} id - alert id
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleClick = (id: string) => (e: any) => {
        e.preventDefault();
        if (this.props.onCloseClick) {
            this.props.onCloseClick(id);
        }
    }


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
                <Icon icon={icon} 
                      iconClass="strokeWidth-2 stroke-white mr-2" 
                      width="22" height="22"/>
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
            id,
            type,
            text,
            className
        } = this.props;


        // Baner Alert Classes
        const bannerAlertClasses = classNames ({
            'BannerAlert': true,
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

                <span className="icon-btn d-flex ml-auto" onClick={this._handleClick(id)}>
                    <Icon icon="close"
                        iconClass="strokeWidth-2 stroke-white"
                        width="22" height="22"/>
                </span>

            </div>
        );

    }

}

/* Export */
export default BannerAlert;