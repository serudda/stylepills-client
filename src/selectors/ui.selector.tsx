/************************************/
/*           DEPENDENCIES           */
/************************************/
import { createSelector } from 'reselect';

import { IRootState } from './../reducer/reducer.config';
import { functionsUtil } from './../core/utils/functionsUtil';
import {
    SourceListItem,
    LibListItem, LibsList,
    ColorListItem, ColorsList
} from './../reducer/ui.reducer';
import {
    Basic as BasicColorModel, 
    Color as ColorModel
} from './../models/color/color.model';
import {
    Lib as LibModel
} from './../models/lib/lib.model';

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
export const getColorsList = (state: IRootState): ColorsList => state.ui.lists.colorsList;


/**
 * @desc Get colorsList by type from state store (e.g. primary, secondary or grayscale type)
 * @function getColorListByType
 * @returns {Array<ColorListItem>}
 */
export const getColorListByType = (state: IRootState, props: any): Array<ColorListItem> => {
    const { colorType } = props;
    const group = colorType ? colorType : 'general';

    return state.ui.lists.colorsList[group];
};


/**
 * @desc Wrap getColorListByType in order to use it on 
 * multiple components instance on the same page
 * @function makeGetColorListByType
 * @returns {Array<ColorListItem>}
 */
export const makeGetColorListByType = () => { // NOTE: 1
    return createSelector(
        [getColorListByType],
        (colors: Array<ColorListItem>) => {
            return colors;
        });
};


/**
 * @desc Get colorsList formatted to send to DB
 * @function getColorListFormatted
 * @returns {Array<ColorModel>}
 */
export const getColorListFormatted = createSelector(
    getColorsList,
    (colorsList) => {
        let colorPalette: Array<ColorModel> = [];

        for (const key in colorsList) {
            if (colorsList.hasOwnProperty(key)) {
                colorPalette = colorPalette.concat(colorsList[key]);
            }
        }

        // Remove extra 'tempId' prop
        colorPalette = functionsUtil.deletePropInCollection(colorPalette, 'tempId');

        return colorPalette;
    }
);


/* 
    LISTS SELECTORS
    state: ui.lists.sourcesList
*/


/**
 * @desc Get sourcesList from state store
 * @function getSourcesList
 * @returns {SourcesList}
 */
export const getSourcesList = (state: IRootState): Array<SourceListItem> => state.ui.lists.sourcesList;



/* 
    LISTS SELECTORS
    state: ui.lists.libsList
*/


/**
 * @desc Get libsList from state store
 * @function getLibsList
 * @returns {LibsList}
 */
export const getLibsList = (state: IRootState): LibsList => state.ui.lists.libsList;


/**
 * @desc Get libsList by type from state store (e.g. css, js, etc)
 * @function getLibListByType
 * @returns {Array<LibListItem>}
 */
export const getLibListByType = (state: IRootState, props: any): Array<LibListItem> => {
    const { libType } = props;
    const group = libType ? libType : 'css';

    return state.ui.lists.libsList[group];
};


/**
 * @desc Wrap getLibListByType in order to use it on 
 * multiple components instance on the same page
 * @function makeGetLibListByType
 * @returns {Array<LibListItem>}
 */
export const makeGetLibListByType = () => { // NOTE: 1
    return createSelector(
        [getLibListByType],
        (libs: Array<LibListItem>) => {
            return libs;
        });
};


/**
 * @desc Get libsList formatted to send to DB
 * @function getLibListFormatted
 * @returns {Array<LibModel>}
 */
export const getLibListFormatted = createSelector(
    getLibsList,
    (libsList) => {
        let externalLibs: Array<LibModel | LibListItem> = [];

        for (const key in libsList) {
            if (libsList.hasOwnProperty(key)) {
                externalLibs = externalLibs.concat(libsList[key]);
            }
        }

        // Remove extra 'tempId' prop
        externalLibs = functionsUtil.deletePropInCollection(externalLibs, 'tempId');

        return externalLibs;
    }
);


// ----------------------------------------------------------------------------------


/* 
    COLORPICKER SELECTORS
    state: ui.colorPicker.currentColor
*/

/**
 * @desc Get currentColor from state store
 * @function getCurrentColor
 * @returns {BasicColorModel}
 */
export const getCurrentColor = (state: IRootState): BasicColorModel => state.ui.colorPicker.currentColor.general;


/**
 * @desc Get currentColor by Type from state store (e.g. primary, secondary or grayscale type)
 * @function getCurrentColorByType
 * @returns {BasicColorModel}
 */
export const getCurrentColorByType = (state: IRootState, props: any): BasicColorModel => {
    const { colorType } = props;
    const group = colorType ? colorType : 'general';

    return state.ui.colorPicker.currentColor[group];
};


/**
 * @desc Wrap getCurrentColor in order to use it on 
 * multiple components instance on the same page
 * @function makeGetCurrentColorByType
 * @returns {BasicColorModel}
 */
export const makeGetCurrentColorByType = () => { // NOTE: 1
    return createSelector(
        [getCurrentColorByType],
        (currentColor: BasicColorModel) => {
            return currentColor;
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