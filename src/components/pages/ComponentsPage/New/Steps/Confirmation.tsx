/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import * as appConfig from './../../../../../core/constants/app.constants';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';
import { User } from './../../../../../models/user/user.model';

import Icon from './../../../../../app/components/Icon/Icon';

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
        functionsUtil.consoleLog('ComponentNew -> Step: 2 - Confirmation actived');
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {

        const TIMEOUT_DELAY = 3000;

        // TODO: Remove when it's not needed
        setTimeout(() => {
            if (this.props.isAuthenticated) {
                this.props.submitCreation(this.props.user.id);
            }
        }, TIMEOUT_DELAY);
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
                <Redirect to="/"/>
            );
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="Confirmation StepByStep p-4">
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <Icon icon="loader"
                            iconClass="sp-loader"
                            color={appConfig.SECONDARY_COLOR_HEX}
                            width="80" height="80"/>
                        <div className="text text--xs color-slate fontFamily-openSans fontWeight-7 mt-3">
                            Creating component...
                        </div>
                    </li>
                </ul>
            </div>
        );
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