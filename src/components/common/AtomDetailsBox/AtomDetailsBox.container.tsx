/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { IRootState } from './../../../reducer/reducer.config';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import PreviewSection from './PreviewSection/PreviewSection.container';
import PanelSection from './PanelSection/PanelSection.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsBoxProps = {
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
class AtomDetailsBox 
extends React.Component<ChildProps<AtomDetailsBoxProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
        // LOG
        functionsUtil.consoleLog('AtomDetailsBox container actived');
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
            <div className="AtomDetailsBox">
                
                {/* Preview Section */}
                <PreviewSection atomId={atom.id} html={atom.html} css={atom.css} contextualBg={atom.contextualBg}/>

                {/* Panel Section */}
                <PanelSection atom={atom}/>

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
const atomDetailsBoxConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    atomDetailsBoxConnect
)(AtomDetailsBox);