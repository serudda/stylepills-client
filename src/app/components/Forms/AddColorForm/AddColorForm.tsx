/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { ColorTypeOptions } from './../../../../models/color/color.model';

import InputColorPickerContainer from './../../../containers/ColorPicker/InputColorPicker/InputColorPicker.container';
import Input from './../../Inputs/GenericTextInput/GenericTextInput';
import Button from './../../Buttons/GenericBtn/GenericBtn';
import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddColorFormProps = {
    label: string,
    helpMsg: string
    colorType: ColorTypeOptions,
    showForm: boolean,
    inputValue: string | number | string[], 
    inputName: string,
    onAddClick: (e: React.FormEvent<{}>) => any,
    onShowFormClick: (e: React.FormEvent<{}>) => any,
    onInputNameColorChange: (e: React.FormEvent<{}>) => void
};


/**
 * @desc Represent Add Color Form
 * @function AddColorForm
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AddColorForm: React.SFC<AddColorFormProps> = ({
    label,
    helpMsg,
    colorType,
    showForm = colorType === ColorTypeOptions.primary ? true : false,
    inputValue,
    inputName,
    onAddClick,
    onShowFormClick,
    onInputNameColorChange
 }) => {    
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="AddColorForm">

                <div className="d-flex align-items-center">

                    <div className="d-flex flex-column">
                        
                        <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            {label}{colorType !== ColorTypeOptions.primary && <span className="color-extraDarkSmoke ml-2">(optional)</span>}
                        </div>
                        
                        <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                            {helpMsg}
                        </div>
                        
                    </div>

                    {(colorType !== ColorTypeOptions.primary && !showForm) &&
                        <button className="d-flex sp-btn sp-btn--md sp-btn--secondary ml-auto p-1"
                                onClick={onShowFormClick}>
                            <Icon icon="plus"
                                iconClass="stroke-white strokeWidth-3"
                                width="20" height="20"/>
                        </button>
                    }

                </div>

                {showForm && 

                    <div className="d-flex align-items-center mt-3">

                        <InputColorPickerContainer />
                        

                        {/* Input: Color Name */}
                        <div className="sp-inputGroup sp-inputGroup--label sp-inputGroup--label--md mr-3">
                            <span className="context">
                                Name
                            </span>
                            
                            <Input value={inputValue}
                                    name={inputName}
                                    placeholder="Light Primary"
                                    onChange={onInputNameColorChange}
                                    className="input"/>
                        </div>

                        {/* Add Button */}
                        <Button label="Add"
                                onClick={onAddClick}/>

                    </div>

                }

            </div>
    );
    
};


/* Export */
export default AddColorForm;