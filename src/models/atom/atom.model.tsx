/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';
import { Comment } from '../comment/comment.model';
import { AtomCategory } from '../atomCategory/atomCategory.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export type Basic = {
    id: number | null;
    name: string;
};

export type Atom = {
    id: number | null;
    name: string;
    description: string;
    html: string;
    css: string;
    contextualBg: string;
    stores: number;
    views: number;
    likes: number;
    duplicated: boolean;
    comments: Array<Comment>;
    download: string;
    active: boolean;
    private: boolean;
    author: User;
    category: AtomCategory; 
};
