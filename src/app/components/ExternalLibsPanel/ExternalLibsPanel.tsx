/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import CodeTabMenu, { 
    Option as CodeTabMenuOption 
} from './../Tabs/CodeTabMenu/CodeTabMenu';

import AddLibForm from './../../components/Forms/AddLibForm/AddLibForm';
import LibsListContainer from './../../containers/LibsList/LibsList.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExternalLibsPanelProps = {
    currentTab: CodeTabMenuOption,
    onTabClick: (tab: CodeTabMenuOption) => void;
    onAddLibClick: (name: string, url: string) => void;
};


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

        // Destructuring props & state
        const { currentTab, onTabClick, onAddLibClick } = this.props;

        // VARIABLES 
        // TODO: Mas adelante esto no podras esta aqui fijo, tendras que ser enviado por su Container
        const options: Array<CodeTabMenuOption> = [
            CodeTabMenuOption.css,
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
                    <CodeTabMenu options={options} 
                                isReversed={false}
                                tab={currentTab} 
                                onTabClick={onTabClick}/>
                </div>
                

                {/* External Libs Panel */}
                <div className="row no-gutters w-100 sp-bg-white">
                    <div className="col-12 position-relative">

                        {/* External Libs */}
                        <div className="ExternalLibs d-flex flex-column w-100 p-5">

                            <AddLibForm label={title}
                                        helpMsg={description}
                                        onAddClick={onAddLibClick}/>
                            
                            {/* Build external libs list */}
                            <LibsListContainer />

                        </div>

                    </div>

                </div>

            </div>
        );


    }
    
}


/* Export */
export default ExternalLibsPanel;