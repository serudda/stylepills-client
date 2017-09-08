import * as types from '../../constants/action.types';

// Return an action type, GET_UICOMPONENT and the ui components list
export const getUiComponentAction = () => {
    console.log('(1.7) Launch GET_UICOMPONENT action on *getUiComponentAction* on actions/uiComponentActions.tsx');
    return {
        type: types.GET_UICOMPONENT
    }
};

// Return an action type, GET_UICOMPONENT_FULFILLED and the ui components list
export const getUiComponentSuccessAction = ({payload}:any) => {
    console.log('(1.12) Launch yield: put - GET_UICOMPONENT_FULFILLED on sagas/uiComponentSaga.tsx');
    return {
        type: types.GET_UICOMPONENT_FULFILLED,
        payload
    }
};

// Return an action type, GET_UICOMPONENT_ERROR and the error message
export const getUiComponentErrorAction = ({payload}:any) => ({
    type: types.GET_UICOMPONENT_ERROR,
    payload
});

