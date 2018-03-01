/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import SourceCodePanel, { 
    FloatMenuOption 
} from './../../components/SourceCodePanel/SourceCodePanel';

import { withChangeCodeTab, 
         InjectedProps as WithChangeCodeTabProps 
       } from './../../../core/hocs/withChangeCodeTab.hoc';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourceCodePanelContainerProps = {};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SourceCodePanelContainerProps
&   StateProps
&   DispatchProps
&   WithChangeCodeTabProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceCodePanelContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AllProps) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SourceCodePanel container actived');
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { tab } = this.props;

        // VARIABLES
        let options: Array<FloatMenuOption> = [
             FloatMenuOption.copy
        ];


        /*         MARKUP          */
        /***************************/
        return (
            <SourceCodePanel currentTab={tab}
                             floatMenuBtns={options}/>
        );
    }

}


/**************************************/
/*     WITH CHANGE SOURCE CODE HOC    */
/**************************************/
const withChangeCodeTabConnect = withChangeCodeTab();


/*         EXPORT          */
/***************************/
export default compose <any>(
    withChangeCodeTabConnect
)(SourceCodePanelContainer);