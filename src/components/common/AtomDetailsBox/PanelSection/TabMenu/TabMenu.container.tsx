/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as appConfig from './../../../../../core/constants/app.constants';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';
import { User as UserModel } from './../../../../../models/user/user.model';

import DetailsTabMenu , { 
    Options as DetailsTabMenuOptions 
} from './../../../../../app/components/Tabs/DetailsTabMenu/DetailsTabMenu';

import { changeAtomDetailsTabAction, showModalAction } from './../../../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuContainerProps = {
    atomId: number;
};

/* Own States */
type LocalStates = {
    isToggleCode: boolean
};

/* Mapped State to Props */
type StateProps = {
    tab: string;
    duplicated: {
        atomId: number,
        isDuplicated: boolean;
    };
    isAuthenticated: boolean;
    user: UserModel;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeAtomDetailsTab: (tab: string | null) => void;
            showModal: (modalType: string, modalProps: any) => void;
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

        // Init state
        this.state = { isToggleCode: false };

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox -> PanelSection -> TabMenu container actived');

        // Bind methods
        this._handleCodeClick = this._handleCodeClick.bind(this);
        this._handleDuplicateClick = this._handleDuplicateClick.bind(this);
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
        this.setState((prevState: LocalStates) => ({
            isToggleCode: !prevState.isToggleCode
        }), () => {
            if (this.state.isToggleCode) {
                this._changeTab('code');
            } else {
                this._changeTab(null);
            }
        });
    }


    /**
     * @desc HandleDuplicateClick
     * @method _handleDuplicateClick
     * @example this._handleDuplicateClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleDuplicateClick(e: React.FormEvent<{}>) {
        e.preventDefault();

        const { isDuplicated } = this.props.duplicated;

        if (!isDuplicated) {
            this._showDuplicateModal();
        }

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
     * @desc Show Duplicate Modal 
     * @method _showDuplicateModal
     * @example this._showDuplicateModal()
     * @private
     * @returns {void}
     */
    private _showDuplicateModal() {
        const {isAuthenticated, user} = this.props;
        const { atomId } = this.props;

        if (isAuthenticated && user) {

            this.props.actions.ui.showModal(appConfig.DUPLICATE_MODAL_TYPE, {atomId});

        } else {
            alert('You should be logged in to store this component in your repo.');
        }
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
        const { tab, duplicated } = this.props;
        const { isDuplicated } = duplicated;

        // VARIABLES
        let options: Array<DetailsTabMenuOptions> = [
            DetailsTabMenuOptions.addLibs,
            DetailsTabMenuOptions.showCode,
            DetailsTabMenuOptions.duplicate
        ];        

        return (
            <DetailsTabMenu options={options}
                            isReversed={tab === 'code'}
                            isDuplicated={isDuplicated}
                            currentOption={tab}
                            onDuplicateClick={this._handleDuplicateClick}
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

    const { duplicated } = state.atomState;
    
    const { isAuthenticated, user } = state.auth;

    return {
        tab,
        isAuthenticated,
        user,
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