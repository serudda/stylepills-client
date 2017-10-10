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
    query getAllThings {
        things {
            ...ThingFragment
        }
    }
    ${UI_COMPONENT_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    things: Array<ThingModel>;
};


// --------------------------------


export const GET_THING_BY_ID_QUERY = gql`
    query getThingById ($id: ID!) {
        thing(id: $id) {
            ...ThingFragment
        }
    }
    ${THING_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByIdResponse = {
    thing: ThingModel;
};