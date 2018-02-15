/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import {
    changeColorAction,
    addColorItemAction,
} from './../../../../actions/ui.action';

import { 
    Basic as BasicColorModel,
    Color as ColorModel, 
    ColorTypeOptions 
} from './../../../../models/color/color.model';
import { RgbaColor as RgbaColorModel } from './../../../../models/rgbaColor/rgbaColor.model';

import AddColorForm from './../../../components/Forms/AddColorForm/AddColorForm';

// const ntc = require('ntcjs');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddColorFormContainerProps = {
    label: string,
    helpMsg: string,
    colorType: ColorTypeOptions
};

/* Own States */
type LocalStates = {
    showForm: boolean
};

/* Mapped State to Props */
type StateProps = {
    hex: string;
    rgba: RgbaColorModel;
    name: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            addColorItem: (color: ColorModel) => void;
            changeColor: (color: BasicColorModel) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddColorFormContainer 
extends React.Component<ChildProps<AddColorFormContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AddColorFormContainerProps & StateProps & DispatchProps, {}>) {

        super(props);

        // Init local state
        this.state = {
            showForm: props.colorType === ColorTypeOptions.primary ? true : false
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleShowFormClick = this.handleShowFormClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method handleInputChange
     * @example this.handleInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { hex, rgba } = this.props;
        const target = e.target;
        const value = target.value;

        // Receive input change value and save it on Store NOTE: 1
        this.props.actions.ui.changeColor({hex, rgba, name: value});
    }


    /**
     * @desc HandleShowFormClick
     * @method handleShowFormClick
     * @example this.handleShowFormClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    handleShowFormClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ showForm: true });
    }


    /**
     * @desc HandleAddClick
     * @method handleAddClick
     * @example this.handleAddClick()
     * @public
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    handleAddClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { colorType, hex, rgba, name } = this.props;
        const { r, g, b, a } = rgba;

        // Create new color instance
        let color: ColorModel = {
            name,
            hex,
            type: colorType,
            rgba: {
                r,
                g,
                b,
                a
            }
        };
        
        this.props.actions.ui.addColorItem(color);
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { colorType, label, helpMsg, name } = this.props;
        const { showForm } = this.state;

        
        /*         MARKUP          */
        /***************************/
        return (

            <AddColorForm label={label}
                          helpMsg={helpMsg}
                          colorType={colorType}
                          showForm={showForm}
                          inputValue={name}
                          inputName="colorName"
                          onAddClick={this.handleAddClick}
                          onShowFormClick={this.handleShowFormClick}
                          onInputNameColorChange={this.handleInputChange}/>
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
    const { hex, rgba, name } = currentColor;

    return {
        hex,
        rgba,
        name
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color) => dispatch(changeColorAction(color)),
                addColorItem: (color) => dispatch(addColorItemAction(color))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const addColorFormContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    addColorFormContainerConnect
)(AddColorFormContainer);


/*
(1): No uso localState ya que se me complicaba mantener el valor de State Store, y el local State sincronizados,
Asi que la mejor fue omitir en este caso el setState del input, y enviar directamente el valor al Store con la
action: changeColor
*/