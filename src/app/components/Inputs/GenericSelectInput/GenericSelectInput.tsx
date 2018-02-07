/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as appConfig from './../../../../core/constants/app.constants';

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
    loading: boolean;
    error: any;
    disabled?: boolean;
    onChange: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Generic Select Input
 * @function GenericSelectInput
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class GenericSelectInput extends React.Component<GenericSelectInputProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: GenericSelectInputProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Build Select List
     * @method _buildSelectList
     * @example this._buildSelectList()
     * @private
     * @returns {JSX.Element}
     */
    private _buildSelectList(): JSX.Element {

        // Destructuring props
        const {loading, 
               error,
               value,
               name,
               options,
               defaultOption,
               size = SizeOption.md,
               disabled = false,
               isBlock = false,
               onChange} = this.props;
        
        // Input Classes
        const selectClasses = classNames({
            'sp-select': true,
            'sp-select--input': true,
            [`sp-select--${size}`]: true,
            'sp-input--block': isBlock
        });

        if (loading) {
            return (
                <div className="sp-select-container d-flex flex-row">
                    <select value={value} onChange={onChange}
                            className={selectClasses}
                            name={name}
                            disabled={disabled}>
                        <option key="0" value="0">Loading...</option>
                    </select>
                    <Icon icon="loader"
                            iconClass="icon sp-loader"
                            color={appConfig.SECONDARY_COLOR_HEX}
                            width="18" height="18"/>
                </div>
            );
        }

        if (error) {
            return (
                <div className="sp-select-container d-flex flex-row">
                    <select className={selectClasses}
                            disabled={disabled}>
                        <option key="0" value="0" disabled={true} selected={true}>Something is wrong</option>
                    </select>
                    <Icon icon="alert"
                            iconClass="icon stroke-negative strokeWidth-2 ml-1"
                            color={appConfig.NEGATIVE_COLOR_HEX}
                            width="18" height="18"/>
                </div>
            );
        }

        if (options.length === 0) {
            return (
                <div className="sp-select-container d-flex flex-row">
                    <select className={selectClasses}
                            disabled={disabled}>
                        <option key="0" value="0" disabled={true} selected={true}>No data found</option>
                    </select>
                    <Icon icon="alert"
                            iconClass="icon stroke-negative strokeWidth-2 ml-1"
                            color={appConfig.NEGATIVE_COLOR_HEX}
                            width="18" height="18"/>
                </div>
            );
        }

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
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {    
    

        /*         MARKUP          */
        /***************************/
        return this._buildSelectList();

    }
    
}


/* Export */
export default GenericSelectInput;