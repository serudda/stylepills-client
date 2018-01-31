/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { ColorResult } from 'react-color';

import * as appConfig from './../../../../core/constants/app.constants';

import { Basic as BasicColorModel } from './../../../../models/color/color.model';
import { RgbaColor as RgbaColorModel } from './../../../../models/rgbaColor/rgbaColor.model';

import SmallColorPicker from './../../../components/ColorPicker/SmallColorPicker/SmallColorPicker';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SmallColorPickerContainerProps = {
    defaultHexColor?: string;
    defaultRgbaColor?: RgbaColorModel;
    defaultColors?: Array<string>;
    onChange: (color: BasicColorModel) => void;
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean;
    color: BasicColorModel;
    defaultColors: Array<string>;
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SmallColorPickerContainer 
extends React.Component<ChildProps<SmallColorPickerContainerProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SmallColorPickerContainerProps & StateProps, {}>) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: {
                hex: props.defaultHexColor || appConfig.SECONDARY_COLOR_HEX,
                rgba: props.defaultRgbaColor || null
            },
            defaultColors: props.defaultColors
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Handle Click
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }


    /**
     * @desc Handle Close
     * @method _handleClose
     * @example this._handleClose()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleClose(e: React.FormEvent<{}>) {
        this.setState({ displayColorPicker: false });
    }
    

    /**
     * @desc Handle Change
     * @method _handleChange
     * @example this._handleChange()
     * @private
     * @returns {void}
     */
    private _handleChange(color: ColorResult) {
        this.setState({ 
            color: {
                hex: color.hex,
                rgba: color.rgb
            }
        }, () => {
            this.props.onChange(this.state.color);
        });
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        // Destructuring state
        const { color, defaultColors, displayColorPicker } = this.state;
        const { hex } = color;
        
        
        /*         MARKUP          */
        /***************************/
        return (
            <SmallColorPicker hex={hex} 
                              displayColorPicker={displayColorPicker}
                              defaultColors={defaultColors}
                              onSwatchClick={this._handleClick}
                              onPickerChange={this._handleChange}
                              onClose={this._handleClose}/>
        );

    }

}


/*         EXPORT          */
/***************************/
export default SmallColorPickerContainer;