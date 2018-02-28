/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { PREPROCESSOR_FRAGMENT } from './preprocessor.fragment';
import { Preprocessor as PreprocessorModel } from './preprocessor.model';


/********************************/
/*            QUERIES           */
/********************************/


/**
 * @desc Get all Preprocessors
 * @method Method allPreprocessors
 * @public
 * @returns {Array<PreprocessorModel>} Preprocessors list
 */
export const GET_ALL_PREPROCESSORS_QUERY = gql`
query getAllPreprocessors {
    allPreprocessors {
        ...PreprocessorFragment
    }
}
${PREPROCESSOR_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetAllResponse = {
    allPreprocessors: Array<PreprocessorModel>;
};


/* Example */
/*
GET_ALL_PREPROCESSORS_QUERY
query getAllPreprocessors {
  allPreprocessors {
    id
    type
    compileTo
    __typename
  }
}
*/


// --------------------------------


/**
 * @desc Get Preprocessor by Id
 * @method Method getPreprocessorById
 * @public
 * @param {ID} $id - Preprocessor id
 * @returns {PreprocessorModel} Preprocessor instance
 */
export const GET_PREPROCESSOR_BY_ID_QUERY = gql`
    query getPreprocessorById ($id: ID!) {
        getPreprocessorById(id: $id) {
            ...PreprocessorFragment
        }
    }
    ${PREPROCESSOR_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type GetPreprocessorByIdResponse = {
    getPreprocessorById: PreprocessorModel;
};


// --------------------------------

/* Example */
/*

GET_PREPROCESSOR_BY_ID_QUERY
query getPreprocessorById($id: ID!) {
    getPreprocessorById(id: $id){
        id
        type
        name
        compileTo
    }
}

Query Variables:
{
    "id": 2
}

*/