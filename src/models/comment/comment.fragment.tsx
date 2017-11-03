/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { USER_FRAGMENT } from './../user/user.fragment';


/********************************/
/*           FRAGMENT           */
/********************************/

export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        id
        content
        commentable
        commentableId
        author {
            ...UserFragment
        }
        createdAt
        updatedAt
        __typename
    }
    ${USER_FRAGMENT}
`;