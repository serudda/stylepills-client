/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { IAtomPaginated } from '../global/pagination.interface';

import { CURSOR_FRAGMENT } from '../global/pagination.fragment';
import { ATOM_FRAGMENT, BASIC_ATOM_FRAGMENT } from './atom.fragment';
import { Atom as AtomModel, Basic } from './atom.model';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/**
 * Arguments passed to Atom pagination (Next Page)
 */
export interface IAtomPaginationArgs {
    first: number;
    after: string;
    last: number;
    before: string;
}

/**
 * Arguments passed to Atom include model
 */
interface IAtomIncludeArgs {
    model: string;
    as: string | null;
    where: any;
}

/**
 * Arguments passed to Atom type
 */
export interface IAtomTypeArgs {
    isDuplicated: boolean | null;
    isPrivate: boolean | null;
}

/**
 * Arguments passed to Atom filter
 */
interface IAtomFilterArgs {
    text?: string;
    atomCategoryId?: number;
    projectId?: number;
    type?: IAtomTypeArgs;
}

/**
 * Arguments passed to Atom queries
 */
export interface IAtomQueryArgs {
    id?: number;
    pagination?: IAtomPaginationArgs;
    filter?: IAtomFilterArgs;
    include?: IAtomIncludeArgs;
    sortBy: string;
}


/********************************/
/*            QUERIES           */
/********************************/

/**
 * @desc Get Atom by Id
 * @method Method atomById
 * @public
 * @param {ID} $id - Atom id
 * @returns {Atom} Atom entity
 */
export const GET_ATOM_BY_ID_QUERY = gql`
    query getAtomById ($id: ID!) {
        atomById(id: $id) {
            ...AtomFragment
        }
    }
    ${ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByIdResponse = {
    atomById: AtomModel;
};


/* Example */
/*
GET_ATOM_BY_ID_QUERY
query getAtomById($id: ID!) {
    atomById(id: $id){
        id
        name
        contextualBg
        html
        css
        project {
            id
            name
            libs {
                id
                name
            }
        }
        libs {
            id
            name
            url
        }
        author
    }
}

Query Variables:
{
    "id": 127
}
*/


// --------------------------------


/**
 * @desc Get all Atoms
 * @method Method allAtoms
 * @public
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms list
 */
export const GET_ALL_ATOM_QUERY = gql`
query getAllAtoms ($limit: Int!){
    allAtoms(limit: $limit) {
        ...AtomFragment
    }
}
${ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    allAtoms: Array<AtomModel>;
};


// --------------------------------


/**
 * @desc Get Atoms by Project Id
 * @method Method atomsByProjectId
 * @public
 * @param {AtomFilter} $filter - a set of filters
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms List of a specific project (Buttons, Inputs, Labels, etc.)
 */
export const GET_ATOMS_BY_PROJECT_ID_QUERY = gql`
query getAtomsByProjectId ($filter: AtomFilter!, $limit: Int) {
    atomsByProjectId(filter: $filter, limit: $limit) {
        ...AtomFragment
    }
}
${ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByProjectIdResponse = {
    atomsByProjectId: Array<AtomModel>;
};


// --------------------------------


/**
 * @desc Get Atoms by Category
 * @method Method atomsByCategory
 * @public
 * @param {AtomFilter} $filter - a set of filters
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms List of a specific category (Buttons, Inputs, Labels, etc.)
 * TODO: Remover si no se esta usando
 */
export const GET_ATOMS_BY_CATEGORY_QUERY = gql`
query getAtomsByCategory ($filter: AtomFilter!, $limit: Int) {
    atomsByCategory(filter: $filter, limit: $limit) {
        ...AtomFragment
    }
}
${ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByCategoryResponse = {
    atomsByCategory: Array<AtomModel>;
};


// --------------------------------


/**
 * @desc Get Atoms by an user's input text (including category filter and pagination)
 * @method Method searchAtoms
 * @public
 * @param {AtomFilter} $filter - a set of filters
 * @param {string} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms List based on a filter parameters: e.g category, user's input text
 */
export const SEARCH_ATOMS_QUERY = gql`
query searchAtoms ($pagination: PaginationInput!, $filter: AtomFilter!, $include: AtomInclude, $sortBy: String) {
    searchAtoms(pagination: $pagination, filter: $filter, include: $include, sortBy: $sortBy) {
        results {
            ...AtomFragment
        },
        cursors{
            ...CursorFragment
        }
    }
}
${ATOM_FRAGMENT}
${CURSOR_FRAGMENT}
`;

/*        TYPE         */
/***********************/
export type SearchAtomQueryOptions = {
    variables: IAtomQueryArgs
};

export type SearchAtomsResponse = {
    searchAtoms: IAtomPaginated;
};


// --------------------------------


/**
 * @desc Get Atoms by User Id (Basic Info)
 * @method Method basicAtomsByUserId
 * @public
 * @returns {Array<Atom>} Atoms List of a specific user
 */
export const GET_BASIC_ATOMS_BY_USER_ID_QUERY = gql`
query getBasicAtomsByUserId ($userId: ID!) {
    basicAtomsByUserId(userId: $userId) {
        ...BasicAtomFragment
    }
}
${BASIC_ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetBasicAtomsByUserIdResponse = {
    basicAtomsByUserId: Array<Basic>;
};