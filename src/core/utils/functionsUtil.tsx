/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from './../constants/app.constants';

import { ICurrentCode } from './../../actions/ui.action';
import { SourceCode } from './../../models/atom/atom.model';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IFunctionUtil {
    inArray: (array: Array<any>, comparisonProp: string, comparisonValue: any) => boolean;
    consoleLog: (message: string, value?: any) => void;
    sourceCodeArrayToObj: (sourceCode: Array<ICurrentCode>) => SourceCode;
    valueExistsInArray: (array: Array<any>, value: any, key: string) => boolean;
    truncateText: (str: string, length: number, ending: string) => string;
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
     * inArray
     * @desc - To know if an element already exists on an Array
     * @example - functionsUtil.inArray(array, 'id', 36);
     * @function
     * @param {Array<any>} array - array to analyze
     * @param {string} comparisonProp - field to use in order to compare (e.g. 'id')
     * @param {string} comparisonValue - value to compare against comparisonProps (e.g. 36)
     * @return {boolean} yes or no element is into the array
     */
    
    inArray(array: Array<any>, comparisonProp: string, comparisonValue: any): boolean {
    
        for (let i = 0; i < array.length; i++) {
            if (array[i][comparisonProp] === comparisonValue) {
                return true;
            }
        }
    
        return false;
    
    }



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
    truncateText(str: string = ' ', length: number = 100, ending: string = '...') {
        console.log('enter truncateText', str, length, ending);
        if (str == null) {
            console.log('enter str == null', str);
            str = '';
        }
        if (length == null) {
            console.log('enter length == null', length);
            length = 100;
        }
        if (ending == null) {
            console.log('enter ending == null', ending);
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();