/************************************/
/*           DEPENDENCIES           */
/************************************/
import { Color as ColorModel } from './../../models/color/color.model';

// -----------------------------------


/******************************************/
/*            FORMS INTERFACES            */
/******************************************/
export interface IProjectFormFields {
    name: string;
    website: string;
    colors: Array<ColorModel>;
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