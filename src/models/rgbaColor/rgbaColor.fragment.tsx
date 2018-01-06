/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
/********************************/

export const RGBA_COLOR_FRAGMENT = gql`
    fragment RgbaColorFragment on RgbaColor {
        id
        r
        g
        b
        a
        __typename
    }
`;