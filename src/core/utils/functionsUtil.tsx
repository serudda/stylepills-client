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

interface INormalizedResult {
    result: Array<string>;
    entities: any;
}

interface IFunctionUtil {
    updateObject: (oldObject: Object, newValues: any) => any;
    copyArray: (array: Array<any>) => Array<any>;
    updateItemInArray: (array: Array<any>, key: string, value: number | string, updateItemCallback: Function) => Array<any>;
    deleteItemInArray: (array: Array<any>, key: string, value: number | string) => Array<any>;
    itemExistsInArray: (array: Array<any>, value: any, key: string) => boolean;
    turnArrayIntoObject: (array: Array<any>, key?: string) => Object;
    deletePropInCollection: (array: Array<any>, ...props: Array<any>) => any;
    consoleLog: (message: string, value?: any) => void;
    sourceCodeArrayToObj: (sourceCode: Array<ICurrentCode>) => SourceCode;
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
     * @desc Encapsulate the idea of passing a new object as 
     * the first parameter to Object.assign to ensure we correctly 
     * copy data instead of mutating.
     * @function updateObject
     * @example - this.updateObject(state, {todos : newTodos});
     * @param {Object} oldObject - old object to update
     * @param {any} newValues - values or object to include in old object
     * @return {Object}
     */
    updateObject(oldObject: Object, newValues: any = {}): any {
        return Object.assign({}, oldObject, newValues);
    }


    /**
     * @desc Encapsulate the idea of copy an Array ensuring we 
     * correctly copy data instead of mutating.
     * @function copyArray
     * @example - this.copyArray(array);
     * @param {Array<any>} array - old array to concat (or copy)
     * @param {Array<any>} newArray - new array to use to concat
     * @return {Array<any>}
     */
    copyArray(array: Array<any>): Array<any> {
        return [].concat(array);
    }


    /**
     * @desc Encapsulate the idea of updating and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function updateItemInArray
     * @example 
     * const newTodos = updateItemInArray(state.todos, 'id', action.id, todo => {
     *      return updateObject(todo, {completed : !todo.completed});
     * });
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    updateItemInArray(
        array: Array<any>,
        key: string = 'id',
        value: number | string, 
        updateItemCallback: Function): Array<any> {

        const updatedItems = array.map(item => {
            if (item[key] !== value) {
                /* Since we only want to update one item, 
                    preserve all others as they are now */
                return item;
            }
    
            // Use the provided callback to create an updated item
            const updatedItem = updateItemCallback(item);
            return updatedItem;
        });
    
        return updatedItems;
    }


    /**
     * @desc Encapsulate the idea of deleting and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function deleteItemInArray
     * @example 
     * const newTodos = deleteItemInArray(state.todos, 'id', action.id);
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    deleteItemInArray(
        array: Array<any>,
        key: string = 'id',
        value: number | string): Array<any> {

        const newList = array.filter(
            (item) => {
            if (item[key] === value) {
                return false;
            } else {
                return true;
            }
        });
    
        return newList;
    }


    /**
     * @desc Validate if an item exists on an Array
     * @function itemExistsInArray
     * @example this.itemExistsInArray(array, 'primary', 'typeColor')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {boolean} value exists in array (true or false)
     */
    itemExistsInArray(array: Array<any>, value: any, key: string = null): boolean {
        
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
     * @desc Turn an Array into an Object (normalize)
     * @function turnArrayIntoObject
     * @example this.turnArrayIntoObject(array, 'tempId')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {INormalizedResult} it return and normalized result object
     */
    turnArrayIntoObject(array: Array<any>, key: string = 'id'): INormalizedResult {
        
        const entities = array.reduce((accumulator, current) => {
            accumulator[current[key]] = current;
            return accumulator;
        }, {});
         
        const result = Object.keys(entities).map(entityKey => {
                return entityKey;
            }
        );
          
        return {entities, result};
    }


    /**
     * @desc Encapsulate the idea of deleting and item in an array 
     * to ensure we correctly copy data instead of mutating.
     * @function deleteItemInArray
     * @example 
     * const newTodos = deleteItemInArray(state.todos, 'id', action.id);
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    deletePropInCollection(array: Array<any>, ...props: Array<any>): Array<any> {

        const newCollection = array.filter((item) => {

            props.forEach(
                (prop) => { 
                    delete item[prop];
                }
            );
            
            return true;
        });

        return newCollection;

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