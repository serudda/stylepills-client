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


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SmallColorPickerContainerProps = {
    onChange?: (color: BasicColorModel) => void
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean
};


//    REDUX MAPPED PROPS & STATES
// ===================================

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


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SmallColorPickerContainerProps
&   StateProps
&   DispatchProps;



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SmallColorPickerContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLORS_LIST: Array<string> = [
        '#273444', '#3C4858', '#8492A6', 
        '#E0E6ED', '#EFF2F7', '#976B55',
        '#7BDCB5', '#0693E3', '#FFF78A', '#EC7D7D'
    ];
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
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
                              onSwatchClick={this.handleClick}
                              onPickerChange={this.handleChange}
                              onClose={this.handleClose}/>
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