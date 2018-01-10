/************************************/
/*           DEPENDENCIES           */
/************************************/
import { Color as ColorModel } from './../../models/color/color.model';

// -----------------------------------


/******************************************/
/*            FORMS INTERFACES            */
/******************************************/
export interface IAtomFormFields {
    authorId: number;
    name: string;
    html: string;
    css: string;
    contextualBg: string;
    projectId: number;
    atomCategoryId: number;
    private: boolean;
}

export interface IProjectFormFields {
    authorId: number;
    name: string;
    website: string;
    colorPalette: Array<ColorModel>;
    private: boolean;
    projectCategoryId: number;
}


/******************************************/
/*       REDUX SEGMENT (TRACK EVENT)      */
/******************************************/
export interface IAnalyticsTrack<eventPayload> {
    analytics: {
        eventType: string,
        eventPayload: eventPayload
    };
}

export interface IAnalyticsIdentify<eventPayload> {
    analytics: {
        eventType: string,
        eventPayload: eventPayload
    };
}