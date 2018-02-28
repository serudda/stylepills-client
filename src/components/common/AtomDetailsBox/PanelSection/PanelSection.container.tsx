/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../reducer/reducer.config';

import { Atom as AtomModel } from './../../../../models/atom/atom.model';

// import Stats from './Stats/Stats';
import TabMenuContainer from './TabMenu/TabMenu.container';
import SourceCodePanelContainer from './SourceCodePanel/SourceCodePanel.container';
import ExternalLibsPanel from './../../../../app/components/ExternalLibsPanel/ExternalLibsPanel';

import {
    Option as DetailsTabMenuOptions
} from './../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PanelSectionProps = {
    atom: AtomModel
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: string;
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PanelSectionContainer 
extends React.Component<ChildProps<PanelSectionProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<PanelSectionProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { atom } = this.props;
        const { tab } = this.props;

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
                    
                    <div className="col-auto mr-auto">

                        {/* TODO: Stats no estan implementados aun, descomentar cuando se vaya a implementar*/}
                        {/*<Stats likes={atom.likes} stores={atom.stores} views={atom.views}/>*/}

                    </div>

                    <div className="col-auto">

                        {/* Tab Menu */}
                        <TabMenuContainer atomId={atom.id}/>

                    </div>
                </div>

                {/* Source Code Section */}
                {tab === DetailsTabMenuOptions.showCode && 
                <SourceCodePanelContainer atomId={atom.id} 
                                          name={atom.name}
                                          html={atom.html} 
                                          css={atom.css}/>}
                
                {/* External Libs Section */}
                {tab === DetailsTabMenuOptions.addLibs && 
                <ExternalLibsPanel />}

            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { tabs } = state.ui;
    const { atomDetailsTab } = tabs;
    const { tab } = atomDetailsTab;

    return {
        tab
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const panelSectionContainerConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    panelSectionContainerConnect
)(PanelSectionContainer);