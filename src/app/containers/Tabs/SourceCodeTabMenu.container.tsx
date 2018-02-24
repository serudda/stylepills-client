/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { CodeSupportedOption } from './../../../core/interfaces/interfaces';

import { IRootState } from './../../../reducer/reducer.config';

import { changeSourceCodeTabAction } from './../../../actions/ui.action';
import { getSourceCodeTab } from './../../../selectors/ui.selector';

import CodeTabMenu from './../../components/Tabs/CodeTabMenu/CodeTabMenu';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourceCodeTabMenuContainerProps = {
    options?: Array<CodeSupportedOption>;
    isReversed?: boolean;
    onTabClick?: (type: CodeSupportedOption) => void;
};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    tab: CodeSupportedOption
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeSourceCodeTab: (type: CodeSupportedOption) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SourceCodeTabMenuContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceCodeTabMenuContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
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
            return [ CodeSupportedOption.css, CodeSupportedOption.js ];
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
    handleClick = (type: CodeSupportedOption) => (e: React.FormEvent<{}>) => {
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
        
        // Destructuring props
        const { tab, isReversed = false} = this.props;
        
        /*         MARKUP          */
        /***************************/
        return (
            <CodeTabMenu options={this._buildTabOptions()} 
                         isReversed={isReversed}
                         tab={tab} 
                         onTabClick={this.handleClick}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        tab: getSourceCodeTab(state)
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
const sourceCodeTabMenuContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    sourceCodeTabMenuContainerConnect
)(SourceCodeTabMenuContainer);