/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';
import { Atom } from '../atom/atom.model';


/************************************/
/*            INTERFACE             */
/************************************/

export type User = {
    id: number | null;
    username: string;
    firstname: string;
    lastname: string;
    email: string; 
    password: string;
    website: string;
    avatar: string;
    about: string;
    active: boolean;
    atoms: Array<Atom>;
};