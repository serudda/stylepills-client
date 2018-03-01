/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as classNames from 'classnames';

import { isEmpty } from 'lodash';

import { 
    IValidationError 
} from './../../../../../../core/validations/project';

import Input from './../../../../../components/Inputs/GenericTextInput/GenericTextInput';
import Textarea from './../../../../../components/Inputs/GenericTextareaInput/GenericTextarea';
import SwitchBtn, { 
    SizeOption as SwitchSizeOption 
} from './../../../../../components/Buttons/GenericSwitchBtn/GenericSwitchBtn';
import Button from './../../../../../components/Buttons/GenericBtn/GenericBtn';
import Icon from './../../../../../components/Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BasicFieldsProps = {
    /* Input values */
    nameValue: string,
    websiteValue: string,
    descriptionValue: string,
    privateValue: boolean,

    /* Validations */
    validationErrors?: IValidationError,

    /* Methods */
    onInputChange: (e: React.FormEvent<{}>) => any,
    onNextClick: (e: React.FormEvent<{}>) => any
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/

class BasicFields extends React.Component<BasicFieldsProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: BasicFieldsProps) {
        super(props);
    }




    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            /* Input values */
            nameValue,
            websiteValue,
            descriptionValue,
            privateValue,

            /* Validation Errors */
            validationErrors,

            /* Methods */
            onInputChange,
            onNextClick
        } = this.props;

        // Label Classes
        const labelClasses = (hasMarginTop: boolean = false) => {
            return classNames({
                'fontSize-xs': true,
                'fontWeight-6': true,
                'color-silver fontSmoothing-reset': true,
                'fontSmoothing-reset': true,
                'mt-4': hasMarginTop
            });    
        };


        /*         MARKUP          */
        /***************************/
        return (
            <div className="BasicFields StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-5">

                    <div className="nav-section d-none"> {/* TODO: Remplazar d-none por d-flex */}
                        {/* Close button */}
                        <div className="iconContainer d-inline-flex flex-column align-items-center ml-auto">
                            <Icon icon="close"
                                iconClass="icon stroke-silver strokeWidth-2"
                                width="26" height="26"/>
                            <div className="label fontSize-xs color-silver fontWeight-7">ESC</div>
                        </div>
                    </div>

                    <div className="title-section text-center">
                        {/* Title */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-sm color-silver mt-5">
                            CREATE NEW PROJECT
                        </div>
                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2">
                            Basic project information
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    <label className={labelClasses()}>
                        PROJECT NAME
                    </label>

                    <Input name="name"
                            value={nameValue}
                            isBlock={true}
                            onChange={onInputChange}
                            placeholder="e.g. Airbnb"
                            className={!isEmpty(validationErrors.name) && 'error'}/>

                    {validationErrors.name && <div className="color-negative mt-1">{validationErrors.name}</div>}
                    
                    <label className={labelClasses(true)}>
                        PROJECT WEBSITE <span className="color-extraDarkSmoke align-text-bottom fontWeight-5 ml-1">(optional)</span>
                    </label>
                    
                    <Input name="website"
                            value={websiteValue}
                            isBlock={true}
                            onChange={onInputChange}
                            placeholder="e.g. https://www.airbnb.com"
                            className={!isEmpty(validationErrors.website) && 'error'}/>

                    {validationErrors.website && <div className="color-negative mt-1">{validationErrors.website}</div>}
                    
                    <label className={labelClasses(true)}>
                        DESCRIPTION <span className="color-extraDarkSmoke align-text-bottom fontWeight-5 ml-1">(optional)</span>
                    </label>
                    
                    <Textarea name="description"
                            value={descriptionValue}
                            onChange={onInputChange}
                            placeholder="e.g. Airbnb is a trusted community marketplace for people to list, discover, and book unique accommodation around the world"
                            isBlock={true}
                            rows={3} cols={40}/>

                    <div className="switchContainer d-flex align-items-center mt-5">

                        <div className="d-flex flex-column">
                            <div className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                MAKE THIS PROJECT PRIVATE
                            </div>
                            <div className="fontSize-sm fontWeight-3 color-extraDarkSmoke fontSmoothing-reset">
                                Hide this project from the public
                            </div>
                        </div> 

                        <SwitchBtn name="private"
                                    size={SwitchSizeOption.sm}
                                    isOn={privateValue}
                                    onChange={onInputChange}
                                    className="ml-auto"/>
                    </div>

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <Button label="Next"
                            onClick={onNextClick}
                            className="ml-auto" />
                </div>

            </div>
        );
    }
    
}


/* Export */
export default BasicFields;