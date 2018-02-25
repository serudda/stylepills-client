/********************************/
/*         DEPENDENCIES         */
/********************************/
import { RgbaColor as RgbaColorModel } from './rgbaColor.model';
// -----------------------------------


/**********************************/
/*           INTERFACES           */
/**********************************/

export interface IRgbaColorService {
    convertHexToRgbaModel: (hex: string, opacity: number) => RgbaColorModel;
}


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class RgbaColorService implements IRgbaColorService {


    /*       METHODS       */
    /***********************/
    
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


/* Export instance */
export default new RgbaColorService();