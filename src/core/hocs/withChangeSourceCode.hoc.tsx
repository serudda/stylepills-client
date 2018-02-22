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


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

// State of the HOC you need to compute the InjectedProps
interface State {
}

// Props you want the resulting component to take (besides the props of the wrapped component)
interface ExternalProps {
    html: string;
    css: string;
    tab: CodeTabMenuOption;
}

interface DispatchProps {
    actions: {
        ui: { 
            changeSourceCode: (codeType: string, codeProps: any) => void;
        }
    };
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
    onChange(newCode: string): void;
}

// Options for the HOC factory that are not dependent on props values
interface Options {
    key?: string;
}


/***********************************************/
/*                HOC DEFINITION               */
/***********************************************/

export const withChangeSourceCode = ({ key = 'Default value' }: Options = {}) =>
    <TOriginalProps extends {}>(
        Component: (React.ComponentClass<TOriginalProps & InjectedProps>
            | React.StatelessComponent<TOriginalProps & InjectedProps>)
    ) => {

    // Do something with the options here or some side effects ...

    type ResultProps = TOriginalProps & ExternalProps & DispatchProps;

    const result = class WithChangeSourceCode extends React.Component<ResultProps, State> {


        // Define how your HOC is shown in ReactDevTools
        static displayName = `WithChangeSourceCode(${Component.displayName || Component.name})`;


        /********************************/
        /*         CONSTRUCTOR          */
        /********************************/
        constructor(props: ResultProps) {
            super(props);

            const DEFAULT_HTML_CODE = '<!-- Put your HTML code here -->';
            const DEFAULT_CSS_CODE = '/* Put your CSS code here */';

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
            this._updateCode(this.props.tab, newCode);
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
            // Render all your added markup
            return (
                <div>
                    {/* render the wrapped component like this, passing the props and state */}
                    <Component onChange={this.onChange} {...this.props} {...this.state} />
                </div>
            );
        }
    };


    /********************************/
    /*     MAP DISPATCH TO PROPS    */
    /********************************/
    function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
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
    return connect(null, mapDispatchToProps)(result);


};