/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { CodeSupportedOption } from './../../../core/interfaces/interfaces';
import LibTabMenuContainer from './../../containers/Tabs/LibTabMenu.container';

import { LibTypeOptions } from './../../../models/lib/lib.model';
import AddLibFormContainer from './../../containers/Forms/AddLibForm/AddLibForm.container';
import LibsListContainer from './../../containers/LibsList/LibsList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExternalLibsPanelProps = {};


/**
 * @desc Represent External Libs Panel
 * @function ExternalLibsPanel
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class ExternalLibsPanel extends React.Component<ExternalLibsPanelProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ExternalLibsPanelProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // VARIABLES 
        // TODO: Mas adelante esto no podras esta aqui fijo, tendras que ser enviado por su Container
        const options: Array<CodeSupportedOption> = [
            CodeSupportedOption.css,
            /* CodeTabMenuOption.js 
            TODO: Descomentar cuando se vaya a implementar */
        ];
        const title = 'EXTERNAL LIBRARIES';
        const description = `Include any external resource (e.g. Boostrap, Bulma, 
                            your own helper classes library, etc.)`;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ExternalLibsPanel row no-gutters borderTop-1 borderColor-smoke overflow-hidden">
                
                {/* Type Code Tab Menu */}
                <div className="borderBottom-1 borderColor-smoke w-100">
                    <LibTabMenuContainer options={options}/>
                </div>
                

                {/* External Libs Panel */}
                <div className="row no-gutters w-100 sp-bg-white">
                    <div className="col-12 position-relative">

                        {/* External Libs */}
                        <div className="ExternalLibs d-flex flex-column w-100 p-5">

                            <AddLibFormContainer libType={LibTypeOptions.css}
                                                 label={title}
                                                 helpMsg={description}/>
                            
                            {/* Build external libs list */}
                            <LibsListContainer libType={LibTypeOptions.css}/>

                        </div>

                    </div>

                </div>

            </div>
        );


    }
    
}


/* Export */
export default ExternalLibsPanel;