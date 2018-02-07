/************************************/
/*           DEPENDENCIES           */
/************************************/
import { Atom as AtomModel } from './../atom/atom.model';
import { Project as ProjectModel } from './../project/project.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible lib type options */
export enum LibTypeOptions {
    css = 'css',
    js = 'js'
}

export type Lib = {
    id?: number | null;
    name: string;
    url: string;
    type: LibTypeOptions;
    atom?: AtomModel;
    project?: ProjectModel;
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


/**
 * @desc Get atom's lib from an list of libs
 * @function getAtomLibsFromList
 * @example this.getAtomLibsFromList(libs)
 * @public
 * @param {Array<Lib>} libs - External Libs List
 * @returns {Array<Lib>} atomLibs - Atom's libs
 * TODO: Cuando estoy creando un Atom, solo guardo en ui.libPanel state store:
 * name y url, por ende, aqui cuando pregunto que si candidate.atom !== null, esta
 * pasando, ya que la propiedad atom es undefined, no null. Esto funciona por que
 * siempre asigno null en base, sino fuera asi, esto se romperia. Hay una alta 
 * dependencia aqui a que yo siga asignando NULL en lib.atom, si llego a dejar de hacerlo
 * romperia muy feo aqui.
 */
export function getAtomLibsFromList(libs: Array<Lib>) {

    let atomLibs = libs.filter(function (candidate: Lib) {
        return candidate.atom !== null;
    });

    return atomLibs;

}