/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { UI_COMPONENT_FRAGMENT } from './uiComponent.fragment';
import { UiComponent as UiComponentModel } from './uiComponent.model';



/********************************/
/*            QUERIES           */
/********************************/

export const GET_ALL_UI_COMPONENTS_QUERY = gql`
    query getAllUiComponents {
        uiComponents {
            ...UiComponentFragment
        }
    }
    ${UI_COMPONENT_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    uiComponents: Array<UiComponentModel>;
};


// --------------------------------


export const GET_UI_COMPONENT_BY_ID_QUERY = gql`
    query getUiComponentById ($id: ID!) {
        uiComponent(id: $id) {
            ...UiComponentFragment
        }
    }
    ${UI_COMPONENT_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByIdResponse = {
    uiComponent: UiComponentModel;
};