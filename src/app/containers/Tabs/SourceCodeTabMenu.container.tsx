/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { compose, ChildProps } from 'react-apollo';

import { CodeSupportedOption } from './../../../core/interfaces/interfaces';

import CodeTabMenu from './../../components/Tabs/CodeTabMenu/CodeTabMenu';

import { withChangeCodeTab, 
    InjectedProps as WithChangeCodeTabProps 
  } from './../../../core/hocs/withChangeCodeTab.hoc';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type SourceCodeTabMenuContainerProps = {
    tabOptions?: Array<CodeSupportedOption>;
    isReversed?: boolean;
    onTabClick?: (type: CodeSupportedOption) => void;
};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    SourceCodeTabMenuContainerProps
&   StateProps
&   DispatchProps
&   WithChangeCodeTabProps;

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
    }


    /**
     * @desc Build tab options
     * @method _buildTabOptions
     * @example this._buildTabOptions()
     * @private
     * @returns {void}
     */
    private _buildTabOptions() {

        // Own props
        const { tabOptions } = this.props;
        // State Store props
        const { options } = this.props;

        // If receive an parent's options
        if (tabOptions) {
            return tabOptions;
        } else {
            // If not receive a parent's options method, build default options.
            return options;
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
                         onTabClick={this.props.onTabClick}/>
        );

    }

}


/**************************************/
/*     WITH CHANGE SOURCE CODE HOC    */
/**************************************/
const withChangeCodeTabConnect = withChangeCodeTab({allowChangeCurrentPreprocessor: true});


/*         EXPORT          */
/***************************/
export default compose <any>(
    withChangeCodeTabConnect
)(SourceCodeTabMenuContainer);