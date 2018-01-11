/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { TwitterPicker } from 'react-color';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SmallBoxContainerProps = {
    defaultColor?: string;
    onChange: (color: string) => void;
};

/* Own States */
type LocalStates = {
    displayColorPicker: boolean;
    color: string
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SmallBoxContainer 
extends React.Component<ChildProps<SmallBoxContainerProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SmallBoxContainerProps & StateProps, {}>) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: props.defaultColor || '#33ADA9',
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
    private _handleChange(color: any) {
        this.setState({ color: color.hex }, () => {
            this.props.onChange(color.hex);
        });
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        // Destructuring state
        const { color, displayColorPicker } = this.state;
        
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="SmallBox">

                <div className="SmallBox__swatch" onClick={this._handleClick}>
                    <div className="SmallBox__swatch__color"
                         style={{backgroundColor: `${ color }`}} />
                    <Icon icon="chevronDown"
                        iconClass="icon stroke-secondary strokeWidth-3 ml-2"
                        width="15" height="15"/>
                </div>

                { displayColorPicker &&
                    <div className="SmallBox__popover">
                        <div className="SmallBox__popover__cover" onClick={this._handleClose}/>
                        <TwitterPicker color={color} onChange={this._handleChange} triangle="top-right"/>
                    </div>
                }

            </div>
        );

    }

}


/*         EXPORT          */
/***************************/
export default SmallBoxContainer;