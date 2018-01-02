/************************************/
/*           DEPENDENCIES           */
/************************************/


// -----------------------------------


/******************************************/
/*            FORMS INTERFACES            */
/******************************************/
export interface IProjectFormFields {
    name: string;
    website: string;
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