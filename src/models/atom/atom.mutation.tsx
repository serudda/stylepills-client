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


/*          CREATE           */
/*===========================*/

export const CREATE_ATOM_MUTATION = gql`
    mutation createAtom($input: CreateAtomInput!) {
        createAtom(input: $input) {
            id
            ok
            message
        }
    }
`;

/* Type */
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

/* Example */
/*
CREATE_ATOM_MUTATION
mutation createAtom($input: CreateAtomInput!) {
    createAtom(input: $input){
        id
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

// --------------------------------


/*         DUPLICATE         */
/*===========================*/

export const DUPLICATE_ATOM_MUTATION = gql`
    mutation duplicateAtom($input: DuplicateAtomInput!) {
        duplicateAtom(input: $input) {
            id,
            ok,
            message
        }
    }
`;

/* Type */
type CodeProps = {
    code: string;
    libs?: Array<string>;
};

type AtomCode = {
    codeType: string;
    codeProps: CodeProps;
};

export type DuplicateAtomInput = {
    atomId: number;
    userId: number;
    atomCode: Array<AtomCode> | null;
};

/* Example */
/*
DUPLICATE_ATOM_MUTATION
mutation duplicateAtom($input: DuplicateAtomInput!); {
    duplicateAtom(input: $input){
        id
        ok
        message
    }
}

Query Variables:
{
    'input': {
        'atomId': 3,
        'userId';: 2,
        'atomCode';: [
            {
                'codeType': 'html',
                'codeProps': {
                    'code': '<button class=\'btn btn-primary\'>DONIN</button>'
                }
            }
        ];
    }
}
*/

// --------------------------------