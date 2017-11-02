/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*            QUERIES           */
/********************************/

export const ATOM_CATEGORY_FRAGMENT = gql`
    fragment AtomCategoryFragment on AtomCategory {
        id
        name
        description
        createdAt
        updatedAt
        __typename
    }
`;