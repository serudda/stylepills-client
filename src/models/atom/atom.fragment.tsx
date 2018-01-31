/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { AUTHOR_ATOM_FRAGMENT } from './../user/user.fragment';
import { LIB_FRAGMENT } from './../lib/lib.fragment';
import { COMMENT_FRAGMENT } from './../comment/comment.fragment';
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
        comments {
            ...CommentFragment
        }
        download
        private
        author {
            ...AuthorAtomFragment
        }
        category {
            ...AtomCategoryFragment
        }
        __typename
    }
    ${BASIC_ATOM_FRAGMENT}
    ${LIB_FRAGMENT}
    ${COMMENT_FRAGMENT}
    ${ATOM_CATEGORY_FRAGMENT}
    ${AUTHOR_ATOM_FRAGMENT}
`;