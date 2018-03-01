/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import * as classNames from 'classnames';

import DetailsTabMenuContainer from './../../../../../../app/containers/Tabs/DetailsTabMenu.container';
import { 
    Option as DetailsTabMenuOptions
} from './../../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';
import SourceCodePanelContainer from './../../../../../../app/containers/SourceCodePanel/SourceCodePanel.container';
import ExternalLibsPanel from './../../../../../../app/components/ExternalLibsPanel/ExternalLibsPanel';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PanelSectionProps = {
    tab: string;
};


/**
 * @desc Represent Generic Button
 * @function GenericBtn
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const PanelSection: React.SFC<PanelSectionProps> = ({
    tab
 }) => {

    // Tab Menu Row Classes
    const tabMenuRowClasses = classNames({
        'row': true,
        'no-gutters': true,
        'pl-3': true,
        'align-items-center': true,
        'borderTop-1': true,
        'borderColor-smoke': true,
        'sp-bg-black': tab === DetailsTabMenuOptions.showCode,
        'sp-bg-white': tab !== DetailsTabMenuOptions.showCode
    });


    /*         MARKUP          */
    /***************************/
    return (
        <div className="PanelSection sp-rounded-bottom-md overflow-hidden">

            {/* Stats and Tab Menu Row */}
            <div className={tabMenuRowClasses}>

                <div className="d-flex col">

                    {/* Tab Menu */}
                    <div className="ml-auto">
                        <DetailsTabMenuContainer />
                    </div>

                </div>
            </div>

            {/* Source Code Section */}
            {tab === DetailsTabMenuOptions.showCode && 
            <SourceCodePanelContainer />}

            {/* External Libs Section */}
            {tab === DetailsTabMenuOptions.addLibs && 
            <ExternalLibsPanel />}

        </div>
    );
    
};


/* Export */
export default PanelSection;


/* 
(1) Uso BannerAlert directamente (en vez de AlertManager) ya que en este caso este Banner no es considerado un Alert,
Ademas no deberia estar agregando por todas partes el: AlertManager container, ya que si llegara a agregar 2 veces este
componente, se pifiaria su comportamiento. Este AlertManager container deberia estar en un solo lugar global solo para
gestionar los Alertas globales, como por ejemplo los modals.
*/