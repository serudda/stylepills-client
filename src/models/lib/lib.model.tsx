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