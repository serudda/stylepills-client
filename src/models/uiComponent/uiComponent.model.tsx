/************************************************/
/*             UI COMPONENT MODELS              */
/************************************************/
import {ColorPalette} from '../colorPalette/colorPalette.model';

/**
 * @desc Specifies the Ui Component type (model) to identify
 * its properties, methods, etc.
 * @type UiComponent
 */
export type UiComponent = {
    id: number;
    title: string;
    colorPalette: Array<ColorPalette>;
    css: string;
    scss: string;
    html: string;
}

