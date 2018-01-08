/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { SketchPicker } from 'react-color';

import Icon from './../../common/Icon/Icon';
import { Color as ColorModel } from '../../../models/color/color.model';
import ColorsList from './../ColorsList/ColorsList';

const ntc = require('ntcjs');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

type ColorRGBA = {
    r: number,
    g: number,
    b: number,
    a: number
};

/* Own Props */
type AddColorFormProps = {
    title: string,
    description: string,
    type: string,
    colors: Array<ColorModel>,
    onAddClick: (newColor: ColorModel) => void;
    onDeleteClick: (color: ColorModel) => void;
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean,
    rgba: ColorRGBA,
    hex: string,
    name: string,
    showForm: boolean
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddColorForm 
extends React.Component<ChildProps<AddColorFormProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AddColorFormProps & StateProps & DispatchProps, {}>) {

        super(props);

        // Init local state
        this.state = {
            displayColorPicker: false,
            rgba: {
                r: 253,
                g: 249,
                b: 128,
                a: 100
            },
            hex: '',
            name: '',
            showForm: props.type === 'primary' ? true : false
        };

        // Bind methods
        this._handleAddClick = this._handleAddClick.bind(this);
        this._handleDeleteClick = this._handleDeleteClick.bind(this);
        this._handleShowFormClick = this._handleShowFormClick.bind(this);
        this._handleColorClick = this._handleColorClick.bind(this);
        this._handleColorChange = this._handleColorChange.bind(this);
        this._handleColorCloseClick = this._handleColorCloseClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleColorClick
     * @method _handleColorClick
     * @example this._handleColorClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }


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
     * @desc HandleColorCloseClick
     * @method _handleColorCloseClick
     * @example this._handleColorCloseClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleColorCloseClick (e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ displayColorPicker: false });
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

        const { type } = this.props;
        const { name, hex, rgba } = this.state;
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
        const { type, title, description, colors } = this.props;
        const { name, hex, rgba } = this.state;
        const { showForm, displayColorPicker } = this.state;
        const { r, g, b, a } = rgba;

        
        /*         MARKUP          */
        /***************************/
        return (

            <form className="AddColorForm">

                <div className="d-flex align-items-center">

                    <div className="d-flex flex-column">
                        
                        <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            {title}{type !== 'primary' && <span className="color-extraDarkSmoke ml-2">(optional)</span>}
                        </div>
                        
                        <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                            {description}
                        </div>
                        
                    </div>

                    {(type !== 'primary' && !showForm) &&
                        <button className="d-flex sp-btn sp-btn--md sp-btn--secondary ml-auto p-1"
                                onClick={this._handleShowFormClick}>
                            <Icon icon="plus"
                                iconClass="stroke-white strokeWidth-3"
                                width="20" height="20"/>
                        </button>
                    }

                </div>

                {showForm && 

                    <div className="d-flex align-items-center mt-3">

                        {/* Input: Color */}
                        <div className="sp-inputGroup sp-inputGroup--color sp-inputGroup--color--md mr-3">
                            
                            <div className="context" 
                                onClick={this._handleColorClick}
                                style={{
                                    background: `rgba(${ r }, ${ g }, ${ b }, ${ a })`
                                    }}/>
                            
                            <input type="text" 
                                    placeholder="#FDF980" 
                                    className="input" 
                                    value={hex}
                                    onClick={this._handleColorClick}
                                    readOnly={true}/>
                            
                            {/* Color Picker */}
                            {displayColorPicker && 
                            <div style={{
                                position: 'absolute',
                                zIndex: 2,
                                left: '50px'
                            }}>
                                <div style={{
                                        position: 'fixed',
                                        top: '0px',
                                        right: '0px',
                                        bottom: '0px',
                                        left: '0px',
                                    }} onClick={this._handleColorCloseClick}/>
                                <SketchPicker color={rgba} onChange={this._handleColorChange}/>
                            </div>}

                        </div>
                        

                        {/* Input: Color Name */}
                        <div className="sp-inputGroup sp-inputGroup--label sp-inputGroup--label--md mr-3">
                            <span className="context">
                                Name
                            </span>
                            <input type="text" 
                                    placeholder="Light Primary" 
                                    className="input" 
                                    value={name} />
                        </div>

                        {/* Add Button */}
                        <button className="sp-btn sp-btn--secondary sp-btn--md"
                                onClick={this._handleAddClick}>
                            Add
                        </button>

                    </div>

                }
                
                <ColorsList colors={colors} onDelete={this._handleDeleteClick}/>

            </form>
        );

    }

}


/*         EXPORT          */
/***************************/
export default AddColorForm;