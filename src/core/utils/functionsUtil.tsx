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
     * consoleLog
     * @description - generic console log 
     * @use - this.consoleLog('AtomDetailsBox is actived');
     * @function
     * @param {string} message - console log message
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