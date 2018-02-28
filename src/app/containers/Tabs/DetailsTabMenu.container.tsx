/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { IRootState } from './../../../reducer/reducer.config';

import DetailsTabMenu, { 
    Option as DetailsTabMenuOptions 
} from './../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

import { changeAtomDetailsTabAction } from './../../../actions/ui.action';
import { getAtomDetailsTab } from './../../../selectors/ui.selector';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type DetailsTabMenuContainerProps = {
    options?: Array<DetailsTabMenuOptions>;
};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    tab: DetailsTabMenuOptions;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: DetailsTabMenuOptions | null) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    DetailsTabMenuContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class DetailsTabMenuContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('DetailsTabMenu container actived');

        // Bind methods
        this.handleCodeTabClick = this.handleCodeTabClick.bind(this);
        this.handleLibsTabClick = this.handleLibsTabClick.bind(this);
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {   
        this._changeTab(DetailsTabMenuOptions.showCode);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleCodeTabClick
     * @method handleCodeTabClick
     * @example this.handleCodeTabClick()
     * @public
     * @returns {void}
     */
    handleCodeTabClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._changeTab(DetailsTabMenuOptions.showCode);
    }


    /**
     * @desc HandleLibsTabClick
     * @method handleLibsTabClick
     * @example this.handleLibsTabClick()
     * @public
     * @returns {void}
     */
    handleLibsTabClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._changeTab(DetailsTabMenuOptions.addLibs);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private 
     * @returns {void}
     */
    private _changeTab(tab: DetailsTabMenuOptions | null) {
        this.props.actions.ui.changeAtomDetailsTab(tab);
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
            return [ DetailsTabMenuOptions.addLibs, DetailsTabMenuOptions.showCode ];
        }

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { tab } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <DetailsTabMenu options={this._buildTabOptions()}
                            isReversed={tab === DetailsTabMenuOptions.showCode}
                            currentOption={tab}
                            onShowCodeClick={this.handleCodeTabClick}
                            onAddLibsClick={this.handleLibsTabClick}/>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        tab: getAtomDetailsTab(state)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeAtomDetailsTab: (tab) => dispatch(changeAtomDetailsTabAction(tab))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const detailsTabMenuContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    detailsTabMenuContainerConnect
)(DetailsTabMenuContainer);