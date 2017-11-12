/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const CURSOR_FRAGMENT = gql`
    fragment CursorFragment on Cursor {
        hasNext
        hasPrevious
        before
        after
        __typename
    }
`;