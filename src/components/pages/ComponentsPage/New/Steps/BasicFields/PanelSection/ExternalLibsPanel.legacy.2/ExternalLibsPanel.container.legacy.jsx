/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../../../../core/utils/functionsUtil';

import ExternalLibsPanel from './../../../../../../../../app/components/ExternalLibsPanel/ExternalLibsPanel';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ExternalLibsPanelContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ExternalLibsPanelContainer 
extends React.Component<ChildProps<ExternalLibsPanelContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ExternalLibsPanelContainerProps & StateProps & DispatchProps) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ComponentsPage/New/Steps/BasicFields/PanelSection/ExternalLibsPanel container actived');

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*         MARKUP          */
        /***************************/
        return (
            <ExternalLibsPanel />
        );
    }

}


/*         EXPORT          */
/***************************/
export default ExternalLibsPanelContainer;