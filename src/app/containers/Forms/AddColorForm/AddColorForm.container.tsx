/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as appConfig from './../../../../core/constants/app.constants';
import { IRootState } from './../../../../reducer/reducer.config';

import {
    changeColorAction,
    addColorItemAction,
} from './../../../../actions/ui.action';

import { 
    Basic as BasicColorModel,
    Color as ColorModel, 
    ColorTypeOptions 
} from './../../../../models/color/color.model';

import { getCurrentColorByType } from './../../../../selectors/ui.selector';

import AddColorForm from './../../../components/Forms/AddColorForm/AddColorForm';

// const ntc = require('ntcjs');

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AddColorFormContainerProps = {
    label: string,
    helpMsg: string,
    colorType: ColorTypeOptions
};

/* Own States */
type LocalStates = {
    showForm: boolean
};

/* Mapped State to Props */
type StateProps = {
    color: BasicColorModel
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            addColorItem: (color: ColorModel, colorType: ColorTypeOptions) => void;
            changeColor: (color: BasicColorModel, colorType: ColorTypeOptions) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AddColorFormContainer 
extends React.Component<ChildProps<AddColorFormContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AddColorFormContainerProps & StateProps & DispatchProps, {}>) {

        super(props);

        // Init local state
        this.state = {
            showForm: props.colorType === ColorTypeOptions.primary ? true : false
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleShowFormClick = this.handleShowFormClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleInputChange
     * @method handleInputChange
     * @example this.handleInputChange()
     * @public
     * @param {React.ChangeEvent<HTMLInputElement>} e - Event
     * @returns {void}
     */
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { colorType, color = {
            hex: appConfig.SECONDARY_COLOR_HEX,
            rgba: appConfig.SECONDARY_COLOR_RGBA,
            name: appConfig.SECONDARY_COLOR_NAME
        } } = this.props;
        const { hex, rgba } = color;
        const target = e.target;
        const value = target.value;

        // Receive input change value and save it on Store NOTE: 1
        this.props.actions.ui.changeColor({hex, rgba, name: value}, colorType);
    }


    /**
     * @desc HandleShowFormClick
     * @method handleShowFormClick
     * @example this.handleShowFormClick()
     * @private 
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    handleShowFormClick(e: React.FormEvent<{}>) {
        e.preventDefault();
        this.setState({ showForm: true });
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

        const { colorType, color = {
            hex: appConfig.SECONDARY_COLOR_HEX,
            rgba: appConfig.SECONDARY_COLOR_RGBA,
            name: appConfig.SECONDARY_COLOR_NAME
        } } = this.props;

        // Create new color instance
        let colorModel: ColorModel = {
            name: color.name,
            hex: color.hex,
            type: colorType,
            rgba: color.rgba
        };
        
        this.props.actions.ui.addColorItem(colorModel, colorType);
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & states
        const { colorType, label, helpMsg, color = {
            name: appConfig.SECONDARY_COLOR_NAME
        } } = this.props;
        const { showForm } = this.state;

        
        /*         MARKUP          */
        /***************************/
        return (

            <AddColorForm label={label}
                          helpMsg={helpMsg}
                          colorType={colorType}
                          showForm={showForm}
                          inputValue={color.name}
                          inputName="colorName"
                          onAddClick={this.handleAddClick}
                          onShowFormClick={this.handleShowFormClick}
                          onInputNameColorChange={this.handleInputChange}/>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState, ownProps: AddColorFormContainerProps): StateProps {
    return {
        color: getCurrentColorByType(state, ownProps)
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color, colorType) => dispatch(changeColorAction(color, colorType)),
                addColorItem: (color, colorType) => dispatch(addColorItemAction(color, colorType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const addColorFormContainerConnect = connect(mapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    addColorFormContainerConnect
)(AddColorFormContainer);


/*
(1): No uso localState ya que se me complicaba mantener el valor de State Store, y el local State sincronizados,
Asi que la mejor fue omitir en este caso el setState del input, y enviar directamente el valor al Store con la
action: changeColor
*/