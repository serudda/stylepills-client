/************************************/
/*           DEPENDENCIES           */
/************************************/
import { User } from '../user/user.model';
import { Color as ColorModel } from '../color/color.model';
import { Lib as LibModel } from '../lib/lib.model';
import { Source as SourceModel } from '../source/source.model';
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
    id: number | null,
    name: string,
    description: string,
    website: string,
    colorPalette: Array<ColorModel>,
    libs: Array<LibModel>,
    sources: Array<SourceModel>,
    atoms: Array<Atom>,
    active: boolean,
    private: boolean,
    author: User,
    category: ProjectCategory
};