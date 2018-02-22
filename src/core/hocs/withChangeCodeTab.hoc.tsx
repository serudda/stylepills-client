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

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

// State of the HOC you need to compute the InjectedProps
interface State {
    tab: CodeTabMenuOption;
}

// Props you want the resulting component to take (besides the props of the wrapped component)
interface ExternalProps {
    tab: CodeTabMenuOption;
}

interface DispatchProps {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: CodeTabMenuOption) => void;
        }
    };
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
    tab: CodeTabMenuOption;
    onTabClick(tab: CodeTabMenuOption): void;
}

// Options for the HOC factory that are not dependent on props values
interface Options {
    key?: string;
}


/***********************************************/
/*                HOC DEFINITION               */
/***********************************************/

export const withChangeCodeTab = ({ key = 'Default value' }: Options = {}) =>
    <TOriginalProps extends {}>(
        Component: (React.ComponentClass<TOriginalProps & InjectedProps>
            | React.StatelessComponent<TOriginalProps & InjectedProps>)
    ) => {

    // Do something with the options here or some side effects ...

    type ResultProps = TOriginalProps & ExternalProps & DispatchProps;

    const result = class WithChangeCodeTab extends React.Component<ResultProps, State> {


        // Define how your HOC is shown in ReactDevTools
        static displayName = `WithChangeCodeTab(${Component.displayName || Component.name})`;


        /********************************/
        /*         CONSTRUCTOR          */
        /********************************/
        constructor(props: ResultProps) {
            super(props);

            // Bind methods
            this.onTabClick = this.onTabClick.bind(this);
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
        onTabClick(tab: CodeTabMenuOption) { 
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
            // this.props.actions.ui.changeSourceCodeTab(tab);
            console.log(`Click on change Tab to ${tab}`);
        }



        /********************************/
        /*        RENDER MARKUP         */
        /********************************/
        render(): JSX.Element {

            /*         MARKUP          */
            /***************************/
            // Render all your added markup
            return (
                <div>
                    {/* render the wrapped component like this, passing the props and state */}
                    <Component onTabClick={this.onTabClick} {...this.props} {...this.state} />
                </div>
            );
        }
    };


    /********************************/
    /*      MAP STATE TO PROPS      */
    /********************************/
    function mapStateToProps(state: IRootState): State {
        
        const { tabs } = state.ui;
        const { sourceCodeTab } = tabs;
        const { tab } = sourceCodeTab;

        return {
            tab
        };
    }


    /********************************/
    /*     MAP DISPATCH TO PROPS    */
    /********************************/
    function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
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
    return connect(mapStateToProps, mapDispatchToProps)(result);


};