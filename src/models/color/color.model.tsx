/************************************/
/*           DEPENDENCIES           */
/************************************/
import { RgbaColor } from '../rgbaColor/rgbaColor.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export type Basic = {
    hex: string;
    rgba: RgbaColor;
};

export type Color = {
    id?: number | null;
    name: string;
    hex: string;
    rgba: RgbaColor;
    type: string;
    active?: boolean;
};