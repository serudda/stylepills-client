/************************************/
/*           DEPENDENCIES           */
/************************************/

// -----------------------------------


/******************************************/
/*        STATUS RESPONSE INTERFACE      */
/******************************************/
export interface IStatus {
    ok: boolean;
    message?: string;
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
