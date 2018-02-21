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