/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { ColorResult } from 'react-color';

import { IRootState } from './../../../../reducer/reducer.config';

import { Basic as BasicColorModel } from './../../../../models/color/color.model';

import ColorService from './../../../../models/color/color.service';

import { changeColorAction } from './../../../../actions/ui.action';

import { getCurrentColor } from './../../../../selectors/ui.selector';

import SmallColorPicker from './../../../components/ColorPicker/SmallColorPicker/SmallColorPicker';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SmallColorPickerContainerProps = {
    onChange?: (color: BasicColorModel) => void;
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
            changeColor: (color: BasicColorModel) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SmallColorPickerContainer 
extends React.Component<ChildProps<SmallColorPickerContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLORS_LIST: Array<string> = [
        '#273444', 
        '#3C4858', 
        '#8492A6', 
        '#E0E6ED', 
        '#EFF2F7',
        '#976B55',
        '#7BDCB5', 
        '#0693E3', 
        '#FFF78A', 
        '#EC7D7D'
    ];
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SmallColorPickerContainerProps & StateProps & DispatchProps, {}>) {
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
        const name = ColorService.generateColorName(hex);

        // If receive an parent's onChange method
        if (this.props.onChange) {
            this.props.onChange({ hex, rgba: rgb, name });
        } else {
            // If not receive a parent's onChange method, default action.
            this.props.actions.ui.changeColor({ hex, rgba: rgb, name });
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        // Destructuring state
        const { displayColorPicker } = this.state;
        const { color } = this.props;
        
        
        /*         MARKUP          */
        /***************************/
        return (
            <SmallColorPicker hex={color.hex} 
                              displayColorPicker={displayColorPicker}
                              defaultColors={this._DEFAULT_COLORS_LIST}
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
    return {
        color: getCurrentColor(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color: BasicColorModel) => dispatch(changeColorAction(color))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const smallColorPickerContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    smallColorPickerContainerConnect
)(SmallColorPickerContainer);