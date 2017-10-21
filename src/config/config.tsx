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
        if (process.env.REACT_APP_ENV === 'local') {
            this._env = process.env.REACT_APP_ENV;
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