/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';


/************************************/
/*            INTERFACES            */
/************************************/


/********************************/
/*          MUTATIONS           */
/********************************/
export const CREATE_ATOM_MUTATION = gql`
    mutation createAtom($input: CreateAtomInput!) {
        createAtom(input: $input) {
            ok
            message
        }
    }
`;

/*        TYPE         */
/***********************/

export type CreateAtomInput = {
    authorId: number;
    name: string;
    description?: string;
    css: string;
    html: string;
    contextualBg: string;
    private: boolean;
    atomCategoryId: number;
    projectId: number;
};


// --------------------------------

// TODO: Refactor para que reciba un input, e implementar la misma forma de uso que en Create
export const DUPLICATE_ATOM_MUTATION = gql`
    mutation duplicateAtom($atomId: ID!, $userId: ID!, $atomCode: [AtomCodeProps]) {
        duplicateAtom(atomId: $atomId, userId: $userId, atomCode: $atomCode) {
          ok,
          message
        }
    }
`;


// --------------------------------




/*

CREATE_ATOM_MUTATION
mutation createAtom($input: CreateAtomInput!) {
    createAtom(input: $input){
        ok
        message
    }
}

Query Variables:
{
    "input": {
        "authorId": 2,
        "name": "Primary Button TEST",
        "description": "Explaining the component behavior",
        "html": "<button class='btn btn-primary'>DONE</button>",
      	"css": "// My css TEST",
          "private": false,
      	"contextualBg": "#CCCCCC",
      	"atomCategoryId": 1,
        "projectId": 22
    }
}

*/