/************************************/
/*           DEPENDENCIES           */
/************************************/

// -----------------------------------


/******************************************/
/*           UI LIST INTERFACE            */
/******************************************/
export type ListProps = {
    tempId?: string;
};

/******************************************/
/*        STATUS RESPONSE INTERFACE       */
/******************************************/
export interface IStatus<I> {
    id?: number;
    ok: boolean;
    message?: string;
    validationErrors?: I;
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
