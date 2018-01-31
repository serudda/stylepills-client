/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Lib as LibModel } from './../../../../models/lib/lib.model';

import Input from './../../Inputs/GenericTextInput/GenericTextInput';
import Button, { TypeOption as BtnTypeOption } from './../../Buttons/GenericBtn/GenericBtn';
import LibsListContainer from './../../../containers/LibsList/LibsList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddLibFormProps = {
    label?: string;
    helpMsg?: string;
    onAddClick: (name: string, url: string) => void;
};

/* Own States */
type LocalStates = {
    fields: {
        name: string,
        url: string
    }
};


/**
 * @desc Represent Add Lib Form
 * @function AddLibForm
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class AddLibForm extends React.Component<AddLibFormProps, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AddLibFormProps) {
        super(props);

        // Bind methods
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }



     /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method _handleInputChange
     * @example this._handleInputChange()
     * @private
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    private _handleInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                [name]: value
            }
        }));

    }


    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    private _handleClick(e: React.FormEvent<any>) {
        e.preventDefault();

        const fieldsCopy = Object.assign({}, this.state.fields);
        
        if (this.props.onAddClick) {
            this.props.onAddClick(fieldsCopy.name, fieldsCopy.url);
        }

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            label,
            helpMsg
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="AddLibForm d-flex flex-column w-100">

                <div className="d-flex align-items-center">

                    <div className="d-flex flex-column">
                        
                        { label &&
                            <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                {label}
                            </div>
                        }
                        
                        {helpMsg &&
                            <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                {helpMsg}
                            </div>
                        }
                        
                    </div>

                </div>


                <div className="d-flex align-items-center mt-3">                    

                    {/* Input: External Lib Url */}
                    <Input value={this.state.fields.url}
                           name="url" 
                           placeholder="e.g. https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                           isBlock={true}
                           onChange={this._handleInputChange} />

                    {/* Add Button */}
                    <Button type={BtnTypeOption.secondary} label="Add" onClick={this._handleClick}/>

                </div>

                {/* Build external libs list */}
                <LibsListContainer />

            </div>
        );
    }
    
}


/* Export */
export default AddLibForm;