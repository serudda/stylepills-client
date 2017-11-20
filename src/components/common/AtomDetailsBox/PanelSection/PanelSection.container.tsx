/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { Atom as AtomModel } from './../../../../models/atom/atom.model';

import Stats from './Stats/Stats';
import TabMenu from './TabMenu/TabMenu.container';
import SourceCodePanel from './SourceCodePanel/SourceCodePanel.container';

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
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PanelSection 
extends React.Component<ChildProps<PanelSectionProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { atom } = this.props;


        /*         MARKUP          */
        /***************************/
        return (

            <div className="PanelSection boxShadow-raised sp-rounded-bottom-md overflow-hidden">

                {/* Stats and Tab Menu Row */}
                <div className="row no-gutters pl-3 align-items-center sp-bg-black borderTop-1 borderColor-smoke">
                    
                    <div className="col-auto mr-auto">

                        {/* Stats */}
                        <Stats likes={atom.likes} stores={atom.stores} views={atom.views}/>

                    </div>

                    <div className="col-auto">

                        {/* Tab Menu */}
                        <TabMenu />

                    </div>
                </div>

                {/* Source Code Section */}
                <SourceCodePanel html={atom.html} css={atom.css}/>

            </div>
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {};
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const panelSectionConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    panelSectionConnect
)(PanelSection);