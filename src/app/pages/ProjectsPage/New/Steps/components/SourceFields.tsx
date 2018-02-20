/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Button from './../../../../../components/Buttons/GenericBtn/GenericBtn';
import Icon from './../../../../../components/Icon/Icon';
import AddSourceFormContainer from './../../../../../containers/Forms/AddSourceForm/AddSourceForm.container';

import SourcesListContainer from './../../../../../containers/SourcesList/SourcesList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceFieldsProps = {
    onPrevClick: (e: React.FormEvent<{}>) => any,
    onNextClick: (e: React.FormEvent<{}>) => any
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/

class SourceFields extends React.Component<SourceFieldsProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourceFieldsProps) {
        super(props);
    }




    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            onPrevClick,
            onNextClick
        } = this.props;

        const title = 'CORE CODE';
        const description = `Include any core source Include any core 
                            source Include any core source Include any core source 
                            Include any core source Include any core source Include 
                            any core source`;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="BasicFields StepByStep p-4">

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
                        <div className="iconContainer d-none flex-column align-items-center ml-auto"> {/* TODO: Remplazar d-none por d-inline-flex */}
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
                            Core Code
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    {/* External Libs */}
                    <div className="ExternalLibs d-flex flex-column w-100">
                        <AddSourceFormContainer label={title} helpMsg={description}/>

                        {/* Build sources list */}
                        <SourcesListContainer />
                    </div>

                </div>

                <div className="StepByStep__footer d-flex align-items-start mt-4">
                    <Button label="Save"
                            onClick={onNextClick}
                            className="ml-auto" />
                </div>

            </div>
        );
    }
    
}


/* Export */
export default SourceFields;