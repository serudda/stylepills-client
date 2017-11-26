/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/********************************/
/*           FRAGMENT           */
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
        __typename
    }
`;


export const AUTHOR_ATOM_FRAGMENT: any = gql`
fragment AuthorAtomFragment on User {
    id
    username
    firstname
    lastname
    avatar
    __typename
}
`;