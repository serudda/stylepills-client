/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import { changeSourceCodeTabAction } from './../../../actions/ui.action';

import CodeTabMenu, { Option as CodeTabOption } from './../../components/Tabs/CodeTabMenu/CodeTabMenu';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CodeTabMenuContainerProps = {
    options?: Array<CodeTabOption>;
    currentTab?: CodeTabOption;
    onTabClick?: (type: CodeTabOption) => void;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    tab: CodeTabOption
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeSourceCodeTab: (type: CodeTabOption) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class CodeTabMenuContainer 
extends React.Component<ChildProps<CodeTabMenuContainerProps & StateProps & DispatchProps, {}>, LocalStates> {    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<CodeTabMenuContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // Bind methods
        this.handleClick = this.handleClick.bind(this); 
    }


    /**
     * @desc Build tab options
     * @method _buildTabOptions
     * @example this._buildTabOptions()
     * @private
     * @returns {void}
     */
    private _buildTabOptions() {

        const { options } = this.props;

        // If receive an parent's options
        if (options) {
            return options;
        } else {
            // If not receive a parent's options method, build default options.
            return [ CodeTabOption.css, CodeTabOption.js ];
        }

    }


    /**
     * @desc Assign current tab
     * @method _assignCurrentTab
     * @example this._assignCurrentTab()
     * @private
     * @returns {void}
     */
    private _assignCurrentTab() {

        const { currentTab, onTabClick, tab } = this.props;

        // If receive an parent's currentTab and onTabClick
        if (currentTab && onTabClick) {
            return currentTab;
        } else {
            // If not receive a parent's currenTab or onTabClick method, assign 'tab' state store.
            return tab;
        }

    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc Handle Clic
     * @method handleClick
     * @example this._handleClick()
     * @public
     * @returns {void}
     */
    handleClick(type: CodeTabOption) {

        // If receive an parent's onTabClick method
        if (this.props.onTabClick) {
            this.props.onTabClick(type);
        } else {
            // If not receive a parent's onTabClick method, default action.
            this.props.actions.ui.changeSourceCodeTab(type);
        }

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {        
        
        /*         MARKUP          */
        /***************************/
        return (
            <CodeTabMenu options={this._buildTabOptions()} 
                         isReversed={false}
                         tab={this._assignCurrentTab()} 
                         onTabClick={this.handleClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        tab: state.ui.tabs.sourceCodeTab.tab
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeSourceCodeTab: (type) => dispatch(changeSourceCodeTabAction(type))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const codeTabMenuContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    codeTabMenuContainerConnect
)(CodeTabMenuContainer);