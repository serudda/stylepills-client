/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const ATOM_CATEGORY_FRAGMENT = gql`
    fragment AtomCategoryFragment on AtomCategory {
        id
        name
        description
        __typename
    }
`;