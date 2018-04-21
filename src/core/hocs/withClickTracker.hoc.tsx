/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from './../../reducer/reducer.config';

import { clickElementAction } from './../../actions/ui.action';

// -----------------------------------



//        HOC PROPS & STATES      
// ===================================

type HOCProps = {
    /* Own HOC Props */
} & HOCStateProps & HOCDispatchProps;

type HOCStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type HOCStateProps = {};

/* Mapped Dispatches to Props */
type HOCDispatchProps = {
    actions: {
        ui: { 
            clickElement: (elementType: string, elementProps: any ) => void
        }
    };
};


//      INJECTED PROPS & STATES
// ===================================

export interface InjectedProps {
    onTrackClick(elementType: string, elementProps: any): void;
}


/***********************************************/
/*                HOC DEFINITION               */
/***********************************************/

export const withClickTracker = () =>
    <WrappedComponentProps extends {}>(
        Component: (React.ComponentClass<WrappedComponentProps & InjectedProps>
                | React.StatelessComponent<WrappedComponentProps & InjectedProps>)
    ) => {


    /***********************************************/
    /*              CLASS DEFINITION               */
    /***********************************************/
    class WithClickTracker
    extends React.Component<WrappedComponentProps & HOCProps, HOCStates> {


        /********************************/
        /*   DISPLAYNAME ON WEBDEVTOOL  */
        /********************************/
        static displayName = `WithClickTracker(${Component.displayName || Component.name})`;


        /********************************/
        /*         CONSTRUCTOR          */
        /********************************/
        constructor(props: WrappedComponentProps & HOCProps) {
            super(props);

            // Bind methods
            this.handleClick = this.handleClick.bind(this);
        }


        /********************************/
        /*        PUBLIC METHODS        */
        /********************************/

        /**
         * @desc OnClick
         * @method onClick
         * @example this.onClick()
         * @public
         * @param {CodeSupportedOption } tab - source code tab (e.g. 'html', 'js', 'css')
         * @param {React.FormEvent<{}>} e - Event
         * @returns {void}
         */
        handleClick = (elementType: string, elementProps: any) => (e: React.FormEvent<{}>) => {
            this._trackClick(elementType, elementProps);
        }


        /********************************/
        /*       PRIVATE METHODS        */
        /********************************/

        /**
         * @desc Change Tab
         * @method _trackClick
         * @example this._trackClick()
         * @private
         * @param {string} elementType - element clicked
         * @param {any} elementProps - additional element information to track
         * @returns {void}
         */
        private _trackClick(elementType: string, elementProps: any ) {
            this.props.actions.ui.clickElement(elementType, elementProps);
        }


        /********************************/
        /*        RENDER MARKUP         */
        /********************************/
        render(): JSX.Element {

            /*         MARKUP          */
            /***************************/
            return (
                <div>
                    <Component onTrackClick={this.handleClick} {...this.props} {...this.state} />
                </div>
            );
        }

    }


    /********************************/
    /*     MAP DISPATCH TO PROPS    */
    /********************************/
    function mapDispatchToProps(dispatch: Dispatch<IRootState>): HOCDispatchProps {
        return {
            actions: {
                ui: {
                    clickElement: (elementType, elementProps) => dispatch(clickElementAction(elementType, elementProps)),
                }
            }
        };
    }


    /********************************/
    /*         REDUX CONNECT        */
    /********************************/
    return connect(null, mapDispatchToProps)(WithClickTracker);

};