/********************************/
/*         DEPENDENCIES         */
/********************************/
import gql from 'graphql-tag';



/********************************/
/*          MUTATIONS           */
/********************************/
export const CREATE_PROJECT_MUTATION = gql`
    mutation createProject(
        $userId: ID!, 
        $name: String!,
        $website: String,
        $colorPalette: [CreateColorInput],
        $private: Boolean!,
        $categoryId: Int
        ) {
        createProject(
            userId: $userId, 
            name: $name,
            website: $website,
            colorPalette: $colorPalette,
            private: $private,
            categoryId: $categoryId
        ) {
          ok,
          message
        }
    }
`;