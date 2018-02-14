/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import { Color as ColorModel, ColorTypeOptions } from '../../../models/color/color.model';
import { RgbaColor as RgbaColorModel } from './../../../models/rgbaColor/rgbaColor.model';

import AddColorForm from './../../../app/components/Forms/AddColorForm/AddColorForm';

const ntc = require('ntcjs');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddColorFormContainerProps = {
    title: string,
    description: string,
    type: ColorTypeOptions,
    colors: Array<ColorModel>,
    onAddClick: (newColor: ColorModel) => void;
    onDeleteClick: (color: ColorModel) => void;
};

/* Own States */
type LocalStates = {
    name: string,
    showForm: boolean
};

/* Mapped State to Props */
type StateProps = {
    hex: string;
    rgba: RgbaColorModel;
};

/* Mapped Dispatches to Props */
type DispatchProps = {};


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
            name: '',
            showForm: props.type === ColorTypeOptions.primary ? true : false
        };

        // Bind methods
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleAddClick = this._handleAddClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleShowFormClick = this._handleShowFormClick.bind(this);
        this._handleColorChange = this._handleColorChange.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc HandleColorChange
     * @method _handleColorChange
     * @example this._handleColorChange()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorChange(color: any) {
        const { rgb, hex } = color;
        const nameMatch = ntc.name(color.hex);

         // Update the state
         this.setState((previousState) => {
            return {
                ...previousState, 
                rgba: rgb, 
                hex,
                name: nameMatch[1] 
            };
        });
        
    }


    /**
     * @desc HandleInputChange
     * @method _handleInputChange
     * @example this._handleInputChange()
     * @private
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    private _handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            [name]: value
        }));
    }


    /**
     * @desc HandleShowFormClick
     * @method _handleShowFormClick
     * @example this._handleShowFormClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleShowFormClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ showForm: true });
    }


    /**
     * @desc HandleAddClick
     * @method _handleAddClick
     * @example this._handleAddClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleAddClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { type, hex, rgba } = this.props;
        const { name } = this.state;
        const { r, g, b, a } = rgba;

        // Create new color instance
        let color: ColorModel = {
            name,
            hex,
            type,
            rgba: {
                r,
                g,
                b,
                a
            }
        };
        
        if (this.props.onAddClick) {
            this.props.onAddClick(color);
        }
    }


    /**
     * @desc HandleDeleteClick
     * @method _handleDeleteClick
     * @example this._handleDeleteClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleDeleteClick = (color: ColorModel) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        
        if (this.props.onDeleteClick) {
            this.props.onDeleteClick(color);
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { type, title, description } = this.props;
        const { showForm } = this.state;

        
        /*         MARKUP          */
        /***************************/
        return (

            <AddColorForm label={title}
                          helpMsg={description}
                          colorType={type}
                          showForm={showForm}
                          inputValue={name}
                          onAddClick={this._handleAddClick}
                          onShowFormClick={this._handleShowFormClick}
                          onInputNameColorChange={this._handleInputChange}/>
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
const addColorFormContainerConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    addColorFormContainerConnect
)(AddColorFormContainer);