/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';
import { ColorListItem } from './../../../reducer/ui.reducer';

import {  
    deleteColorItemAction, 
} from './../../../actions/ui.action';

import { makeGetColorListByType } from './../../../selectors/ui.selector';

import { ColorTypeOptions } from './../../../models/color/color.model';

import ColorsList from './../../components/ColorsList/ColorsList';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ColorsListContainerProps = {
    colorType: ColorTypeOptions
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    colorsList: Array<ColorListItem>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            deleteColorItem: (id: string | number, colorType: ColorTypeOptions) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ColorsListContainer 
extends React.Component<ChildProps<ColorsListContainerProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ColorsListContainerProps & StateProps & DispatchProps) {
        super(props);

        // Bind methods
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc HandleDeleteClick
     * @method handleDeleteClick
     * @example this.handleDeleteClick()
     * @public
     * @param {string | number} id - color id
     * @returns {void}
     */
    handleDeleteClick = (id: string | number) => (e: React.FormEvent<{}>) => {
        const { colorType } = this.props;
        this._deleteColorItem(id, colorType);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Delete Color Item
     * @method _deleteColorItem
     * @example this._deleteColorItem(2)
     * @private
     * @param {string | number} id - color id
     * @returns {void}
     */
    private _deleteColorItem(id: string | number, colorType: ColorTypeOptions) {
        this.props.actions.ui.deleteColorItem(id, colorType);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { colorsList } = this.props;

        /*         MARKUP          */
        /***************************/
        return (

            <ColorsList colors={colorsList}
                        onDeleteClick={this.handleDeleteClick}/>
            
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
const makeMapStateToProps = () => { // NOTE: 1
    const getColorListByType = makeGetColorListByType();
    const mapStateToProps = (state: IRootState, props: ColorsListContainerProps) => {
        return {
            colorsList: getColorListByType(state, props)
        };
    };
    return mapStateToProps;
};


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                deleteColorItem: (id, colorType) => dispatch(deleteColorItemAction(id, colorType))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const colorsListContainerConnect = connect(makeMapStateToProps, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    colorsListContainerConnect
)(ColorsListContainer);


/*
(1): Esto es necesario para poder compartir 'selectores' entre componentes que esten repetidos en la misma pagina:
e.g.
    <div>
        <VisibleTodoList listId="1" />
        <VisibleTodoList listId="2" />
        <VisibleTodoList listId="3" />
    </div>

    Cada uno necesita hacer uso del mismo selector, pero para que estos devuelvan espacios de State store diferentes (sino 
    entonces al modificar uno, los demas se modificarian) es necesario 'make' el selector privado para cada componente.
    Los que hacemos es aqui crear esta especie de Wrapper, y en el componente se crea una funcion: makeMapStateToProps
    En lugar de cotidiano mapStateToProps, el cual se encarga de generar dinamicamente un 'mapStateToProps' dinamico 
    por cada instancia repetida en la misma pantalla:

    const makeMapStateToProps = () => {
        const getColorListByType = makeGetColorListByType();
        const mapStateToProps = (state: IRootState, props: ColorsListContainerProps) => {
            return {
                colorsList: getColorListByType(state, props)
            };
        };
        return mapStateToProps;
    };

    ...

    const colorsListContainerConnect = connect(makeMapStateToProps, mapDispatchToProps);

    Este ejemplo claro lo puedo encontrar en el componente container: ColorsList.container el cual muestra en pantalla
    3 ColorList diferentes: primary, secondary y grayscale.

    reference: https://github.com/reactjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
    otro ejemplo de como funciona: https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
*/