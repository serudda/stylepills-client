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
type GenericTextareaProps = {
    value: string | number | string[]
    name: string
    rows: number
    cols: number
    size?: SizeOption
    isBlock?: boolean
    placeholder: string
    disabled?: boolean
    onChange: (e: React.FormEvent<{}>) => any
    className?: string
};


/**
 * @desc Represent Generic Textarea
 * @function GenericTextarea
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const GenericTextarea: React.SFC<GenericTextareaProps> = ({
    value,
    name,
    rows = 3,
    cols = 40,
    placeholder,
    size = SizeOption.md,
    disabled = false,
    isBlock = false,
    onChange,
    className
 }) => {

    // Textarea Classes
    const textareaClasses = classNames({
        'sp-textarea': true, 
        [`sp-textarea--${size}`]: true,
        'sp-textarea--block': isBlock,
        [`${className}`]: !!className
    });    
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <textarea name={name}
                value={value}
                onChange={onChange}
                className={textareaClasses}
                placeholder={placeholder}
                rows={rows} cols={cols} />
    );
    
};


/* Export */
export default GenericTextarea;