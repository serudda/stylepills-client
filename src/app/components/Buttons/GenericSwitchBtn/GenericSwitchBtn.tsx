/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible size options */
export enum SizeOption {
    sm = 'sm',
    md = 'md',
    lg = 'lg'
}

/* Possible shape options */
export enum ShapeOption {
    circle = 'circle',
    square = 'square'
}


/* Possible ON Type options */
export enum OnTypeOption {
    primary = 'primary',
    secondary = 'secondary'
}


/* Possible OFF Type options */
export enum OffTypeOption {
    neutral = 'neutral',
    white = 'white'
}


/* Own Props */
type GenericSwitchBtnProps = {
    name: string
    size?: SizeOption
    shape?: ShapeOption
    onType?: OnTypeOption
    offType?: OffTypeOption
    isRaised?: boolean
    isOn: boolean
    disabled?: boolean
    onChange: (e: React.FormEvent<{}>) => any
    className?: string
};


/**
 * @desc Represent Generic Switch Btn: On/Off
 * @function GenericSwitchBtn
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const GenericSwitchBtn: React.SFC<GenericSwitchBtnProps> = ({
    name,
    size = SizeOption.md,
    shape = ShapeOption.circle,
    onType = OnTypeOption.primary,
    offType = OffTypeOption.neutral,
    isRaised = false,
    disabled = false,
    isOn = false,
    onChange,
    className
 }) => {

    // Switch Classes
    const switchClasses = classNames({
        'sp-switch-btn':  true,
        [`sp-switch-btn--${size}`]: true,
        [`sp-switch-btn--${shape}`]: true,
        [`sp-switch-btn--on-${onType}`]: true,
        [`sp-switch-btn--off-${offType}`]: true, 
        'boxShadow-close': isRaised, 
        'active': isOn,
        [`${className}`]: !!className
    });
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className={switchClasses}>
            <input name={name} 
                    type="checkbox"
                    checked={isOn}
                    onChange={onChange}
                    className="cb-value" />
            <span className="inner-btn boxShadow-raised" />
        </div>
    );
    
};


/* Export */
export default GenericSwitchBtn;