/********************************/
/*         DEPENDENCIES         */
/********************************/
import { serverConfig, IServerConfig } from './server.config';
// -----------------------------------


/***************************************/
/*            CONFIG CLASS             */
/***************************************/
class Config {
    private _env: string;
    private _serverConfig: IServerConfig;


    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {

        // Init environment (local, development or production)
        if (process.env.REACT_APP_LOCAL_ENV) {
            this._env = process.env.REACT_APP_LOCAL_ENV;
        } else {
            this._env = process.env.NODE_ENV || 'development';
        }
        
        this._serverConfig = serverConfig(this._env);
    }


    /*       METHODS       */
    /***********************/
    getEnv(): string {
        return this._env;
    }

    getServerConfig(): IServerConfig {
        return this._serverConfig;
    }
}


/* Export Config instance */
export const config = new Config();