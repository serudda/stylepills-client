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

/* Possible compileTo type options */
export enum CompileToTypeOptions {
    html = 'html',
    css = 'css',
    js = 'js'
}

export type Preprocessor = {
    id?: number | null;
    type: PreprocessorTypeOptions;
    compileTo: CompileToTypeOptions;
    active: boolean;
};