/**
 * @desc App constants: Keep centralize every global app constant here 
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */

/* Environments */
export const LOCAL = 'local';
export const DEV = 'development';
export const PRD = 'production';

/* Server Urls */
export const LOCAL_SERVER_URL = 'http://localhost:4000/graphql';
export const DEV_SERVER_URL = 'https://stylepills-server-dev.herokuapp.com/graphql';
export const PRD_SERVER_URL = 'https://stylepills-server.herokuapp.com/graphql';

/* Search params */
export const ATOM_SEARCH_LIMIT = 6;
export const ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
export const ATOM_SEARCH_ORDER = 'DESC';
