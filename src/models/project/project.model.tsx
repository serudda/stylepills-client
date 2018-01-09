/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';
import { Color } from '../color/color.model';
import { Atom } from '../atom/atom.model';
import { ProjectCategory } from '../projectCategory/projectCategory.model';

/************************************/
/*         TYPE & INTERFACES        */
/************************************/

export type Basic = {
    id: number | null;
    name: string;
};

export type Project = {
    id: number | null;
    name: string;
    website: string;
    colorPalette: Array<Color>;
    atoms: Array<Atom>;
    active: boolean;
    private: boolean;
    author: User;
    category: ProjectCategory;
};