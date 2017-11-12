/********************************/
/*         DEPENDENCIES         */
/********************************/
import { Atom as AtomModel } from './../atom/atom.model';

/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export interface IPaginationInput {
    first: number;
    after: string;
    last: number;
    before: string;
}

export interface ICursor {
    hasNext: boolean;
    hasPrevious: Boolean;
    before: string;
    after: string;
}

export interface IAtomPaginated {
    results: Array<AtomModel>;
    cursors: ICursor;
}