/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../../../../reducer/reducer.config';

import DetailsTabMenu, { 
    Option as DetailsTabMenuOptions 
} from './../../../../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

import { changeAtomDetailsTabAction } from './../../../../../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuContainerProps = {};

/* Own States */
type LocalStates = {};

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


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class TabMenuContainer 
extends React.Component<ChildProps<TabMenuContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<TabMenuContainerProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ComponentsPage/New/Steps/BasicFields/PanelSection/TabMenu container actived');

        // Bind methods
        this._handleCodeClick = this._handleCodeClick.bind(this);
        this._handleLibsClick = this._handleLibsClick.bind(this);
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {   
        this._changeTab(DetailsTabMenuOptions.showCode);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleCodeClick
     * @method _handleCodeClick
     * @example this._handleCodeClick()
     * @private
     * @returns {void}
     */
    private _handleCodeClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._changeTab(DetailsTabMenuOptions.showCode);
    }


    /**
     * @desc HandleLibsClick
     * @method _handleLibsClick
     * @example this._handleLibsClick()
     * @private
     * @returns {void}
     */
    private _handleLibsClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._changeTab(DetailsTabMenuOptions.addLibs);
    }


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
     * @desc Build Tab Menu component
     * @method _buildTabMenu
     * @example this._buildTabMenu()
     * @private
     * @returns {JSX.Element} <AddColorForm />
     */
    private _buildTabMenu(): JSX.Element {

        // Destructuring props
        const { tab } = this.props;

        // VARIABLES
        let options: Array<DetailsTabMenuOptions> = [
            DetailsTabMenuOptions.addLibs,
            DetailsTabMenuOptions.showCode
        ];        

        return (
            <DetailsTabMenu options={options}
                            isReversed={tab === DetailsTabMenuOptions.showCode}
                            currentOption={tab}
                            onShowCodeClick={this._handleCodeClick}
                            onAddLibsClick={this._handleLibsClick}/>
        );
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div>
                {/* Build Tab Menu Options */}
                {this._buildTabMenu()}
            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { tabs } = state.ui;
    const { atomDetailsTab } = tabs;
    const { tab } = atomDetailsTab;

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
                changeAtomDetailsTab: (tab) => dispatch(changeAtomDetailsTabAction(tab))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const tabMenuContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    tabMenuContainerConnect
)(TabMenuContainer);