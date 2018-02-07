/************************************/
/*           DEPENDENCIES           */
/************************************/
import { client } from './../index';

import { 
    GET_LIBS_BY_PROJECT_ID_QUERY
} from './../models/lib/lib.query';


/************************************/
/*            INTERFACES            */
/************************************/



/************************************/
/*             ACTIONS              */
/************************************/


/**
 * @desc Get Libs by Project Id Action
 * @function getLibsByProjectIdAction
 * @param {number} projectId - project id
 * @returns {Promise<any>}
 */
export const getLibsByProjectIdAction = (projectId: number) => {
    return (dispatch: Function): Promise<any> => {

        return client.query({
            query: GET_LIBS_BY_PROJECT_ID_QUERY,
            variables: { projectId }
        }).then(
            (response: any) => {
                let { error, getLibsByProjectId } = response.data;
        
                if (error) {
                    return {
                        ok: false,
                        message: 'Something wrong'
                    };
                }

                return {
                    ok: true,
                    results: getLibsByProjectId
                };
            }
        ).catch(
            (response) => {
                console.log('getLibsByProjectIdAction error: ', response);
                return {
                    ok: false,
                    message: response
                };
            }
        );

    };

};