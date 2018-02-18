/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { ColorResult } from 'react-color';

import * as appConfig from './../../../../core/constants/app.constants';

import { Basic as BasicColorModel, ColorTypeOptions } from './../../../../models/color/color.model';
import ColorService from './../../../../models/color/color.service';

import { IRootState } from './../../../../reducer/reducer.config';
import { changeColorAction } from './../../../../actions/ui.action';
import { makeGetCurrentColor } from './../../../../selectors/ui.selector';

import InputColorPicker from './../../../components/ColorPicker/InputColorPicker/InputColorPicker';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type InputColorPickerContainerProps = {
    colorType?: ColorTypeOptions
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean;
};

/* Mapped State to Props */
type StateProps = {
    color: BasicColorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeColor: (color: BasicColorModel, colorType: ColorTypeOptions) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class InputColorPickerContainer 
extends React.Component<ChildProps<InputColorPickerContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<InputColorPickerContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        this.state = {
            displayColorPicker: false
        };

        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc Handle Click
     * @method handleClick
     * @example this.handleClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }


    /**
     * @desc Handle Close
     * @method handleClose
     * @example this.handleClose()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleClose(e: React.FormEvent<{}>) {
        this.setState({ displayColorPicker: false });
    }
    

    /**
     * @desc Handle Change
     * @method handleChange
     * @example this.handleChange()
     * @public
     * @returns {void}
     */
    handleChange(color: ColorResult) {
        const { hex, rgb } = color;
        const name = ColorService.generateColorName(hex);

        this._changeColor({hex, rgba: rgb, name});
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Change Color of Color Picker
     * @method _changeColor
     * @example this._changeColor()
     * @private 
     * @returns {void}
     */
    private _changeColor(color: BasicColorModel) {
        const { colorType } = this.props;
        this.props.actions.ui.changeColor(color, colorType);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        // Destructuring state
        const { displayColorPicker } = this.state;
        const { color = {
            hex: appConfig.SECONDARY_COLOR_HEX,
            name: appConfig.SECONDARY_COLOR_NAME,
            rgba: appConfig.SECONDARY_COLOR_RGBA
        } } = this.props;
        
        
        /*         MARKUP          */
        /***************************/
        return (
            <InputColorPicker hex={color.hex} 
                            rgba={color.rgba} 
                            displayColorPicker={displayColorPicker}
                            onSwatchClick={this.handleClick}
                            onPickerChange={this.handleChange}
                            onClose={this.handleClose}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
const makeMapStateToProps = () => { // NOTE: 1
    const getCurrentColor = makeGetCurrentColor();
    const mapStateToProps = (state: IRootState, ownProps: InputColorPickerContainerProps) => {
        return {
            color: getCurrentColor(state, ownProps)
        };
    };
    return mapStateToProps;
};


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color, colorType) => dispatch(changeColorAction(color, colorType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const inputColorPickerContainerConnect = connect(makeMapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    inputColorPickerContainerConnect
)(InputColorPickerContainer);