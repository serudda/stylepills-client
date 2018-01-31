/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Input from './../../Inputs/GenericTextInput/GenericTextInput';
import Button, { TypeOption as BtnTypeOption } from './../../Buttons/GenericBtn/GenericBtn';
import LibsListContainer from './../../../containers/LibsList/LibsList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddLibFormProps = {
    label: string;
    helpMsg: string;
    onAddClick: (e: React.FormEvent<{}>) => void;
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


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            label,
            helpMsg,
            onAddClick
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="AddLibForm d-flex flex-column w-100">

                <div className="d-flex align-items-center">

                    <div className="d-flex flex-column">
                        
                        <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            {label}
                        </div>
                        
                        <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                            {helpMsg}
                        </div>
                        
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
                    <Button type={BtnTypeOption.secondary} label="Add" onClick={onAddClick}/>

                </div>

                {/* Build external libs list */}
                <LibsListContainer />

            </div>
        );
    }
    
}


/* Export */
export default AddLibForm;