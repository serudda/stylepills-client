/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const PREPROCESSOR_FRAGMENT = gql`
    fragment PreprocessorFragment on Preprocessor {
        id
        type
        name
        compileTo
        __typename
    }
`;