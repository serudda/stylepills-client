/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as appConfig from '../constants/app.constants';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/
export interface IServerConfig {
    dataBaseUrl: string;
    authGoogleUrl: string;
}


/****************************************/
/*            SERVER CONFIG             */
/****************************************/
export function serverConfig(env: string): IServerConfig {

    switch (env) {
        case appConfig.LOCAL:
            return {
                dataBaseUrl: appConfig.LOCAL_DATA_URL,
                authGoogleUrl: appConfig.LOCAL_AUTH_GOOGLE_URL
            };
        
        case appConfig.DEV:
            return {
                dataBaseUrl: appConfig.DEV_DATA_URL,
                authGoogleUrl: appConfig.DEV_AUTH_GOOGLE_URL
            };
        
        case appConfig.PRD:
            return {
                dataBaseUrl: appConfig.PRD_DATA_URL,
                authGoogleUrl: appConfig.PRD_AUTH_GOOGLE_URL
            };

        default:
            return {
                dataBaseUrl: appConfig.LOCAL_DATA_URL,
                authGoogleUrl: appConfig.LOCAL_AUTH_GOOGLE_URL
            };
    }

}