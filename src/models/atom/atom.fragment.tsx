/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';
import { COMMENT_FRAGMENT } from './../comment/comment.fragment';
import { USER_FRAGMENT } from './../user/user.fragment';
import { ATOM_CATEGORY_FRAGMENT } from './../atomCategory/atomCategory.fragment';


/********************************/
/*            QUERIES           */
/********************************/

export const ATOM_FRAGMENT = gql`
    fragment AtomFragment on Atom {
        id
        name
        html
        css
        contextualBg
        stores
        views
        likes
        ...CommentFragment
        download
        private
        ...UserFragment
        ...AtomCategoryFragment
        createdAt
        updatedAt
        __typename
    }
    ${COMMENT_FRAGMENT}
    ${USER_FRAGMENT}
    ${ATOM_CATEGORY_FRAGMENT}
`;