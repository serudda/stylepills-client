/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

import { ProjectFormFields } from './../../core/validations/project';

import { VALIDATION_PROJECT_FRAGMENT } from './project.fragment';


/************************************/
/*            INTERFACES            */
/************************************/


/********************************/
/*          MUTATIONS           */
/********************************/
export const CREATE_PROJECT_MUTATION = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            id
            ok
            message
            validationErrors {
                ...ValidationProjectErrorsFragment
            }
        }
    }
    ${VALIDATION_PROJECT_FRAGMENT}
`;

/*        TYPE         */
/***********************/

export type CreateProjectInput = ProjectFormFields;


// --------------------------------


/*

CREATE_PROJECT_MUTATION
mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input){
        id
        ok
        message
        validationErrors
    }
}

Query Variables:
{
    "input": {
        "authorId": 2,
        "name": "Airbnb 50",
        "website": "https://www.airbnb.com",
        "description": "Explaining the component behavior",
        "libs": [
            {
                "name": "Boostrap 4",
                "type": "css",
                "url": "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            }
        ],
        "colorPalette":[
            { 
                "name": "light primary 50",
                "type": "primary",
                "hex": "#CCCCCC",
                "rgba": {
                    "r": 255,
                    "g": 254,
                    "b": 253,
                    "a": 1
                }
            },
            { 
                "name": "secondary 50",
                "type": "secondary",
                "hex": "#000000",
                "rgba": {
                    "r": 243,
                    "g": 242,
                    "b": 241,
                    "a": 1
                }
            }
        ],
        "private": true,
        "projectCategoryId": 1
    }
}

*/