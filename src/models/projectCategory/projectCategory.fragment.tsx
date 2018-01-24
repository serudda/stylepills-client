/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const PROJECT_CATEGORY_FRAGMENT = gql`
    fragment ProjectCategoryFragment on ProjectCategory {
        id
        name
        description
        __typename
    }
`;