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

/* Possible size options */
export enum SizeOption {
    sm = 'sm',
    md = 'md',
    lg = 'lg'
}

type OptionType = {
    id: number,
    name: string
};

/* Own Props */
type GenericSelectInputProps = {
    value: string | number | string[];
    name: string;
    size?: SizeOption;
    isBlock?: boolean;
    defaultOption: string;
    options: Array<OptionType>;
    disabled?: boolean;
    onChange: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Generic Select Input
 * @function GenericSelectInput
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const GenericSelectInput: React.SFC<GenericSelectInputProps> = ({
    value,
    name,
    options,
    defaultOption,
    size = SizeOption.md,
    disabled = false,
    isBlock = false,
    onChange
 }) => {

    // Input Classes
    const selectClasses = classNames({
        'sp-select': true,
        'sp-select--input': true,
        [`sp-select--${size}`]: true,
        'sp-input--block': isBlock
    });    
    
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="sp-select-container d-flex flex-row">
            <select value={value} onChange={onChange}
                    className={selectClasses}
                    name={name}
                    disabled={disabled}>
                <option key="0" value="0">{defaultOption}</option>
                {options.map((option: OptionType) => (
                    <option key={option.id} value={option.id}>{option.name}</option>    
                ))}
            </select>
            <Icon icon="chevronDown"
                iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                width="15" height="15"/>
        </div>
    );
    
};


/* Export */
export default GenericSelectInput;