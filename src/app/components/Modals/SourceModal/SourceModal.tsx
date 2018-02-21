/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Modal } from 'semantic-ui-react';

import Input, {
    SizeOption as InputSizeOption
} from './../../Inputs/SpecialTextInput/SpecialTextInput';
import PreprocessorSelectListContainer from './../../../containers/Inputs/SelectInputs/PreprocessorSelectList/PreprocessorSelectList.container';
import SourceCodePanelContainer from './../../../../components/pages/ComponentsPage/New/Steps/BasicFields/PanelSection/SourceCodePanel/SourceCodePanel.container';
import Button from './../../Buttons/GenericBtn/GenericBtn';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceModalProps = {
    sourceNameValue: string | number | string[],
    sourceFilenameValue: string | number | string[],
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    onSaveClick: (e: React.FormEvent<{}>) => any,
    onCloseClick: (e: React.FormEvent<{}>) => any
};


/**
 * @desc Represent Source Modal
 * @function SourceModal
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const SourceModal: React.SFC<SourceModalProps> = ({

    // Inputs values
    sourceNameValue,
    sourceFilenameValue,

    // Methods
    onInputChange,
    onSaveClick,
    onCloseClick

}) => {


    /*         MARKUP          */
    /***************************/
    return (
        <Modal
            basic={true}
            closeIcon="sp-close-icon"
            closeOnDimmerClick={false}
            open={true}
            onClose={onCloseClick}
            size="fullscreen"
            className="scrolling SourceModal">
                <Modal.Content>

                    {/* Source preprocessor input */}
                    <div className="d-flex align-items-center mt-5">
                        <div className="fontFamily-openSans fontWeight-7 fontSize-md color-silver mr-3">
                            Preprocessor:
                        </div>
                        <PreprocessorSelectListContainer onChange={onInputChange}/>
                    </div>

                    {/* Source name input */}
                    <div className="d-flex align-items-center mt-4">
                        <div className="fontFamily-openSans fontWeight-7 fontSize-md color-silver mr-3">
                            Name:
                        </div>
                        <Input value={sourceNameValue}
                            name="name"
                            placeholder="e.g. Helper classes, Global, Core, Variables"
                            size={InputSizeOption.lg}
                            onChange={onInputChange}
                            className="w-50"/>
                    </div>

                    {/* Source filename input */}
                    <div className="d-flex align-items-center mt-4">
                        <div className="fontFamily-openSans fontWeight-7 fontSize-md color-silver mr-3">
                            Filename:
                        </div>
                        <Input value={sourceFilenameValue}
                            name="filename"
                            placeholder="global"
                            size={InputSizeOption.md}
                            onChange={onInputChange}/>
                        <span className="fontFamily-openSans fontWeight-5 fontSize-md color-silver">
                            .scss
                        </span>
                    </div>

                    {/* Source Panel Container */}
                    <div className="mt-5">
                        <SourceCodePanelContainer html={null}
                                                  css={null}/>
                    </div>

                    {/* Save button */}
                    <div className="d-flex align-items-start mt-4">
                        <Button label="Save"
                                onClick={onSaveClick}
                                className="ml-auto" />
                    </div>

                </Modal.Content>
            </Modal>
    );
    
};


/* Export */
export default SourceModal;