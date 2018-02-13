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
    showDeleteBtn?: boolean,
    forceToShow?: boolean,
    className?: string,
    onCloseClick?: (id: string) => any;
};

/* Own States */
type LocalStates = {
    hide: boolean
};


/**
 * @desc Represent Banner Alert
 * @function BannerAlert
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class BannerAlert extends React.Component<BannerAlertProps, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: BannerAlertProps) {
        super(props);

        this.state = {
            hide: false
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleClick(e: React.FormEvent<{}>) {
        // Destructuring props
        const { id, onCloseClick } = this.props;

        e.preventDefault();
        if (onCloseClick) {
            onCloseClick(id);
        } else {
            this.setState({ hide: true });
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

        // Destructuring props & state
        const {
            type,
            text,
            className,
            showDeleteBtn = true
        } = this.props;

        const { hide } = this.state;



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
            <div>
            {!hide &&
                <div className={bannerAlertClasses}>

                    {/* Show Icon */}
                    {this._buildInfoSection()}
                    
                    <span className="fontSize-md color-white fontWeight-9">
                        {text}
                    </span>

                    { showDeleteBtn &&
                        <span className="icon-btn d-flex ml-auto" onClick={this._handleClick}>
                            <Icon icon="close"
                                iconClass="strokeWidth-2 stroke-white"
                                width="22" height="22"/>
                        </span>
                    }

                </div>
            }
            </div>
        );

    }

}

/* Export */
export default BannerAlert;