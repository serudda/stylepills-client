/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { USER_FRAGMENT } from './user.fragment';
import { User as UserModel } from './user.model';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/**
 * Arguments passed to Atom queries
 */
export interface IUserQueryArgs {
    id?: number;
}


/********************************/
/*            QUERIES           */
/********************************/

/**
 * @desc Get User by Id
 * @method Method userById
 * @public
 * @param {ID} $id - User id
 * @returns {User} User entity
 */
export const GET_USER_BY_ID_QUERY = gql`
    query getUserById ($id: ID!) {
        userById(id: $id) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByIdResponse = {
    userById: UserModel;
};


/**
 * @desc Get User by Username
 * @method Method userByUsername
 * @public
 * @param {string} $username - User's username
 * @returns {User} User entity
 */
export const GET_USER_BY_USERNAME_QUERY = gql`
    query getUserByUsername ($username: String!) {
        userByUsername(username: $username) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByUsernameResponse = {
    userByUsername: UserModel;
};
