/********************************/
/*         DEPENDENCIES         */
/********************************/
import * from '../constants/app.values';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/
export interface IServerConfig {
    serverUrl: string;
}


/****************************************/
/*            SERVER CONFIG             */
/****************************************/
export function serverConfig(env: string): IServerConfig {

    switch (env) {
        case 'local':
            return {
                serverUrl: 'http://localhost:4000/graphql'
            };
        
        case 'development':
            return {
                serverUrl: 'https://stylepills-server-dev.herokuapp.com/graphql'
            };
        
        case 'production':
            return {
                serverUrl: 'https://stylepills-server.herokuapp.com/graphql'
            };

        default:
            return {
                serverUrl: 'http://localhost:4000/graphql'
            };
    }

}