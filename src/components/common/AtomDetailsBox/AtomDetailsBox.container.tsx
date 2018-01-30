/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import PreviewSectionContainer from './PreviewSection/PreviewSection.container';
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
    constructor(props: ChildProps<AtomDetailsBoxProps & StateProps & DispatchProps, {}>) {
        super(props);

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
            <div className="AtomDetailsBox boxShadow-raised borderRadius-md">
                
                {/* Preview Section */}
                <PreviewSectionContainer atomId={atom.id} 
                                        name={atom.name} 
                                        html={atom.html} 
                                        css={atom.css} 
                                        libs={atom.libs}
                                        contextualBg={atom.contextualBg}/>

                {/* Panel Section */}
                <PanelSection atom={atom}/>

            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default AtomDetailsBox;