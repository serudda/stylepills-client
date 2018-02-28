/************************************/
/*           DEPENDENCIES           */
/************************************/
import { Preprocessor as PreprocessorModel } from './../preprocessor/preprocessor.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/
export type Source = {
    id?: number | null;
    name: string;
    filename: string;
    code: string;
    preprocessor: PreprocessorModel;
    preprocessorId?: number;
    order: number;
    active?: boolean;
};