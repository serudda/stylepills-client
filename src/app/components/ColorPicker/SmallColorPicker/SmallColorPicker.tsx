/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { TwitterPicker, ColorResult } from 'react-color';

import Icon from './../../Icon/Icon';
import { FormEvent } from 'react';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SmallColorPickerProps = {
    hex: string;
    displayColorPicker: boolean;
    defaultColors: Array<string>;
    onSwatchClick: (e: FormEvent<{}>) => void;
    onPickerChange: (color: ColorResult) => void;
    onClose: (e: FormEvent<{}>) => void;
};


/**
 * @desc Represent Small Color Picker
 * @function SmallColorPicker
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class SmallColorPicker extends React.Component<SmallColorPickerProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SmallColorPickerProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            hex,
            displayColorPicker,
            defaultColors,
            onSwatchClick,
            onPickerChange,
            onClose
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="SmallColorPicker">

                <div className="SmallColorPicker__swatch" onClick={onSwatchClick}>
                    <div className="SmallColorPicker__swatch__color"
                         style={{backgroundColor: `${ hex }`}} />
                    <Icon icon="chevronDown"
                        iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                        width="15" height="15"/>
                </div>

                { displayColorPicker &&
                    <div className="SmallColorPicker__popover">
                        <div className="SmallColorPicker__popover__cover" onClick={onClose}/>
                        <TwitterPicker color={hex} 
                                        colors={defaultColors}
                                        onChange={onPickerChange} 
                                        triangle="top-right"/>
                    </div>
                }

            </div>
        );
    }
    
}


/* Export */
export default SmallColorPicker;