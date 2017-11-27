/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { IAtomPaginated } from '../global/pagination.interface';

import { CURSOR_FRAGMENT } from '../global/pagination.fragment';
import { ATOM_FRAGMENT } from './atom.fragment';
import { Atom as AtomModel } from './atom.model';


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
 * Arguments passed to Atom filter
 */
interface IAtomFilterArgs {
    text?: string;
    atomCategoryId?: number;
}

/**
 * Arguments passed to Atom queries
 */
export interface IAtomQueryArgs {
    id?: number;
    pagination?: IAtomPaginationArgs;
    filter?: IAtomFilterArgs;
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
 * @desc Get Atoms by Category
 * @method Method atomsByCategory
 * @public
 * @param {AtomFilter} $filter - a set of filters
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms List of a specific category (Buttons, Inputs, Labels, etc.)
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


/** TODO: Remove when it is no longer necessary
 * @desc Get Atoms by an user's input text (including category filter)
 * @method Method searchAtomsLegacy
 * @public
 * @param {AtomFilter} $filter - a set of filters
 * @param {string} $limit - limit number of results returned
 * @returns {Array<Atom>} Atoms List based on a filter parameters: e.g category, user's input text
 */
export const SEARCH_ATOMS_QUERY_LEGACY = gql`
query searchAtomsLegacy ($filter: AtomFilter!, $sortBy: String, $limit: Int) {
    searchAtoms(filter: $filter, sortBy: $sortBy, limit: $limit) {
        ...AtomFragment
    }
}
${ATOM_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type SearchAtomsLegacyResponse = {
    searchAtoms: Array<AtomModel>;
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

export type SearchAtomsResponse = {
    searchAtoms: IAtomPaginated;
};