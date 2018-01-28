/************************************/
/*           DEPENDENCIES           */
/************************************/


/************************************/
/*         TYPE & INTERFACES        */
/************************************/

/* Possible lib type options */
export enum LibTypeOptions {
    css = 'css',
    javascript = 'javascript'
}

export type Lib = {
    id?: number | null;
    name: string;
    url: string;
    type: LibTypeOptions;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};