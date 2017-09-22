/*************************************************/
/*                  COLOR MODELS                 */
/*************************************************/

/**
 * @desc Specifies the 'Color' type (model) to identify
 * its properties, methods, etc.
 * @type Color
 */
export type Color = {
    id: number | null;
    label: string;
    hex: string;
};


// FIXME: Cuando se incluya GraphQL al proyecto, es necesario remover esta interface
// de aqui. Creo que esto no es necesario despues de agregar GraphQL al proyecto
export interface IColorState {
    items: any;
    error: string;
    fetching: Boolean;
    fetched: Boolean;
}