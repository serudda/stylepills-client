/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { PROJECT_CATEGORY_FRAGMENT } from './projectCategory.fragment';
import { ProjectCategory as ProjectCategoryModel } from './projectCategory.model';


/********************************/
/*            QUERIES           */
/********************************/


/**
 * @desc Get all Project's categories
 * @method Method allProjectCategories
 * @public
 * @param {Int} $limit - limit number of results returned
 * @returns {Array<ProjectCategory>} Project's categories list
 */
export const GET_ALL_ATOM_CATEGORIES_QUERY = gql`
query getAllProjectCategories {
    allProjectCategories {
        ...ProjectCategoryFragment
    }
}
${PROJECT_CATEGORY_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    allProjectCategories: Array<ProjectCategoryModel>;
};