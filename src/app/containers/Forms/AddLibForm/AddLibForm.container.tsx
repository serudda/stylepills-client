/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';

import {
    addLibItemAction
} from './../../../../actions/ui.action';

import { 
    Lib as LibModel,
    LibTypeOptions
} from './../../../../models/lib/lib.model';

import { TypeOption as BtnTypeOption } from './../../../components/Buttons/GenericBtn/GenericBtn';

import InlineForm from './../../../components/Forms/InlineForm/InlineForm';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddLibFormContainerProps = {
    label: string,
    helpMsg: string,
    libType: LibTypeOptions
};

/* Own States */
type LocalStates = {
    fields: {
        name?: string,
        url: string
    }
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            addLibItem: (lib: LibModel, libType: LibTypeOptions) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddLibFormContainer 
extends React.Component<ChildProps<AddLibFormContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AddLibFormContainerProps & StateProps & DispatchProps, {}>) {

        super(props);

        this.state = {
            fields: {
                name: '',
                url: ''
            }
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method handleInputChange
     * @example this.handleInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>} e - Event
     * @returns {void}
     */
    handleInputChange(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((previousState: LocalStates) => ({
            ...previousState,
            fields: {
                ...previousState.fields,
                [name]: value
            }
        }));
    }


    /**
     * @desc HandleAddClick
     * @method handleAddClick
     * @example this.handleAddClick()
     * @public
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    handleAddClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        const { libType } = this.props;
        const { name, url } = this.state.fields;

        // Create new lib instance
        let libModel: LibModel = {
            name,
            url,
            type: libType
        };
        
        this.props.actions.ui.addLibItem(libModel, libType);
        
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

            <InlineForm label={label}
                        helpMsg={helpMsg}
                        inputValue={this.state.fields.url}
                        inputName="url"
                        inputPlaceholder="e.g. https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        btnType={BtnTypeOption.secondary}
                        btnLabel="Add"
                        onInputChange={this.handleInputChange}
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
                addLibItem: (lib, libType) => dispatch(addLibItemAction(lib, libType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const addLibFormContainerConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    addLibFormContainerConnect
)(AddLibFormContainer);