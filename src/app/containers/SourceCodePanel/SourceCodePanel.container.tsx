/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import SourceCodePanel, { 
    FloatMenuOption 
} from './../../components/SourceCodePanel/SourceCodePanel';

import { withChangeSourceCode, 
         InjectedProps as WithChangeSourceCodeProps 
       } from './../../../core/hocs/withChangeSourceCode.hoc';

import { withChangeCodeTab, 
         InjectedProps as WithChangeCodeTabProps 
       } from './../../../core/hocs/withChangeCodeTab.hoc';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourceCodePanelContainerProps = {
    html: string,
    css: string
};

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
&   WithChangeSourceCodeProps
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
        functionsUtil.consoleLog('ComponentsPage/New/Steps/BasicFields/PanelSection/SourceCodePanel container actived');
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { tab } = this.props;
        const { html, css } = this.props;

        // VARIABLES
        let options: Array<FloatMenuOption> = [
             FloatMenuOption.copy
        ];


        /*         MARKUP          */
        /***************************/
        return (
            <SourceCodePanel currentTab={tab} 
                             html={html} 
                             css={css}
                             floatMenuBtns={options}
                             onTabClick={this.props.onTabClick}
                             onCodeChange={this.props.onChange}/>
        );
    }

}


/**************************************/
/*     WITH CHANGE SOURCE CODE HOC    */
/**************************************/
const withChangeSourceCodeConnect = withChangeSourceCode({key: 'True Live'});
const withChangeCodeTabConnect = withChangeCodeTab({key: 'True Live'});


/*         EXPORT          */
/***************************/
export default compose <any>(
    withChangeCodeTabConnect,
    withChangeSourceCodeConnect
)(SourceCodePanelContainer);