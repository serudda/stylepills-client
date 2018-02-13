/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Input from './../../Inputs/GenericTextInput/GenericTextInput';
import Button, { 
    TypeOption as BtnTypeOption 
} from './../../Buttons/GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type InlineFormProps = {
    label: string;
    helpMsg: string;
    inputValue: string | number | string[];
    inputName: string;
    inputPlaceholder: string;
    btnType: BtnTypeOption;
    btnLabel: string;
    onInputChange: (e: React.FormEvent<{}>) => any;
    onBtnClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Inline Form
 * @function InlineForm
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const InlineForm: React.SFC<InlineFormProps> = ({
    label,
    helpMsg,
    inputValue,
    inputName,
    inputPlaceholder,
    btnType,
    btnLabel,
    onInputChange,
    onBtnClick
 }) => {    
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="InlineForm d-flex flex-column w-100">
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
                <Input value={inputValue}
                        name={inputName}
                        placeholder={inputPlaceholder}
                        isBlock={true}
                        onChange={onInputChange} />

                {/* Add Button */}
                <div className="ml-3">
                    <Button type={btnType} 
                            label={btnLabel}
                            onClick={onBtnClick}/>
                </div>
            </div>
        </div>
    );
    
};


/* Export */
export default InlineForm;