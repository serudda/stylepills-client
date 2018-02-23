/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as classNames from 'classnames';

import { IRootState } from './../../../../../../../reducer/reducer.config';

import { Lib as LibModel } from './../../../../../../../models/lib/lib.model';

import DetailsTabMenuContainer from './../../../../../../../app/containers/Tabs/DetailsTabMenu.container';
import SourceCodePanelContainer from './../../../../../../../app/containers/SourceCodePanel/SourceCodePanel.container';
import ExternalLibsPanel from './../../../../../../../app/components/ExternalLibsPanel/ExternalLibsPanel';

import { 
    Option as DetailsTabMenuOptions
} from './../../../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

import { getAtomDetailsTab } from './../../../../../../../selectors/ui.selector';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PanelSectionContainerProps = {
    html: string;
    css: string;
    libs: Array<LibModel>;
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
extends React.Component<ChildProps<PanelSectionContainerProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<PanelSectionContainerProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { html, css } = this.props;
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

                    <div className="d-flex col">

                        {/* Tab Menu */}
                        <div className="ml-auto">
                            <DetailsTabMenuContainer />
                        </div>

                    </div>
                </div>

                {/* Source Code Section */}
                {tab === DetailsTabMenuOptions.showCode && 
                <SourceCodePanelContainer html={html} css={css}/>}

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
    return {
        tab: getAtomDetailsTab(state)
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