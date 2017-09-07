// import response from '../data/uiComponents.json';
let data = require('../data/uiComponents.json');

export default function getUiComponents() {
    console.log('(1.10) Get UI Component from API Service on api/api.tsx');
    // data = JSON.parse(data);
    return data.response;
}