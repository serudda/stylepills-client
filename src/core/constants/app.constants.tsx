/**
 * @desc App constants: Keep centralize every global app constant here 
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */

/* Environments */
export const LOCAL = 'local';
export const DEV = 'development';
export const PRD = 'production';

/* Base Endpoints */
export const DATA = '/graphql';
export const AUTH_GOOGLE = '/auth/google';
export const AUTH_LOGOUT = '/auth/logout';

/* Server Urls */
export const LOCAL_SERVER_URL = 'http://localhost:4000';
export const DEV_SERVER_URL = 'https://stylepills-server-dev.herokuapp.com';
export const PRD_SERVER_URL = 'https://stylepills-server.herokuapp.com';

/* Data Base Endpoints */
export const LOCAL_DATA_URL = `${LOCAL_SERVER_URL}${DATA}`;
export const DEV_DATA_URL = `${DEV_SERVER_URL}${DATA}`;
export const PRD_DATA_URL = `${PRD_SERVER_URL}${DATA}`;

/* Google Auth Base Endpoints */
export const LOCAL_AUTH_GOOGLE_URL = `${LOCAL_SERVER_URL}${AUTH_GOOGLE}`;
export const DEV_AUTH_GOOGLE_URL = `${DEV_SERVER_URL}${AUTH_GOOGLE}`;
export const PRD_AUTH_GOOGLE_URL = `${PRD_SERVER_URL}${AUTH_GOOGLE}`;

/* Auth Logout Base Endpoints */
export const LOCAL_AUTH_LOGOUT_URL = `${LOCAL_SERVER_URL}${AUTH_LOGOUT}`;
export const DEV_AUTH_LOGOUT_URL = `${DEV_SERVER_URL}${AUTH_LOGOUT}`;
export const PRD_AUTH_LOGOUT_URL = `${PRD_SERVER_URL}${AUTH_LOGOUT}`;

/* Search params */
export const ATOM_SEARCH_LIMIT = 9;
export const ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
export const ATOM_SEARCH_ORDER = 'DESC';

/* Modal Types */
export const ATOM_DETAILS_MODAL_TYPE = 'AtomDetailsModal';
export const DUPLICATE_MODAL_TYPE = 'DuplicateModal';

/* Source Code Tabs (Atom Details) */
export const ATOM_DETAILS_DEFAULT_OPTION_TAB = 'html';