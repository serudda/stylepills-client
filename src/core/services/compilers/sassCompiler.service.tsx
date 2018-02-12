/**********************************/
/*          DEPENDENCIES          */
/**********************************/
import { IStatus } from './../../interfaces/interfaces';
import { functionsUtil } from './../../utils/functionsUtil';
let Sass = require('sass.js');


/**********************************/
/*           INTERFACES           */
/**********************************/

/* Possible Status response */
export enum CompileStatus {
    successful = 0
}

export interface ISassCompilerService {
    compile: (source: string) => Promise<{}>;
}

export type ISassCompilerResult = {
    status: number;
    text?: string;
    message?: string | null;
    formatted?: string;
    line?: number;
};

export interface IResponse extends IStatus<any> {
    text?: string;
    message?: string | null;
    line?: number;
}


/****************************************/
/*           CLASS DEFINITION           */
/****************************************/
class SassCompilerService implements ISassCompilerService {


    /**********************************/
    /*           PROPERTIES           */
    /**********************************/
    private _style: string;

    // --------------------------------


    /**********************************/
    /*           CONSTRUCTOR          */
    /**********************************/
    constructor() {
        // LOG
        functionsUtil.consoleLog('SassCompiler service instanced');

        // Init properties
        this._style = 'expanded';
    }


    /**********************************/
    /*      GETTERS AND SETTERS       */
    /**********************************/

    get Style() {
        return this._style;
    }

    set Style(style: string) {
        if (style === undefined) { throw 'Please supply style'; }
        this._style = style;
    }


    /**********************************/
    /*            METHODS             */
    /**********************************/

    writeCoreFiles(type: string, source: string) {
        // TODO: No implementar esto hasta no tener la estructura de datos pensada.
        // https://github.com/medialize/sass.js/blob/master/docs/api.md#working-with-files
        Sass.writeFile(`${type}.scss`, source);        
    }

    /**
     * compile
     * @description - Compile SASS to CSS
     * @use - this.SassCompilerService.compile(source);
     * @function
     * @param {string} source sass source code
     * @return {Promise<{}>} Sass compiler response 
     */

    compile(source: string): Promise<{}> {

        const sassOptions = {
            style: this._style
        };
         
        return new Promise((resolve, reject) => {

            Sass.compile(
                source, 
                sassOptions, 
                (result: ISassCompilerResult) => {

                    let response: IResponse = {
                        ok: false,
                        message: null,
                        line: null
                    };

                    /* status 0 means everything is ok,
                       any other value means an error occurred */
                    if (result.status !== CompileStatus.successful) {
                        response.message = result.message;
                        response.line = result.line;
                        resolve(response);
                        /* NOTE: Use resolve instead of reject since it returns by default an: {ok, message},
                        but we cannot include my own props, for example: line */
                        /* return reject(result.message); */
                    }

                    if (result.status === CompileStatus.successful) {
                        response.ok = true;
                        response.text = result.text;
                        resolve(response);
                    }

                });

        }).catch((err) => {

            // LOG
            functionsUtil.consoleLog('sassCompiler.service/compile method - Error: ', { err });

            return {
                ok: false,
                message: err
            };
        });
    }

}

/* Export Config instance */
export const sassCompilerService = new SassCompilerService();