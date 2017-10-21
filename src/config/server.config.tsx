/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as appConfig from '../constants/app.constants';
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
                serverUrl: appConfig.LOCAL_SERVER_URL
            };
        
        case 'development':
            return {
                serverUrl: appConfig.DEV_SERVER_URL
            };
        
        case 'production':
            return {
                serverUrl: appConfig.PRD_SERVER_URL
            };

        default:
            return {
                serverUrl: appConfig.LOCAL_SERVER_URL
            };
    }

}