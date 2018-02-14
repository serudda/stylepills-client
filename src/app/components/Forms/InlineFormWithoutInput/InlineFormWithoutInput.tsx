/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Button, {
    TypeOption as BtnTypeOption 
} from './../../Buttons/GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type InlineFormWithoutInputProps = {
    label: string;
    helpMsg: string;
    btnType: BtnTypeOption;
    btnLabel: string;
    onBtnClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Inline Form without Input
 * @function InlineFormWithoutInput
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const InlineFormWithoutInput: React.SFC<InlineFormWithoutInputProps> = ({
    label,
    helpMsg,
    btnType,
    btnLabel,
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

                <Button type={btnType} 
                        label={btnLabel}
                        onClick={onBtnClick} />

            </div>

        </div>
    );
    
};


/* Export */
export default InlineFormWithoutInput;