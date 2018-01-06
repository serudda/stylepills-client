/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { COLOR_FRAGMENT } from './../color/color.fragment';
import { AUTHOR_PROJECT_FRAGMENT } from './../user/user.fragment';
import { PROJECT_CATEGORY_FRAGMENT } from './../projectCategory/projectCategory.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const PROJECT_FRAGMENT = gql`
    fragment ProjectFragment on Project {
        id
        name
        website
        colorPalette {
            ...ColorFragment
        }
        private
        author {
            ...AuthorProjectFragment
        }
        category {
            ...ProjectCategoryFragment
        }
        __typename
    }
    ${COLOR_FRAGMENT}
    ${PROJECT_CATEGORY_FRAGMENT}
    ${AUTHOR_PROJECT_FRAGMENT}
`;