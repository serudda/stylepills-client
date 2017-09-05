// import response from '../data/uiComponents.json';
let data = require('../data/uiComponents.json');

export default function getUiComponents() {
    // data = JSON.parse(data);
    return data.response;
}