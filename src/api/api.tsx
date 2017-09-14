/************************************/
/*           DEPENDENCIES           */
/************************************/
import {UiComponent} from '../models/uiComponent/uiComponent.model';
import {ColorPalette} from '../models/colorPalette/colorPalette.model';
let data = require('../data/uiComponents.json');

export function getUiComponents(): Array<UiComponent> {
    return data.response;
}

export function getColorPalettes(): Array<ColorPalette> {
    return data.response;
}