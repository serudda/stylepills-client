/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import BannerAlert from './../../../components/Alerts/BannerAlert/BannerAlert';

// -----------------------------------

/* Here are all alert components */
const alertComponentList = {
    BannerAlert
};


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible alert options */
export enum Option {
    BannerAlert = 'BannerAlert'
}

/* Own Props */
type AlertManagerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    currentAlerts: Array<{alertType: Option, alertProps: any}>;
};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AlertManager 
extends React.Component<ChildProps<AlertManagerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AlertManagerProps & StateProps & DispatchProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { currentAlerts } = this.props;

        const renderedAlerts = currentAlerts.map(
            (alertDescription, index) => {
                const { alertType, alertProps = {} } = alertDescription;
                const AlertComponent = alertComponentList[alertType];
                return <AlertComponent {...alertProps} key={alertType + index} />;
            }
        );
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <span>{renderedAlerts}</span>
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { alerts } = state.ui;
    return {
        currentAlerts: alerts
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const alertManagerConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    alertManagerConnect
)(AlertManager);