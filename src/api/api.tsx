/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as model from '../models/uiComponent/uiComponent.model';
let data = require('../data/uiComponents.json');

export default function getUiComponents(): Array<model.UiComponent> {
    return data.response;
}