/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { COLOR_FRAGMENT } from './../color/color.fragment';
import { LIB_FRAGMENT } from './../lib/lib.fragment';
import { AUTHOR_PROJECT_FRAGMENT } from './../user/user.fragment';
import { PROJECT_CATEGORY_FRAGMENT } from './../projectCategory/projectCategory.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const VALIDATION_PROJECT_FRAGMENT = gql`
    fragment ValidationProjectErrorsFragment on ValidationProjectError {
        authorId
        name
        website
        colorPalette
        projectCategoryId
        private
        __typename
    }
`;

export const BASIC_PROJECT_FRAGMENT = gql`
    fragment BasicProjectFragment on Project {
        id
        name
        __typename
    }
`;

export const BASIC_PROJECT_AND_AUTHOR_FRAGMENT = gql`
    fragment BasicProjectAndAuthorFragment on Project {
        id
        name
        logoUrl
        author {
            ...AuthorProjectFragment
        }
        __typename
    }
    ${AUTHOR_PROJECT_FRAGMENT}
`;

export const PROJECT_BY_ATOM_FRAGMENT = gql`
    fragment ProjectByAtomFragment on Project {
        ...BasicProjectFragment
        colorPalette {
            ...ColorFragment
        }
        libs {
            ...LibFragment
        }
        __typename
    }
    ${BASIC_PROJECT_FRAGMENT}
    ${COLOR_FRAGMENT}
    ${LIB_FRAGMENT}
`;

export const PROJECT_FRAGMENT = gql`
    fragment ProjectFragment on Project {
        ...BasicProjectFragment
        website
        description
        logoUrl
        colorPalette {
            ...ColorFragment
        }
        libs {
            ...LibFragment
        }
        private
        status
        author {
            ...AuthorProjectFragment
        }
        category {
            ...ProjectCategoryFragment
        }
        __typename
    }
    ${BASIC_PROJECT_FRAGMENT}
    ${COLOR_FRAGMENT}
    ${LIB_FRAGMENT}
    ${AUTHOR_PROJECT_FRAGMENT}
    ${PROJECT_CATEGORY_FRAGMENT}
`;