/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createSelector } from 'reselect';
// import { denormalize } from 'normalizr';
// import { colorsListSchema } from './../normalizrs/ui.normalizr';
import { IRootState } from './../reducer/reducer.config';
import { ColorListItem, ColorsList } from './../reducer/ui.reducer';
import { Color as ColorModel } from './../models/color/color.model';

// -----------------------------------

// =================================================================
//       UI STATES SELECTORS =======================================
// =================================================================

/* 
    LISTS SELECTORS
    state: ui.lists.colorsList
*/

/**
 * @desc Get colorsList from state store
 * @function getColorList
 * @returns {ColorsList}
 */
export const getColorList = (state: IRootState): ColorsList => state.ui.lists.colorsList;

/**
 * @desc Get colorsList by type from state store (e.g. primary, secondary or grayscale type)
 * @function getColorListByType
 * @returns {Array<ColorListItem>}
 */
export const getColorListByType = (state: IRootState, props: any): Array<ColorListItem> => {
    const { colorsList } = state.ui.lists;
    return colorsList[props.colorType];
};

/**
 * @desc Get colorsList formatted to send to DB
 * @function getColorListFormatted
 * @returns {Array<ColorModel>}
 */
export const getColorListFormatted2 = (state: IRootState): Array<ColorModel> => {
    const { colorsList } = state.ui.lists;
    let colorPalette: Array<ColorModel> = [];
    
    /* return Object.keys(colorsList).map(
        key => {
            if (colorsList[key].length > 0) {
                return colorsList[key];
            } else {
                return {};
            }
        }
    ); */

    for (const key in colorsList) {
        if (colorsList.hasOwnProperty(key)) {
            colorPalette = colorPalette.concat(colorsList[key]);
        }
    }

    return colorPalette;
};

export const getColorListFormatted = createSelector(
    getColorList,
    (colorsList) => {
        let colorPalette: Array<ColorModel> = [];

        for (const key in colorsList) {
            if (colorsList.hasOwnProperty(key)) {
                colorPalette = colorPalette.concat(colorsList[key]);
            }
        }

        return colorPalette;
    }
);

/* export const getDenormalizeColorList2 = (state: IRootState, props: any) => {
    return createSelector(
        [getColorList],
        (colors: any) => {
            // generate view-specific structure
            return Object.keys(colors).map(key => {
                // return denormalize(colors, colorsListSchema, colors.result);
                if (key === props.colorType) {
                    return colors[key];
                }
            });
        });
}; */

export const makeGetColorListByType = () => { // NOTE: 1
    return createSelector(
        [getColorListByType],
        (colors: Array<ColorListItem>) => {
            return colors;
        });
};

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