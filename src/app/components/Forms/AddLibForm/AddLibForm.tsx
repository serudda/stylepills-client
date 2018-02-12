/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

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


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/

class AddLibForm extends React.Component<AddLibFormProps, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AddLibFormProps) {
        super(props);

        // Init local state
        this.state = {
            fields: {
                name: '',
                url: ''
            }
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



     /********************************/
     /*         PUBLIC METHODS       */
     /********************************/


    /**
     * @desc HandleInputChange
     * @method handleInputChange
     * @example this.handleInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    handleInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) {
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
     * @method handleClick
     * @example this.handleClick()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    handleClick(e: React.FormEvent<any>) {
        e.preventDefault();

        // const fieldsCopy = Object.assign({}, this.state.fields); LEGACY
        const fieldsCopy = functionsUtil.updateObject(this.state.fields);
        
        if (this.props.onAddClick) {

            if (fieldsCopy.url !== '') {

                this.props.onAddClick(fieldsCopy.name, fieldsCopy.url);

                // Clear text inputs
                this.setState({
                    fields: {
                        name: '',
                        url: ''
                    }
                });
                
            }
            
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
                        
                        {label &&
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
                           onChange={this.handleInputChange} />

                    {/* Add Button */}
                    <div className="ml-3">
                        <Button type={BtnTypeOption.secondary} 
                                label="Add" 
                                onClick={this.handleClick}/>
                    </div>

                </div>

                {/* Build external libs list */}
                <LibsListContainer />

            </div>
        );
    }
    
}


/* Export */
export default AddLibForm;