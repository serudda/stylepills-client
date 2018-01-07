/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ConfirmationProps = {
    submitCreation: Function
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Confirmation
extends React.Component<ChildProps<ConfirmationProps & StateProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ConfirmationProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ProjectNew -> Step: 3 - Confirmation actived');
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {
        this.props.submitCreation();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*         MARKUP          */
        /***************************/
        return false;
    }

}


/*         EXPORT          */
/***************************/
export default Confirmation;