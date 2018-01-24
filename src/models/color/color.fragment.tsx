/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { RGBA_COLOR_FRAGMENT } from './../rgbaColor/rgbaColor.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const COLOR_FRAGMENT = gql`
    fragment ColorFragment on Color {
        id
        name
        hex
        rgba {
            ...RgbaColorFragment
        }
        type
        __typename
    }
    ${RGBA_COLOR_FRAGMENT}
`;