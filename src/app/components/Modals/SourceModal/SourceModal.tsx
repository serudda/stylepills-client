/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Input, {
    SizeOption as InputSizeOption
} from './../../Inputs/SpecialTextInput/SpecialTextInput';
import Select from './../../Inputs/GenericSelectInput/GenericSelectInput';
import Button from './../../Buttons/GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceModalProps = {
    label: string,
    sourceNameValue: string | number | string[],
    sourceFilenameValue: string | number | string[],
    inputName: string,
    onInputNameChange: (e: React.FormEvent<{}>) => void,
    onInputFilenameChange: (e: React.FormEvent<{}>) => void,
    onSelectFilenameChange: (e: React.FormEvent<{}>) => void,
    onSaveClick: (e: React.FormEvent<{}>) => any,
};


/**
 * @desc Represent Source Modal
 * @function SourceModal
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const SourceModal: React.SFC<SourceModalProps> = ({
    sourceNameValue,
    sourceFilenameValue,
    onInputNameChange,
    onInputFilenameChange,
    onSelectFilenameChange,
    onSaveClick
}) => {
    
    const options = [
        {id: 1, name: 'SASS'},
        {id: 2, name: 'CSS'},
        {id: 2, name: 'LESS'}
    ];

    /*         MARKUP          */
    /***************************/
    return (
        <div>

            {/* Source name input */}
            <div className="d-flex align-items-center mt-5">
                <Input value={sourceNameValue}
                       name="name"
                       placeholder="e.g. Helper classes, Global, Core, Variables"
                       size={InputSizeOption.lg}
                       onChange={onInputNameChange}/>
            </div>

            {/* Source preprocessor input */}
            <div className="d-flex align-items-center flex-column mt-5">
                <div className="fontFamily-openSans fontWeight-5 fontSize-md color-silver">
                    preprocessor:
                </div>
                <Select options={options}
                        defaultOption="SASS"
                        value={name}
                        name="preprocessor"
                        loading={true}
                        error={null}
                        onChange={onInputFilenameChange}/>
            </div>

            {/* Source filename input */}
            <div className="d-flex align-items-center flex-column mt-5">
                <div className="fontFamily-openSans fontWeight-5 fontSize-md color-silver">
                    filename:
                </div>
                <Input value={sourceFilenameValue}
                       name="filename"
                       placeholder="global"
                       size={InputSizeOption.md}
                       onChange={onSelectFilenameChange}/>
                <span className="fontFamily-openSans fontWeight-5 fontSize-md color-silver">
                    .scss
                </span>
            </div>

            {/* Source Panel Container */}
            <div className="mt-5">
                {/**/}
            </div>

            {/* Save button */}
            <div className="d-flex align-items-start mt-4">
                <Button label="Save"
                        onClick={onSaveClick}
                        className="ml-auto" />
            </div>
            
        </div>
    );
    
};


/* Export */
export default SourceModal;