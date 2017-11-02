/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export type Comment = {
    id: number | null;
    content: string;
    commentable: string;
    commentableId: number;
    active: boolean;
    author: User;
    createdAt: string;
    updatedAt: string;
};