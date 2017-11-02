/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';
import { ATOM_FRAGMENT } from './../atom/atom.fragment';


/********************************/
/*            QUERIES           */
/********************************/

export const USER_FRAGMENT: any = gql`
    fragment UserFragment on User {
        id
        username
        firstname
        lastname
        email
        website
        avatar
        about
        ...AtomFragment
        createdAt
        updatedAt
        __typename
    }
    ${ATOM_FRAGMENT}
`;