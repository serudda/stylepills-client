/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import Button from './../../../../../components/Buttons/GenericBtn/GenericBtn';
import Icon from './../../../../../components/Icon/Icon';
import AddLibFormContainer from './../../../../../containers/Forms/AddLibForm/AddLibForm.container';

import { LibTypeOptions } from './../../../../../../models/lib/lib.model';
import LibsListContainer from './../../../../../containers/LibsList/LibsList.container';

import { Option as CodeTabMenuOption } from './../../../../../components/Tabs/CodeTabMenu/CodeTabMenu';
import CodeTabMenuContainer from './../../../../../containers/Tabs/CodeTabMenu.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type LibFieldsProps = {
    currentTab: CodeTabMenuOption,
    onTabClick: (tab: CodeTabMenuOption) => void;
    onPrevClick: (e: React.FormEvent<{}>) => any,
    onNextClick: (e: React.FormEvent<{}>) => any
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/

class LibFields extends React.Component<LibFieldsProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: LibFieldsProps) {
        super(props);
    }




    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {
            currentTab,
            onTabClick,
            onPrevClick,
            onNextClick
        } = this.props;

        // VARIABLES 
        const options: Array<CodeTabMenuOption> = [
            CodeTabMenuOption.css
        ];

        const title = 'EXTERNAL LIBRARIES';
        const description = `Include any external resource (e.g. Boostrap, Bulma, 
                            your own helper classes library, etc.)`;


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
                            External Libraries
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md p-5">

                    {/* Type Code Tab Menu */}
                    <CodeTabMenuContainer options={options} currentTab={currentTab} onTabClick={onTabClick}/>

                    {/* External Libs */}
                    <div className="ExternalLibs d-flex flex-column w-100 pt-5">
                        <AddLibFormContainer libType={LibTypeOptions.css}
                                             label={title}
                                             helpMsg={description}/>

                        {/* Build external libs list */}
                        <LibsListContainer libType={LibTypeOptions.css}/>
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
export default LibFields;