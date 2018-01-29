/************************************/
/*           DEPENDENCIES           */
/************************************/


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible lib type options */
export enum LibTypeOptions {
    css = 'css',
    javascript = 'javascript'
}

export type Lib = {
    id?: number | null;
    name: string;
    url: string;
    type: LibTypeOptions;
    active?: boolean;
};


/************************************/
/*             FUNCTIONS            */
/************************************/

/**
 * @desc Get stylesheet from external libreries 
 * @function getStylesheetsFromLibs
 * @example this.getStylesheetsFromLibs(libs)
 * @public
 * @param {Array<Lib>} libs - External Libs List
 * @returns {void}
 */
export function getStylesheetsFromLibs (libs: Array<Lib>) {

    let stylesheets = [];

    if (libs.length > 0) {
        for (let index = 0; index < libs.length; index++) {
            const lib = libs[index];
            if (lib.type === 'css') {
                stylesheets.push(lib.url);
            } 
        }   
    }

    return stylesheets;

}