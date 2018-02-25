/********************************/
/*         DEPENDENCIES         */
/********************************/
import {
    CodeSupportedOption
} from './../../core/interfaces/interfaces';


// -----------------------------------


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible preprocessor type options */
export type PreprocessorTypeOptions = CodeSupportedOption;

/* Possible preprocessor name options */
export enum PreprocessorNameOptions {
    html = 'Html',
    css = 'CSS',
    sass = 'SASS',
    scss = 'SCSS',
    less = 'Less',
    stylus = 'Stylus',
}

/* Possible preprocessor extension options */
export enum PreprocessorExtOptions {
    html = 'html',
    css = 'css',
    sass = 'sass',
    scss = 'scss',
    less = 'less',
    stylus = 'styl'
}

/* Possible compileTo type options */
export enum CompileToTypeOptions {
    html = 'none',
    css = 'none',
    sass = 'css',
    scss = 'css',
    less = 'css',
    stylus = 'css'
}

export type Preprocessor = {
    id: number | null,
    type: PreprocessorTypeOptions,
    extension: PreprocessorExtOptions,
    name: PreprocessorNameOptions,
    compileTo: CompileToTypeOptions,
    active?: boolean
};