/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { ColorResult } from 'react-color';

import { IRootState } from './../../../../reducer/reducer.config';

import { Basic as BasicColorModel } from './../../../../models/color/color.model';
import { RgbaColor as RgbaColorModel } from './../../../../models/rgbaColor/rgbaColor.model';

import SmallColorPicker from './../../../components/ColorPicker/SmallColorPicker/SmallColorPicker';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SmallColorPickerContainerProps = {
    defaultColors?: Array<string>;
    onChange: (color: BasicColorModel) => void;
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean;
};

/* Mapped State to Props */
type StateProps = {
    hex: string;
    rgba: RgbaColorModel;
};


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
            displayColorPicker: false
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

        const { hex, rgb } = color;

        this.props.onChange({ hex, rgba: rgb });

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        // Destructuring state
        const { displayColorPicker } = this.state;
        const { hex, defaultColors } = this.props;
        
        
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


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    // Destructuring state 
    const { ui } = state;
    const { colorPicker } = ui;
    const { currentColor } = colorPicker;
    const { hex, rgba } = currentColor;

    return {
        hex,
        rgba
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const smallColorPickerContainerConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    smallColorPickerContainerConnect
)(SmallColorPickerContainer);