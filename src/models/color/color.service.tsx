/********************************/
/*         DEPENDENCIES         */
/********************************/
const ntc = require('ntcjs');
// -----------------------------------


/**********************************/
/*           INTERFACES           */
/**********************************/

export interface IColorService {
    generateColorName: (hex: string) => string;
}


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class ColorService implements IColorService {


    /*       METHODS       */
    /***********************/
    
    /**
     * @desc Generate color name based on a HEX code
     * @function generateColorName
     * @example this.generateColorName('#FFFFFF')
     * @public
     * @param {string} hex - HEX code color
     * @returns {string} color name
     */
    generateColorName (hex: string): string {
        
        if (hex) {
            const nameMatch = ntc.name(hex);
            return nameMatch[1];
        }

        return null;
    }

}


/* Export instance */
export default new ColorService();