/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';

// TODO: Analizar el por que esta fallando aqui
// import { BASIC_ATOM_FRAGMENT } from './../atom/atom.fragment';
// import { BASIC_PROJECT_FRAGMENT } from './../project/project.fragment';

/********************************/
/*           FRAGMENT           */
/********************************/

export const LIB_FRAGMENT = gql`
    fragment LibFragment on Lib {
        id
        name
        url
        type
        atom {
            id
            name
        }
        project {
            id
            name
        }
        __typename
    }
`;