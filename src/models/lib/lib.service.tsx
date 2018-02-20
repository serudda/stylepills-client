/********************************/
/*         DEPENDENCIES         */
/********************************/

import { Lib as LibModel } from './lib.model';

// -----------------------------------


/**********************************/
/*           INTERFACES           */
/**********************************/

export interface ILibService {
    getStylesheetsFromLibs: (libs: Array<LibModel>) => Array<string>;
    getAtomLibsFromList: (libs: Array<LibModel>) => Array<LibModel>;
}


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class LibService implements ILibService {


    /*       METHODS       */
    /***********************/
    
    /**
     * @desc Get stylesheet from external libreries 
     * @function getStylesheetsFromLibs
     * @example this.getStylesheetsFromLibs(libs)
     * @public
     * @param {Array<LibModel>} libs - External Libs List
     * @returns {Array<string>} stylesheets - A stylesheets list ['http://css', 'https://css2', ... ]
     */
    getStylesheetsFromLibs (libs: Array<LibModel>): Array<string> {

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


    /**
     * @desc Get atom's lib from an list of libs
     * @function getAtomLibsFromList
     * @example this.getAtomLibsFromList(libs)
     * @public
     * @param {Array<LibModel>} libs - External Libs List
     * @returns {Array<LibModel>} atomLibs - Atom's libs
     * TODO: Cuando estoy creando un Atom, solo guardo en ui.libPanel state store:
     * name y url, por ende, aqui cuando pregunto que si candidate.atom !== null, esta
     * pasando, ya que la propiedad atom es undefined, no null. Esto funciona por que
     * siempre asigno null en base, sino fuera asi, esto se romperia. Hay una alta 
     * dependencia aqui a que yo siga asignando NULL en lib.atom, si llego a dejar de hacerlo
     * romperia muy feo aqui.
     */
    getAtomLibsFromList(libs: Array<LibModel>) {

        let atomLibs = libs.filter(function (candidate: LibModel) {
            return candidate.atom !== null;
        });

        return atomLibs;

    }
}


/* Export instance */
export default new LibService();