/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as classNames from 'classnames';

import { isEmpty } from 'lodash';

import { 
    IValidationError 
} from './../../../../../../core/validations/atom';

import PreviewSectionContainer from './../containers/PreviewSection.container';
import PanelSectionContainer from './../containers/PanelSection.container';
import AtomCategorySelectList from './../../../../../../app/containers/Inputs/SelectInputs/AtomCategorySelectList/AtomCategorySelectList.container';
import ProjectSelectList from './../../../../../../app/containers/Inputs/SelectInputs/ProjectSelectList/containers/ProjectSelectList.container';
import BannerAlert, { Option as BannerAlertOption } from './../../../../../../app/components/Alerts/BannerAlert/BannerAlert';

import Icon from './../../../../../../app/components/Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BasicFieldsProps = {
    currentUserId: number;
    /* Input values */
    nameValue: string,
    descriptionValue: string,
    privateValue: boolean,
    htmlValue: string,
    cssValue: string,

    /* Validations */
    validationErrors?: IValidationError,

    /* Methods */
    onInputChange: (e: React.FormEvent<{}>) => any,
    onSelectChange: (name: string, value: string) => any,
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
            currentUserId,
            nameValue,
            descriptionValue,
            privateValue,
            htmlValue,
            cssValue,
            validationErrors,

            /* Methods */
            onInputChange,
            onSelectChange,
            onNextClick
        } = this.props;

        // Name input Classes
        const nameInputClasses = classNames({
            'sp-input': true,
            'sp-input--md': true,
            'sp-input--block': true,
            'error': !isEmpty(validationErrors.name)
        });

        // Private Switch Classes
        const privateSwitchClasses = classNames({
            'sp-switch-btn sp-switch-btn--sm sp-switch-btn--circle':  true,
            'sp-switch-btn--on-primary': true,
            'sp-switch-btn--off-white': true, 
            'boxShadow-close': true, 
            'active': privateValue
        });


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
                            CREATE NEW COMPONENT
                        </div>
                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-silver mt-2">
                            Basic component information
                        </div>
                    </div>

                </div>


                {/* STEP BY STEP: CONTENT */}
                <div className="StepByStep__content boxShadow-raised sp-bg-white borderRadius-md">

                    {/* Basic information Form */}
                    <form className="px-5 pt-5">
                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                            COMPONENT NAME
                        </label>
                        <input type="text"
                                name="name"
                                value={nameValue}
                                onChange={onInputChange}
                                className={nameInputClasses}
                                placeholder="e.g. Primary Button, Secondary Input"/>
                        {validationErrors.name && <div className="color-negative mt-1">{validationErrors.name}</div>}
                        
                        
                        <div className="row mt-4">
                            <div className="col-6">
                                <div className="d-flex flex-column">

                                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                        CATEGORY
                                    </label>

                                    <AtomCategorySelectList onChange={onSelectChange}/>

                                </div>
                            </div>

                            <div className="col-6">
                                <div className="d-flex flex-column h-100">
                                    <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset">
                                        PROJECT
                                    </label>
                                    <ProjectSelectList userId={currentUserId} onChange={onSelectChange}/>
                                </div>
                            </div>
                        </div>

                        <label className="fontSize-xs fontWeight-6 color-silver fontSmoothing-reset mt-4">
                            DESCRIPTION <span className="color-extraDarkSmoke align-text-bottom fontWeight-5 ml-1">(optional)</span>
                        </label>
                        <textarea name="description"
                                value={descriptionValue}
                                onChange={onInputChange}
                                className="sp-textarea sp-textarea--md sp-textarea--block"
                                placeholder="e.g. Primary Button, Secondary Input"
                                rows={3} cols={40} />

                    </form>


                    <div className="sp-divider sp-divider--dashed sp-divider--smoke sp-divider--border-2 mt-5" />


                    {/* Preview Atom Section */}
                    <PreviewSectionContainer html={htmlValue}
                                            css={cssValue}/>

                    {/* Panel Atom Section */}

                    <div className="position-relative overflow-hidden">
                        <PanelSectionContainer />
                        
                        {/* Error Bottom Message NOTE: 1*/}
                        {validationErrors.html &&
                            <BannerAlert type={BannerAlertOption.negative} 
                            text={validationErrors.html}
                            className="position-absolute sp-rounded-bottom-md validationMsg"
                            showIcon={true}
                            showDeleteBtn={false}
                            />
                        }

                    </div>

                </div>

                <div className="StepByStep__footer d-flex align-items-center mt-4">

                    <div className="make-it-private-container d-flex align-items-center">
                        <div className={privateSwitchClasses}>
                            <input name="private" 
                                   type="checkbox"
                                   checked={privateValue}
                                   onChange={onInputChange}
                                   className="cb-value" />
                            <span className="inner-btn boxShadow-raised" />
                        </div>
                        <span className="fontFamily-openSans fontWeight-6 fontSize-sm color-silver ml-3">
                            Hide this component from the public
                        </span>
                    </div>

                    <button className="sp-btn sp-btn--secondary sp-btn--lg ml-auto"
                            onClick={onNextClick}>
                        Save
                    </button>
                </div>

            </div>
        );
    }
    
}


/* Export */
export default BasicFields;


/* 
(1) Uso BannerAlert directamente (en vez de AlertManager) ya que en este caso este Banner no es considerado un Alert,
Ademas no deberia estar agregando por todas partes el: AlertManager container, ya que si llegara a agregar 2 veces este
componente, se pifiaria su comportamiento. Este AlertManager container deberia estar en un solo lugar global solo para
gestionar los Alertas globales, como por ejemplo los modals.
*/