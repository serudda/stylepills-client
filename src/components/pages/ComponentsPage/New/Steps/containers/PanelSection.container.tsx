/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as appConfig from './../../../../../../core/constants/app.constants';

import { IRootState } from './../../../../../../reducer/reducer.config';

import { Preprocessor as PreprocessorModel } from './../../../../../../models/preprocessor/preprocessor.model';

import { changePreprocessorAction } from './../../../../../../actions/preprocessor.action';

import { getAtomDetailsTab } from './../../../../../../selectors/ui.selector';

import PanelSection from './../components/PanelSection';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================


/* Own Props */
type PanelSectionContainerProps = {};

/* Own States */
type LocalStates = {};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    tab: string;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        preprocessorState: {
            changePreprocessor: (preprocessorId: number) => void
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    PanelSectionContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PanelSectionContainer 
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_PREPROCESSOR_INSTANCE: PreprocessorModel = {
        id: appConfig.SOURCE_CODE_DEFAULT_ID_ON_DB_OPTION,
        name: appConfig.SOURCE_CODE_DEFAULT_NAME_OPTION,
        type: appConfig.SOURCE_CODE_DEFAULT_TYPE_OPTION,
        extension: appConfig.SOURCE_CODE_DEFAULT_EXT_OPTION,
        compileTo: appConfig.SOURCE_CODE_DEFAULT_COMPILETO_OPTION
    };


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AllProps, {}>) {
        super(props);
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {
        // Init States on Store
        this._initCurrentPreprocessor();
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Init currentPreprocessor State in Store
     * @method _initCurrentPreprocessor
     * @example this._initCurrentPreprocessor()
     * @private 
     * @returns {void}
     */
    private _initCurrentPreprocessor() {
        // Destructuring props & states
        const preprocessor = this._DEFAULT_PREPROCESSOR_INSTANCE ;

        this.props.actions.preprocessorState.changePreprocessor(preprocessor.id);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        const { tab } = this.props;

        /*         MARKUP          */
        /***************************/
        return (
            <PanelSection tab={tab} />
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
            preprocessorState: {
                changePreprocessor: (preprocessorId) => dispatch(changePreprocessorAction(preprocessorId))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const panelSectionContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    panelSectionContainerConnect
)(PanelSectionContainer);