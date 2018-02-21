/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible preprocessor type options */
export enum PreprocessorTypeOptions {
    sass = 'sass',
    scss = 'scss',
    less = 'less',
    stylus = 'stylus'
}

/* Possible preprocessor name options */
export enum PreprocessorNameOptions {
    sass = 'SASS',
    scss = 'SCSS',
    less = 'Less',
    stylus = 'Stylus'
}

/* Possible compileTo type options */
export enum CompileToTypeOptions {
    html = 'html',
    css = 'css',
    js = 'js'
}

export type Preprocessor = {
    id: number | null;
    type: PreprocessorTypeOptions;
    name: PreprocessorNameOptions
    compileTo: CompileToTypeOptions;
    active?: boolean;
};