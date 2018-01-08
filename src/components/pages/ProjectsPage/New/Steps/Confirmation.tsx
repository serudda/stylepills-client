/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';
import { User } from './../../../../../models/user/user.model';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ConfirmationProps = {
    submitCreation: (authorId: number) => void;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean,
    user: User
};


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
        if (this.props.isAuthenticated) {
            this.props.submitCreation(this.props.user.id);
        }
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const { isAuthenticated } = this.props;
        
        
        /*       VALIDATIONS       */
        /***************************/
        if (!isAuthenticated) {
            return (
                <Redirect to="/explore"/>
            );
        }


        /*         MARKUP          */
        /***************************/
        return false;
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { isAuthenticated, user } = state.auth;

    return {
        isAuthenticated,
        user
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const confirmationConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    confirmationConnect
)(Confirmation);