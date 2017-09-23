/*************************************************/
/*             COLOR PALETTE MODELS              */
/*************************************************/
import { Color } from '../color/color.model';


/**
 * @desc Specifies the 'Color Palette' type (model) to identify
 * its properties, methods, etc.
 * @type ColorPalette
 */
export type ColorPalette = {
    id: number | null;
    category: string;
    description: string;
    colors: Array<Color>;
};

