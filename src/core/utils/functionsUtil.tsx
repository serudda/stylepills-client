/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from './../constants/app.constants';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IFunctionUtil {
    consoleLog: (message: string, value?: any) => void;
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
     * @description - To know if an element already exists on an Array
     * @use - functionsUtil.inArray(array, 'id', 36);
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
     * consoleLog
     * @description - generic console log 
     * @use - this.consoleLog('AtomDetailsBox is actived');
     * @function
     * @param {string} message - console log message
     * @param {any} value - values or object to show on console.log
     * @return {void}
     */

    consoleLog(message: string, value: any = ''): void {
        if (appConfig.DEBUG) {
            console.log(message, value);
        }
    }

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();