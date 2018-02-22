/************************************/
/*           DEPENDENCIES           */
/************************************/

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from './../../reducer/reducer.config';

import { changeSourceCodeAction } from './../../actions/ui.action';

import { 
    Option as CodeTabMenuOption 
} from './../../app/components/Tabs/CodeTabMenu/CodeTabMenu';

// -----------------------------------


//        HOC PROPS & STATES      
// ===================================

type HOCProps = {
    html: string;
    css: string;
} & HOCStateProps & HOCDispatchProps;

type HOCStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type HOCStateProps = {
    codeType: CodeTabMenuOption;
};

/* Mapped Dispatches to Props */
type HOCDispatchProps = {
    actions: {
        ui: { 
            changeSourceCode: (codeType: string, codeProps: any) => void;
        }
    };
};


//      INJECTED PROPS & STATES
// ===================================

export interface InjectedProps {
    codeType: CodeTabMenuOption;
    onChange(newCode: string): void;
}


//           HOC'S OPTIONS 
// ===================================
interface Options {
    key?: string;
}


/***********************************************/
/*                HOC DEFINITION               */
/***********************************************/

export const withChangeSourceCode = ({ key = 'Default value' }: Options = {}) =>
    <WrappedComponentProps extends {}>(
        Component: (React.ComponentClass<WrappedComponentProps & InjectedProps>
                | React.StatelessComponent<WrappedComponentProps & InjectedProps>)
    ) => {


    /***********************************************/
    /*              CLASS DEFINITION               */
    /***********************************************/
    class WithChangeSourceCode 
    extends React.Component<WrappedComponentProps & HOCProps, HOCStates> {


        /********************************/
        /*   DISPLAYNAME ON WEBDEVTOOL  */
        /********************************/
        static displayName = `WithChangeSourceCode(${Component.displayName || Component.name})`;


        /********************************/
        /*         CONSTRUCTOR          */
        /********************************/
        constructor(props: WrappedComponentProps & HOCProps) {
            super(props);

            const DEFAULT_HTML_CODE = '<!-- Put your HTML code here -->';
            const DEFAULT_CSS_CODE = '/* Put your CSS code here */';

            // Init local states
            this.state = {
                html: props.html || DEFAULT_HTML_CODE,
                css: props.css || DEFAULT_CSS_CODE
            };

            // Bind methods
            this.onChange = this.onChange.bind(this);
        }


        /********************************/
        /*        PUBLIC METHODS        */
        /********************************/

        /**
         * @desc onChange
         * @method onChange
         * @example this.onChange()
         * @public
         * @param {string} type - source code type (e.g. 'html', 'css')
         * @param {string} newCode - new source code
         * @param {any} e - Event
         * @returns {void}
         */
        onChange(newCode: string) {
            this._updateCode(this.props.codeType, newCode);
        }


        /********************************/
        /*       PRIVATE METHODS        */
        /********************************/

        /**
         * @desc Update Code
         * @method _updateCode
         * @example this._updateCode()
         * @private
         * @param {string} type - source code type (e.g. 'html', 'css')
         * @param {string} newCode - new source code
         * @returns {void}
         */
        private _updateCode(type: string, newCode: string) {

            // Update local state
            this.setState((previousState) => {
                return {
                    ...previousState,
                    [type]: newCode
                };
            }, () => {
                // Launch Change Source Code UI Action
                this.props.actions.ui.changeSourceCode(type, {code: newCode});
            });
            
        }


        /********************************/
        /*        RENDER MARKUP         */
        /********************************/
        render(): JSX.Element {

            /*         MARKUP          */
            /***************************/
            return (
                <div>
                    {/* render the wrapped component like this, passing the props and state */}
                    <Component onChange={this.onChange} {...this.props} {...this.state} />
                </div>
            );
        }


    }


    /********************************/
    /*      MAP STATE TO PROPS      */
    /********************************/
    function mapStateToProps(state: IRootState): HOCStates {
        
        const { tabs } = state.ui;
        const { sourceCodeTab } = tabs;
        const { tab } = sourceCodeTab;

        return {
            codeType: tab
        };
    }


    /********************************/
    /*     MAP DISPATCH TO PROPS    */
    /********************************/
    function mapDispatchToProps(dispatch: Dispatch<IRootState>): HOCDispatchProps {
        return {
            actions: {
                ui: {
                    changeSourceCode: (codeType, codeProps) => dispatch(changeSourceCodeAction(codeType, codeProps)),
                }
            }
        };
    }


    /********************************/
    /*         REDUX CONNECT        */
    /********************************/
    return connect(mapStateToProps, mapDispatchToProps)(WithChangeSourceCode);


};