/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible type options */
export enum TypeOption {
    primary = 'primary',
    secondary = 'secondary',
    neutral = 'neutral',
    primaryGhost = 'primary-ghost',
    secondaryGhost = 'secondary-ghost',
    whiteGhost = 'white-ghost',
    blackGhost = 'black-ghost'
}

/* Possible size options */
export enum SizeOption {
    sm = 'sm',
    md = 'md',
    lg = 'lg'
}

/* Own Props */
type GenericBtnProps = {
    type?: TypeOption
    size?: SizeOption
    label: string
    disabled?: boolean
    onClick: (e: React.FormEvent<{}>) => any
    className?: string
};


/**
 * @desc Represent Generic Button
 * @function GenericBtn
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const GenericBtn: React.SFC<GenericBtnProps> = ({ 
    type = TypeOption.secondary,
    size = SizeOption.md,
    label,
    disabled,
    onClick,
    className
 }) => {

    // Tab Btn Classes
    const btnClasses = classNames({
        'sp-btn': true, 
        [`sp-btn--${type}`]: true,
        [`sp-btn--${size}`]: true,
        [`${className}`]: !!className
    });    
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <button className={btnClasses} 
                onClick={onClick}
                disabled={disabled}>
            {label}
        </button>
    );
    
};


/* Export */
export default GenericBtn;