/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../reducer/reducer.config';

import Icon from './../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class TabMenu 
extends React.Component<ChildProps<TabMenuProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        // const { atom } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="TabMenu sp-iconTabMenu sp-iconTabMenu--is-reversed fontSmoothing-reset">
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="heartFull"
                            iconClass="strokeWidth-2"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="share"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="messageCircle"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="download"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button sp-iconTabMenu__button--active">
                    <div className="inner">
                        <Icon icon="code"
                            iconClass="strokeWidth-2 stroke-darkPrimary"
                            width="25" height="16"/>
                    </div>
                </button>
                <button className="sp-iconTabMenu__button">
                    <div className="inner">
                        <Icon icon="package"
                            iconClass="strokeWidth-2 stroke-slate"
                            width="22" height="22"/>
                    </div>
                </button>
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
const tabMenuConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    tabMenuConnect
)(TabMenu);