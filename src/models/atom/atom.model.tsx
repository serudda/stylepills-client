/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';
import { Lib as LibModel } from '../lib/lib.model';
import { Comment } from '../comment/comment.model';
import { AtomCategory } from '../atomCategory/atomCategory.model';
import { Project } from './../project/project.model';


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export type Basic = {
    id: number | null;
    name: string;
};

export type SourceCode = {
    html: string,
    css: string
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
    libs: Array<LibModel>;
    comments: Array<Comment>;
    download: string;
    active: boolean;
    private: boolean;
    author: User;
    category?: AtomCategory; 
    project?: Project;
};
