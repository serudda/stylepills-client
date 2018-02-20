/************************************/
/*           DEPENDENCIES           */
/************************************/
import { RgbaColor } from '../rgbaColor/rgbaColor.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible color type options */
export enum ColorTypeOptions {
    primary = 'primary',
    secondary = 'secondary',
    grayscale = 'grayscale'
}

export type Basic = {
    hex: string;
    rgba: RgbaColor;
    name?: string;
};

export type Color = {
    id?: number | null;
    name: string;
    hex: string;
    rgba: RgbaColor;
    type: ColorTypeOptions;
    active?: boolean;
};