/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { SketchPicker, ColorResult } from 'react-color';

import * as appConfig from './../../../../core/constants/app.constants';

import { RgbaColor as RgbaColorModel } from './../../../../models/rgbaColor/rgbaColor.model';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type InputColorPickerProps = {
    hex: string;
    rgba: RgbaColorModel;
    displayColorPicker: boolean;
    onSwatchClick: (e: React.FormEvent<{}>) => void;
    onInputChange: (e: React.FormEvent<{}>) => void;
    onPickerChange: (color: ColorResult) => void;
    onClose: (e: React.FormEvent<{}>) => void;
};


/**
 * @desc Represent Input Color Picker
 * @function InputColorPicker
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class InputColorPicker extends React.Component<InputColorPickerProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: InputColorPickerProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            hex,
            rgba,
            displayColorPicker,
            onSwatchClick,
            onInputChange,
            onPickerChange,
            onClose
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="InputColorPicker sp-inputGroup sp-inputGroup--color sp-inputGroup--color--md mr-3">
                            
                <div className="context" 
                    onClick={onSwatchClick}
                    style={{
                        background: `rgba(${ rgba.r }, ${ rgba.g }, ${ rgba.b }, ${ rgba.a })`
                        }}/>
                
                <input type="text" 
                        placeholder={`${appConfig.SECONDARY_COLOR_HEX}`} 
                        className="input" 
                        value={hex}
                        onClick={onInputChange}
                        readOnly={true}/>
                
                {/* Color Picker */}
                {displayColorPicker && 
                    <div className="InputColorPicker__popover">
                        <div className="InputColorPicker__popover__cover" onClick={onClose}/>
                        <SketchPicker color={rgba} onChange={onPickerChange}/>
                    </div>
                }

            </div>
            
        );
    }
    
}


/* Export */
export default InputColorPicker;