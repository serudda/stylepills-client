/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

/********************************/
/*           FRAGMENT           */
/********************************/

export const SOURCE_FRAGMENT = gql`
    fragment SourceFragment on Source {
        id
        name
        filename
        code
        preprocessor {
            id
            type
            name
            extension
            compileTo
            __typename
        }
        order
        __typename
    }
`;