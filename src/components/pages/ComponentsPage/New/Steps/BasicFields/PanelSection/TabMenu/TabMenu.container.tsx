/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../../../reducer/reducer.config';
import { Options as DetailsTabMenuOptions } from './../../../../../../../common/Tabs/DetailsTabMenu/DetailsTabMenu';

import DetailsTabMenu from './../../../../../../../common/Tabs/DetailsTabMenu/DetailsTabMenu';

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
    tab: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: string | null) => void;
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

        // Bind methods
        this._handleCodeClick = this._handleCodeClick.bind(this);
        this._handleLibsClick = this._handleLibsClick.bind(this);
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {   
        this._changeTab('code');
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
        this._changeTab('code');
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
        this._changeTab('libs');
    }


    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private 
     * @returns {void}
     */
    private _changeTab(tab: string | null) {
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
                            isReversed={tab === 'code'}
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
            <div className="TabMenuContainer">

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