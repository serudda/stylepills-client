/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';



/********************************/
/*          MUTATIONS           */
/********************************/
export const DUPLICATE_ATOM_MUTATION = gql`
    mutation duplicateAtom($atomId: ID!, $userId: ID!) {
        duplicateAtom(atomId: $atomId, userId: $userId) {
          ok,
          message
        }
    }
`;