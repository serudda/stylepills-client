/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';

import DetailsTabMenu , { 
    Option as DetailsTabMenuOptions 
} from './../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

import { 
    Option as ModalOption
} from './../../../../../app/containers/Modals/ModalManager/ModalManager.container';

import { changeAtomDetailsTabAction, showModalAction } from './../../../../../actions/ui.action';
import { getAtomDetailsTab } from './../../../../../selectors/ui.selector';
import { getIsAuthenticated } from './../../../../../selectors/auth.selector';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type TabMenuContainerProps = {
    atomId: number;
    options?: Array<DetailsTabMenuOptions>;
};

/* Own States */
type LocalStates = {
    isToggleCode: boolean
};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    tab: string;
    duplicated: {
        atomId: number,
        isDuplicated: boolean;
    };
    isAuthenticated: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: DetailsTabMenuOptions | null) => void;
            showModal: (modalType: ModalOption, modalProps: any) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    TabMenuContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class TabMenuContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);

        // Init state
        this.state = { isToggleCode: false };

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox/PanelSection/TabMenu container actived');

        // Bind methods
        this.handleCodeTabClick = this.handleCodeTabClick.bind(this);
        this.handleDuplicateTabClick = this.handleDuplicateTabClick.bind(this);
        this.handleLibsTabClick = this.handleLibsTabClick.bind(this);
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
        this.setState((prevState: LocalStates) => ({
            isToggleCode: !prevState.isToggleCode
        }), () => {
            if (this.state.isToggleCode) {
                this._changeTab(DetailsTabMenuOptions.showCode);
            } else {
                this._changeTab(null);
            }
        });
    }


    /**
     * @desc handleDuplicateTabClick
     * @method handleDuplicateTabClick
     * @example this.handleDuplicateTabClick()
     * @public 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    handleDuplicateTabClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { isDuplicated } = this.props.duplicated;

        if (!isDuplicated) {
            this._showDuplicateModal();
        }

    }


    /**
     * @desc handleLibsTabClick
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
     * @desc Show Duplicate Modal 
     * @method _showDuplicateModal
     * @example this._showDuplicateModal()
     * @private
     * @returns {void}
     */
    private _showDuplicateModal() {
        const { isAuthenticated } = this.props;
        const { atomId } = this.props;

        if (isAuthenticated) {

            this.props.actions.ui.showModal(ModalOption.DuplicateModal, {atomId});

        } else {
            alert('You should be logged in to store this component in your repo.');
        }
    }


    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @param {DetailsTabMenuOptions} tab - details tab menu option (e.g. addLib, showCode, duplicate, etc)
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
            return [ DetailsTabMenuOptions.addLibs,
                DetailsTabMenuOptions.showCode,
                DetailsTabMenuOptions.duplicate ];
        }

    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { tab, duplicated } = this.props;
        const { isDuplicated } = duplicated; 

        /*         MARKUP          */
        /***************************/
        return (
            <DetailsTabMenu options={this._buildTabOptions()}
                        isReversed={tab === DetailsTabMenuOptions.showCode}
                        isDuplicated={isDuplicated}
                        currentOption={tab}
                        onDuplicateClick={this.handleDuplicateTabClick}
                        onShowCodeClick={this.handleCodeTabClick}
                        onAddLibsClick={this.handleLibsTabClick}/>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {

    const { duplicated } = state.atomState;

    return {
        tab: getAtomDetailsTab(state),
        isAuthenticated: getIsAuthenticated(state),
        duplicated
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeAtomDetailsTab: (tab) => dispatch(changeAtomDetailsTabAction(tab)),
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps))
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