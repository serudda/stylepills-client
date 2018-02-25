/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { CodeSupportedOption } from './../../../../../core/interfaces/interfaces';

import { functionsUtil } from '../../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../../reducer/reducer.config';

import { changedAtomDetailsAction } from './../../../../../actions/atom.action';

import { 
    Option as BannerAlertOption,
    BannerAlertProps
} from './../../../../../app/components/Alerts/BannerAlert/BannerAlert';

import SourceCodePanel, { FloatMenuOption } from './../../../../../app/components/SourceCodePanel/SourceCodePanel';

import { getSourceCodeTab } from './../../../../../selectors/ui.selector';


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
    tab: CodeSupportedOption;
    watchingChanges: boolean;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
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


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { atomId, name } = this.props;
        const { tab } = this.props;
        const { watchingChanges } = this.props;

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
            <SourceCodePanel id={atomId}
                             name={name}
                             currentTab={tab}
                             floatMenuBtns={floatMenuOptions}
                             message={messageConfig}
                             showMessage={watchingChanges} />
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { watchingChanges } = state.atomState.edited;

    return {
        tab: getSourceCodeTab(state),
        watchingChanges
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
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