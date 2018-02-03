/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { LIB_FRAGMENT } from './lib.fragment';
import { Lib as LibModel } from './lib.model';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/**
 * Arguments passed to Lib queries
 */
export interface ILibQueryArgs {
    id?: number;
    projectId?: number | null;
}


/********************************/
/*            QUERIES           */
/********************************/

/**
 * @desc Get Libs by Project Id
 * @method Method getLibsByProjectId
 * @public
 * @param {ID} $projectId - Project id
 * @returns {Array<Lib>} Libs list
 */
export const GET_LIBS_BY_PROJECT_ID_QUERY = gql`
    query getLibsByProjectId ($projectId: ID!) {
        getLibsByProjectId(projectId: $projectId) {
            ...LibFragment
        }
    }
    ${LIB_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetByProjectIdResponse = {
    getLibsByProjectId: Array<LibModel>;
};


// --------------------------------

/* Example */
/*

GET_LIBS_BY_PROJECT_ID_QUERY
query getLibsByProjectId($projectId: ID!) {
    getLibsByProjectId(projectId: $projectId){
        id
        name
        url
        atom {
            id
            name
        }
        project {
            id
            name
        }
    }
}

Query Variables:
{
    "projectId": 6
}

*/