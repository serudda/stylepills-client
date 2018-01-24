/************************************/
/*           DEPENDENCIES           */
/************************************/
import axios from 'axios';

// -----------------------------------


/************************************/
/*            INTERFACES            */
/************************************/

export interface IJwtDecoded {
    user: {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        avatar: string;
    };
    token: string;
}

export interface IAuth {
    setAuthorizationToken: (token: string | boolean) => void;
}


/************************************/
/*            FUNCTIONS             */
/************************************/


/**
 * @desc Set Authorization Token on request header
 * @function setAuthorizationToken
 * @param {string} token - Access Token
 * @returns {void}
 */
export function setAuthorizationToken(token: string | boolean): void {
    if (token) {
        /* TODO: Este ejemplo lo adjunta en la cabeza de las llamadas por axios 
        leer los articulos que he recopilado sobre proteger los llamados GraphQL */
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
}