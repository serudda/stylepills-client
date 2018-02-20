/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { closeAlertAction } from './../../../../actions/ui.action';

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
type AlertManagerContainerProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    currentAlerts: Array<{alertType: Option, alertProps: any, alertId: string}>;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            closeAlert: (alertId: string) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AlertManagerContainer 
extends React.Component<ChildProps<AlertManagerContainerProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AlertManagerContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Bind methods
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleCloseClick
     * @method handleCloseClick
     * @example this.handleCloseClick()
     * @public
     * @param {AtomModel} atom - atom data
     * @returns {void}
     */
    handleCloseClick(id: string) {
        this.props.actions.ui.closeAlert(id);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { currentAlerts } = this.props;

        const renderedAlerts = currentAlerts.map(
            (alertDescription, index) => {
                const { alertType, alertProps = {}, alertId } = alertDescription;
                const AlertComponent = alertComponentList[alertType];
                return <AlertComponent {...alertProps} onCloseClick={this.handleCloseClick} id={alertId} key={alertId}/>;
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
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                closeAlert: (alertId) => dispatch(closeAlertAction(alertId))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const alertManagerContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    alertManagerContainerConnect
)(AlertManagerContainer);