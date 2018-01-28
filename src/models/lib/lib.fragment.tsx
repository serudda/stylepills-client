/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const LIB_FRAGMENT = gql`
    fragment LibFragment on Lib {
        id
        name
        url
        type
        __typename
    }
`;