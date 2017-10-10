
/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*            QUERIES           */
/********************************/

export const UI_COMPONENT_FRAGMENT = gql`
    fragment UiComponentFragment on UiComponent {
        id
        name
        css
        scss
        html
        background
        __typename
    }
`;