/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { 
    IValidationError 
} from './../../../../../../core/validations/project';

import { 
    ColorTypeOptions 
} from './../../../../../../models/color/color.model';
import AddColorFormContainer from './../../../../../containers/Forms/AddColorForm/AddColorForm.container';
import ColorsListContainer from './../../../../../containers/ColorsList/ColorsList.container';

import Button from './../../../../../components/Buttons/GenericBtn/GenericBtn';
import Icon from './../../../../../components/Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorFieldsProps = {
    validationErrors?: IValidationError,
    onPrevClick: (e: React.FormEvent<{}>) => any,
    onNextClick: (e: React.FormEvent<{}>) => any
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/

class ColorFields extends React.Component<ColorFieldsProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ColorFieldsProps) {
        super(props);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Build Add Color Form component
     * @method _buildAddColorForm
     * @example this._buildAddColorForm('primary')
     * @private
     * @param {ColorTypeOptions} type - type color section (primary, secondary or grayscale)
     * @returns {JSX.Element} <AddColorForm />
     */
    private _buildAddColorForm(type: ColorTypeOptions): JSX.Element {

        // VARIABLES
        let label = {
            primary: 'PRIMARY COLORS',
            secondary: 'SECONDARY COLORS',
            grayscale: 'GRAYSCALE COLORS'
        };

        let helpMsg = {
            primary: 'These are the colors that define your brand.',
            secondary: 'These colors are support to accompany the primary colors.',
            grayscale: 'A selection of grayscale colors for background or text color use.'
        };

        return (
            <AddColorFormContainer label={label[type]}
                                    helpMsg={helpMsg[type]}
                                    colorType={type}/>
        );
    }




    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            validationErrors,
            onPrevClick,
            onNextClick
        } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ColorFields StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-5">

                    <div className="nav-section d-flex">
                        {/* Back button */}
                        <div className="iconContainer d-inline-flex flex-column align-items-center"
                            onClick={onPrevClick}>
                            <Icon icon="arrowLeft" 
                                iconClass="icon stroke-silver strokeWidth-2"
                                width="26" height="26"/>
                            <div className="label fontSize-xs color-silver fontWeight-7">BACK</div>
                        </div>
                        {/* Close button */}
                        <div className="iconContainer d-none flex-column align-items-center ml-auto"> {/* TODO: Reemplazar d-none por d-inline-flex */}
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
                            Color palette of the project
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    {/* Add Primary colors */}
                    {this._buildAddColorForm(ColorTypeOptions.primary)}
                    {/* Validation error message */}
                    {validationErrors.colorPalette && 
                        <div className="color-negative">
                            {validationErrors.colorPalette}
                        </div>
                    }

                    <ColorsListContainer />


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                    {/* Add Secondary colors */}
                    {this._buildAddColorForm(ColorTypeOptions.secondary)}

                    <ColorsListContainer />


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke my-4" />


                    {/* Add Grayscale colors */}
                    {this._buildAddColorForm(ColorTypeOptions.grayscale)}

                    <ColorsListContainer />

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <a className="link-reset fontSize-sm color-silver fontWeight-6 textDecoration ml-2 d-none" 
                        href="#">
                        Skip this step
                    </a>

                    <Button label="Next"
                            onClick={onNextClick}
                            className="ml-auto"/>
                </div>

            </div>
        );
    }
    
}


/* Export */
export default ColorFields;