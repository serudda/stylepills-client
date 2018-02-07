/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from './../constants/app.constants';

import { ICurrentCode } from './../../actions/ui.action';
import { SourceCode } from './../../models/atom/atom.model';
import { RgbaColor as RgbaColorModel } from './../../models/rgbaColor/rgbaColor.model';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IFunctionUtil {
    consoleLog: (message: string, value?: any) => void;
    sourceCodeArrayToObj: (sourceCode: Array<ICurrentCode>) => SourceCode;
    valueExistsInArray: (array: Array<any>, value: any, key: string) => boolean;
    truncateText: (str: string, length: number, ending: string) => string;
    convertHexToRgbaModel: (hex: string, opacity: number) => RgbaColorModel;
}


/************************************/
/*         CLASS DEFINITION         */
/************************************/
class FunctionsUtil implements IFunctionUtil {

    constructor() {/**/}


    /**********************************/
    /*            METHODS             */
    /**********************************/


    /**
     * @desc Generic console log
     * @function consoleLog
     * @example - this.consoleLog('AtomDetailsBox is actived');
     * @param {string} message - console log message
     * @param {any} value - values or object to show on console.log
     * @return {void}
     */

    consoleLog(message: string, value: any = ''): void {
        if (appConfig.DEBUG) {
            console.log(message, value);
        }
    }



    /**
     * @desc Get Source Code from currentCode (sourceCodePanel state on Store)
     * @function sourceCodeArrayToObj
     * @example this.sourceCodeArrayToObj(currentCode)
     * @param {Array<ICurrentCode>} sourceCode - A list of currentCode format (codeType and codeProps)
     * @return {SourceCode} obj - object parsed (e.g. obj = { "html": "<html>...</html>", "css": ".class {color: red}" })
     */
    sourceCodeArrayToObj(sourceCode: Array<ICurrentCode>): SourceCode {

        let obj: any = {};

        sourceCode.forEach((code) => {
            obj[code.codeType] = code.codeProps.code;
        });

        return obj;
    }



    /**
     * @desc Validate if a value exists on an Array
     * @function valueExistsInArray
     * @example this.valueExistsInArray(array, 'primary', 'typeColor')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {boolean} value exists in array (true or false)
     */
    valueExistsInArray(array: Array<any>, value: any, key: string = null): boolean {
        
        let res = false;

        if (array.length > 0) {

            let newArray = array.filter((elem: any) => {
                if (key) {
                    return elem[key] === value;
                } else {
                    return elem === value;
                }
            });

            if (newArray.length > 0) { res = true; }
        }

        return res;
    }



    /**
     * @desc Truncate a text based on a specific length and ending string
     * @function truncateText
     * @example this.truncateText('my long text', 200, '...')
     * @param {string} str - text to truncate
     * @param {number} length - max length allowed (number of chars on the text)
     * @param {string} ending - specific string to concat in the end of the text
     * @return {string} text truncated
     */
    truncateText(str: string = '', length: number = 100, ending: string = '...') {
        // NOTE: Asign default values when receive params, only validate undefined, not null. Null is considered a value
        if (str == null) { str = ''; }
        if (length == null) { length = 100; }
        if (ending == null) { ending = '...'; }

        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }



    /**
     * @desc Convert HEX to Rgba
     * @function convertHexToRgba
     * @example this.convertHexToRgba('#FFFFFF', 1)
     * @param {string} hex - hex color
     * @param {number} opacity - the color opacity
     * @return {string} rgba color
     */
    convertHexToRgbaModel(hex: string , opacity: number): RgbaColorModel {

        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
    
        let result: RgbaColorModel = {
            r, g, b, a: opacity
        };
        
        return result;
        
    }

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();