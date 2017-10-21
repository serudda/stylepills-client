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
        case appConfig.LOCAL:
            return {
                serverUrl: appConfig.LOCAL_SERVER_URL
            };
        
        case appConfig.DEV:
            return {
                serverUrl: appConfig.DEV_SERVER_URL
            };
        
        case appConfig.PRD:
            return {
                serverUrl: appConfig.PRD_SERVER_URL
            };

        default:
            return {
                serverUrl: appConfig.LOCAL_SERVER_URL
            };
    }

}