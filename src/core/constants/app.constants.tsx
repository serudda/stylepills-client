/**
 * @desc App constants: Keep centralize every global app constant here 
 * (e.g. server urls, domain, google Map Key, accessKeyIdS3, etc.)
 * @type constants
 */
import { RgbaColor as RgbaColorModel } from './../../models/rgbaColor/rgbaColor.model';

import { 
    Option as CodeTabMenuOption 
} from './../../app/components/Tabs/CodeTabMenu/CodeTabMenu';

/* DEBUG */
export const DEBUG = !!process.env.REACT_APP_LOCAL_ENV;

/* Environments */
export const LOCAL      = 'local';
export const DEV        = 'development';
export const STAGING    = 'staging';
export const PRD        = 'production';

/* Base Endpoints */
export const DATA           = '/graphql';
export const AUTH_GOOGLE    = '/auth/google';
export const AUTH_LOGOUT    = '/auth/logout';

/* Server Urls */
export const LOCAL_SERVER_URL   = 'http://localhost:4000';
export const DEV_SERVER_URL     = 'https://stylepills-server-dev.herokuapp.com';
export const STAGING_SERVER_URL = 'https://stylepill-server-staging.herokuapp.com';
export const PRD_SERVER_URL     = 'https://stylepills-server.herokuapp.com';

/* Data Base Endpoints */
export const LOCAL_DATA_URL     = `${LOCAL_SERVER_URL}${DATA}`;
export const DEV_DATA_URL       = `${DEV_SERVER_URL}${DATA}`;
export const STAGING_DATA_URL   = `${STAGING_SERVER_URL}${DATA}`;
export const PRD_DATA_URL       = `${PRD_SERVER_URL}${DATA}`;

/* Google Auth Base Endpoints */
export const LOCAL_AUTH_GOOGLE_URL      = `${LOCAL_SERVER_URL}${AUTH_GOOGLE}`;
export const DEV_AUTH_GOOGLE_URL        = `${DEV_SERVER_URL}${AUTH_GOOGLE}`;
export const STAGING_AUTH_GOOGLE_URL    = `${STAGING_SERVER_URL}${AUTH_GOOGLE}`;
export const PRD_AUTH_GOOGLE_URL        = `${PRD_SERVER_URL}${AUTH_GOOGLE}`;

/* Auth Logout Base Endpoints */
export const LOCAL_AUTH_LOGOUT_URL      = `${LOCAL_SERVER_URL}${AUTH_LOGOUT}`;
export const DEV_AUTH_LOGOUT_URL        = `${DEV_SERVER_URL}${AUTH_LOGOUT}`;
export const STAGING_AUTH_LOGOUT_URL    = `${STAGING_SERVER_URL}${AUTH_LOGOUT}`;
export const PRD_AUTH_LOGOUT_URL        = `${PRD_SERVER_URL}${AUTH_LOGOUT}`;

/* Search params */
export const ATOM_SEARCH_LIMIT = 9;
export const ATOM_SEARCH_ORDER_BY_DEFAULT = 'likes';
export type ATOM_SEARCH_ORDER_BY_DEFAULT = typeof ATOM_SEARCH_ORDER_BY_DEFAULT;
export const ATOM_SEARCH_TYPE_DEFAULT = 'all';
export type ATOM_SEARCH_TYPE_DEFAULT = typeof ATOM_SEARCH_TYPE_DEFAULT;
export const ATOM_SEARCH_ORDER = 'DESC';

/* Source Code Tabs (Atom Details) */
export const ATOM_DETAILS_DEFAULT_OPTION_TAB = CodeTabMenuOption.html;

/* Libs Tabs */
export const LIBS_DEFAULT_OPTION_TAB = CodeTabMenuOption.css;

/* WHITE COLOR */
export const WHITE_COLOR_HEX = '#FFFFFF';
export const WHITE_COLOR_RGBA: RgbaColorModel = {
    r: 255,
    g: 255,
    b: 255,
    a: 1
};

/* PRIMARY COLOR */
export const PRIMARY_COLOR_HEX = '#FEEB6A';
export const PRIMARY_COLOR_RGBA: RgbaColorModel = {
    r: 254,
    g: 235,
    b: 106,
    a: 1
};

/* SECONDARY COLOR */
export const SECONDARY_COLOR_HEX = '#33ADA9';
export const SECONDARY_COLOR_RGBA: RgbaColorModel = {
    r: 51,
    g: 173,
    b: 169,
    a: 1
};