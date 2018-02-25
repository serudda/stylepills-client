/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import { showModalAction } from './../../../../actions/ui.action';

import { 
    Option as ModalOption 
} from './../../../containers/Modals/ModalManager/ModalManager.container';

import InlineFormWithoutInput from './../../../components/Forms/InlineFormWithoutInput/InlineFormWithoutInput';
import { TypeOption as BtnTypeOption } from './../../../components/Buttons/GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddSourceFormContainerProps = {
    label: string,
    helpMsg: string
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            showModal: (modalType: ModalOption, modalProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddSourceFormContainer 
extends React.Component<ChildProps<AddSourceFormContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AddSourceFormContainerProps & StateProps & DispatchProps) {
        super(props);

        // Bind methods
        this.handleAddClick = this.handleAddClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleAddClick
     * @method handleAddClick
     * @example this.handleAddClick()
     * @public
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private handleAddClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this._showModal();
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Show Modal 
     * @method _showModal
     * @example this._showModal()
     * @private
     * @returns {void}
     */
    private _showModal() {
        this.props.actions.ui.showModal(ModalOption.SourceModal, null);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { label, helpMsg } = this.props;

        /*         MARKUP          */
        /***************************/
        return (

            <InlineFormWithoutInput label={label}
                                    helpMsg={helpMsg}
                                    btnType={BtnTypeOption.secondary}
                                    btnLabel="Add"
                                    onBtnClick={this.handleAddClick}/>
            
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const addSourceFormContainerConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    addSourceFormContainerConnect
)(AddSourceFormContainer);