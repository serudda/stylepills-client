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

/* Own Props */
type AddColorFormProps = {
    value: string | number | string[];
    name: string;
    size?: SizeOption;
    isBlock?: boolean;
    placeholder: string;
    disabled?: boolean;
    onChange: (e: React.FormEvent<{}>) => any;
    className?: string
};


/**
 * @desc Represent Add Color Form
 * @function AddColorForm
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AddColorForm: React.SFC<AddColorFormProps> = ({
    value,
    name,
    placeholder,
    size = SizeOption.md,
    disabled = false,
    isBlock = false,
    onChange,
    className
 }) => {

    // Input Classes
    const inputClasses = classNames({
        'sp-input': true, 
        [`sp-input--${size}`]: true,
        'sp-input--block': isBlock,
        [`${className}`]: !!className
    });    
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <input type="text"
                placeholder={placeholder}
                className={inputClasses}
                value={value}
                name={name}
                disabled={disabled}
                onChange={onChange} />
    );
    
};


/* Export */
export default AddColorForm;