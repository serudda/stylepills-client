import * as types from '../constants/actionTypes';

// Return an action type, GET_UICOMPONENT and the ui components list
export const getUiComponentAction = () => ({
    type: types.GET_UICOMPONENT
});

// Return an action type, GET_UICOMPONENT_SUCCESS and the ui components list
export const getUiComponentSuccessAction = (uiComponents: Array<any>) => ({
    type: types.GET_UICOMPONENT_SUCCESS,
    uiComponents
});

// Return an action type, GET_UICOMPONENT_ERROR and the error message
export const getUiComponentErrorAction = (errorMessage: string) => ({
    type: types.GET_UICOMPONENT_ERROR,
    errorMessage
});

// Return an action type, SELECT_UICOMPONENT and the ui component selected
export const selectUiComponentAction = (component: any) => ({
    type: types.SELECT_UICOMPONENT,
    component
});

// Return an action type, ADD_UICOMPONENT, use wants to add a new component to his/her repo
export const addUiComponentAction = (component : any) => ({
    type: types.ADD_UICOMPONENT,
    component
});

