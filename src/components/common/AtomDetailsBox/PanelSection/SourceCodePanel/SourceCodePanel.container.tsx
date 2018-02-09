/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from '../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';

import { changeSourceCodeTabAction } from './../../../../../actions/ui.action';
import { changedAtomDetailsAction } from './../../../../../actions/atom.action';

import { 
    Option as CodeTabMenuOption 
} from './../../../../../app/components/Tabs/CodeTabMenu/CodeTabMenu';

import { 
    Option as BannerAlertOption,
    BannerAlertProps
} from './../../../../../app/components/Alerts/BannerAlert/BannerAlert';

import SourceCodePanel, { FloatMenuOption } from './../../../../../app/components/SourceCodePanel/SourceCodePanel';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SourceCodePanelContainerProps = {
    atomId: number,
    name: string,
    html: string,
    css: string
};

/* Own States */
type LocalStates = {
    html: string,
    css: string,
    codeMirror: {
        readOnly: boolean
    }
};

/* Mapped State to Props */
type StateProps = {
    tab: CodeTabMenuOption;
    watchingChanges: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            changeSourceCodeTab: (tab: CodeTabMenuOption) => void;
        },
        atomState: {
            changedAtomDetails: (id: number, name: string, codeType: string, codeProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SourceCodePanelContainer
extends React.Component<ChildProps<SourceCodePanelContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: SourceCodePanelContainerProps & StateProps & DispatchProps) {
        super(props);

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox/PanelSection/SourceCodePanel container actived');

        // Init local state
        this.state = { 
            html: props.html,
            css: props.css,
            codeMirror: {
                readOnly: true
            }
        };

        // Bind methods
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: SourceCodePanelContainerProps & StateProps) {   

        if (this.props.watchingChanges !== nextProps.watchingChanges &&
            nextProps.watchingChanges) {
            
            // Active Edit Mode after launch user's action
            this.setState({
                codeMirror: {
                    readOnly: false
                }
            });

        }
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleOnChange
     * @method handleOnChange
     * @example this.handleOnChange()
     * @public
     * @param {string} type - source code type (e.g. 'html', 'css')
     * @param {string} newCode - new source code
     * @param {any} e - Event
     * @returns {void}
     */
    handleOnChange (newCode: string) {
        this._updateCode(this.props.tab, newCode);
    }

    /**
     * @desc HandleTabClick
     * @method handleTabClick
     * @example this.handleTabClick()
     * @public
     * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css')
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    handleTabClick = (tab: CodeTabMenuOption) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this._changeTab(tab);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Change Tab
     * @method _changeTab
     * @example this._changeTab()
     * @private
     * @param {CodeTabMenuOption} tab - source code tab (e.g. 'html', 'js', 'css') 
     * @returns {void}
     */
    private _changeTab(tab: CodeTabMenuOption) {
        this.props.actions.ui.changeSourceCodeTab(tab);
    }


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
        // Destructuring props
        const { atomId, name } = this.props;
        
        // Update local state
        this.setState((previousState) => {
            return {
                ...previousState,
                [type]: newCode
            };
        }, () => {
            // Launch Atom details changed Action
            this.props.actions.atomState.changedAtomDetails(atomId, name, type, {code: newCode});
        });
        
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { atomId, name } = this.props;
        const { tab } = this.props;
        const { watchingChanges } = this.props;
        const { html, css } = this.state;

        // VARIABLES
        let floatMenuOptions: Array<FloatMenuOption> = [
             FloatMenuOption.copy
        ];

        let messageConfig: BannerAlertProps = {
            type: BannerAlertOption.info,
            text: `You can now edit the code live. To keep your changes, 
                   duplicate the component by pressing Duplicate button.`,
            className: 'position-absolute activeEditModeMsg'
        };


        /*         MARKUP          */
        /***************************/
        return (
            <SourceCodePanel currentTab={tab}
                             id={atomId}
                             name={name}
                             html={html} 
                             css={css}
                             floatMenuBtns={floatMenuOptions}
                             onTabClick={this.handleTabClick}
                             onCodeChange={this.handleOnChange}
                             message={messageConfig}
                             showMessage={watchingChanges} />
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { tabs } = state.ui;
    const { sourceCodeTab } = tabs;
    const { tab } = sourceCodeTab;
    const { watchingChanges } = state.atomState.edited;

    return {
        tab,
        watchingChanges
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeSourceCodeTab: (tab) => dispatch(changeSourceCodeTabAction(tab))
            },
            atomState: {
                changedAtomDetails: (id, name, codeType, codeProps) => dispatch(changedAtomDetailsAction(id, name, codeType, codeProps))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sourceCodePanelContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    sourceCodePanelContainerConnect
)(SourceCodePanelContainer);