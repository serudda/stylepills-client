/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { ATOM_CATEGORY_FRAGMENT } from './atomCategory.fragment';
import { AtomCategory as AtomCategoryModel } from './atomCategory.model';


/********************************/
/*            QUERIES           */
/********************************/


/**
 * @desc Get all Atom's categories
 * @method Method allAtomCategories
 * @public
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<AtomCategory>} Atom's categories list
 */
export const GET_ALL_ATOM_CATEGORIES_QUERY = gql`
query getAllAtomCategories {
    allAtomCategories {
        ...AtomCategoryFragment
    }
}
${ATOM_CATEGORY_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    allAtomCategories: Array<AtomCategoryModel>;
};