/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../../core/utils/functionsUtil';
import { IRootState } from './../../../../../reducer/reducer.config';

import { clearAtomStateAction } from './../../../../../actions/atom.action';

import Icon from './../../../../../app/components/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SuccessProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    name: string
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        atomState: {
            clearAtomState: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Success
extends React.Component<ChildProps<SuccessProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SuccessProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('ComponentNew -> Step: Final - Success actived');
    }


    /********************************/
    /*     COMPONENT DID MOUNT      */
    /********************************/
    componentDidMount() {
        this.props.actions.atomState.clearAtomState();
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const { name } = this.props;

        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="Success StepByStep p-4">

                {/* STEP BY STEP: HEADER */}
                <div className="StepByStep__header mb-4">

                    <div className="nav-section d-none">{/* TODO: Remplazar d-none por d-flex */}
                        {/* Close button */}
                        <div className="iconContainer d-inline-flex flex-column align-items-center ml-auto">
                            <Icon icon="close"
                                iconClass="icon stroke-silver strokeWidth-2"
                                width="26" height="26"/>
                            <div className="label fontSize-xs color-silver fontWeight-7">ESC</div>
                        </div>
                    </div>

                    <div className="title-section text-center">
                        {/* Title */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-sm color-silver mt-5">
                            CREATE NEW COMPONENT
                        </div>
                        {/* Subtitle */}
                        <div className="fontFamily-openSans fontWeight-5 fontSize-xxl color-positive mt-2">
                            Created successfully!
                        </div>
                    </div>

                </div>

                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <div className="icon icon--md icon--newComponent mt-4 mb-3" />
                        <div className="text text--xs color-slate fontFamily-openSans fontWeight-7 mb-4">
                            The {name} component is already in your Components folder.
                        </div>
                    </li>
                </ul>
            </div>

        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { fields } = state.form.atomForm;
    const { name } = fields;

    return {
        name
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            atomState: {
                clearAtomState: () => dispatch(clearAtomStateAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const successConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    successConnect
)(Success);