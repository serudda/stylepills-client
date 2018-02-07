/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { AUTHOR_ATOM_FRAGMENT } from './../user/user.fragment';
import { LIB_FRAGMENT } from './../lib/lib.fragment';
import { PROJECT_BY_ATOM_FRAGMENT } from './../project/project.fragment';
import { ATOM_CATEGORY_FRAGMENT } from './../atomCategory/atomCategory.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const VALIDATION_ATOM_FRAGMENT = gql`
    fragment ValidationAtomErrorsFragment on ValidationAtomError {
        authorId
        name
        html
        css
        contextualBg
        projectId
        atomCategoryId
        private
        __typename
    }
`;

export const BASIC_ATOM_FRAGMENT = gql`
    fragment BasicAtomFragment on Atom {
        id
        name
        __typename
    }
`;

export const ATOM_FRAGMENT = gql`
    fragment AtomFragment on Atom {
        ...BasicAtomFragment
        description
        html
        css
        contextualBg
        stores
        views
        likes
        duplicated
        libs {
            ...LibFragment
        }
        download
        private
        author {
            ...AuthorAtomFragment
        }
        category {
            ...AtomCategoryFragment
        }
        project {
            ...ProjectByAtomFragment
        }
        __typename
    }
    ${BASIC_ATOM_FRAGMENT}
    ${LIB_FRAGMENT}
    ${AUTHOR_ATOM_FRAGMENT}
    ${ATOM_CATEGORY_FRAGMENT}
    ${PROJECT_BY_ATOM_FRAGMENT}
`;