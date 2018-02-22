/************************************/
/*           DEPENDENCIES           */
/************************************/

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from './../../reducer/reducer.config';

import { changeSourceCodeTabAction } from './../../actions/ui.action';

import { 
    Option as CodeTabMenuOption 
} from './../../app/components/Tabs/CodeTabMenu/CodeTabMenu';

import { getSourceCodeTab } from './../../selectors/ui.selector';

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
type HOCStateProps = {
    tab: CodeTabMenuOption;
};

/* Mapped Dispatches to Props */
type HOCDispatchProps = {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: CodeTabMenuOption) => void;
        }
    };
};


//      INJECTED PROPS & STATES
// ===================================

export interface InjectedProps {
    tab?: CodeTabMenuOption;
    onTabClick(tab: CodeTabMenuOption): void;
}


//           HOC'S OPTIONS 
// ===================================
interface Options {
    key?: string;
}


/***********************************************/
/*                HOC DEFINITION               */
/***********************************************/

export const withChangeCodeTab = ({ key = 'Default value' }: Options = {}) =>
    <WrappedComponentProps extends {}>(
        Component: (React.ComponentClass<WrappedComponentProps & InjectedProps>
                | React.StatelessComponent<WrappedComponentProps & InjectedProps>)
    ) => {


    /***********************************************/
    /*              CLASS DEFINITION               */
    /***********************************************/
    class WithChangeCodeTab 
    extends React.Component<WrappedComponentProps & HOCProps, HOCStates> {


        /********************************/
        /*   DISPLAYNAME ON WEBDEVTOOL  */
        /********************************/
        static displayName = `WithChangeCodeTab(${Component.displayName || Component.name})`;


        /********************************/
        /*         CONSTRUCTOR          */
        /********************************/
        constructor(props: WrappedComponentProps & HOCProps) {
            super(props);

            // Bind methods
            this.handleTabClick = this.handleTabClick.bind(this);
        }


        /********************************/
        /*        PUBLIC METHODS        */
        /********************************/

        /**
         * @desc OnTabClick
         * @method onTabClick
         * @example this.onTabClick()
         * @public
         * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css')
         * @param {React.FormEvent<{}>} e - Event
         * @returns {void}
         */
        handleTabClick = (tab: CodeTabMenuOption) => (e: React.FormEvent<{}>) => {
            this._changeTab(tab);
        }


        /********************************/
        /*       PRIVATE METHODS        */
        /********************************/

        /**
         * @desc Change Tab
         * @method _changeTab
         * @example this._changeTab()
         * @private
         * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css') 
         * @returns {void}
         */
        private _changeTab(tab: CodeTabMenuOption) {
            this.props.actions.ui.changeSourceCodeTab(tab);
        }


        /********************************/
        /*        RENDER MARKUP         */
        /********************************/
        render(): JSX.Element {

            /*         MARKUP          */
            /***************************/
            return (
                <div>
                    <Component onTabClick={this.handleTabClick} {...this.props} {...this.state} />
                </div>
            );
        }

    }


    /********************************/
    /*      MAP STATE TO PROPS      */
    /********************************/
    function mapStateToProps(state: IRootState): HOCStates {
        return {
            tab: getSourceCodeTab(state)
        };
    }


    /********************************/
    /*     MAP DISPATCH TO PROPS    */
    /********************************/
    function mapDispatchToProps(dispatch: Dispatch<IRootState>): HOCDispatchProps {
        return {
            actions: {
                ui: {
                    changeSourceCodeTab: (tab) => dispatch(changeSourceCodeTabAction(tab))
                }
            }
        };
    }


    /********************************/
    /*         REDUX CONNECT        */
    /********************************/
    return connect(mapStateToProps, mapDispatchToProps)(WithChangeCodeTab);

};