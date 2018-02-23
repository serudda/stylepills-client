/************************************/
/*           DEPENDENCIES           */
/************************************/

// -----------------------------------


/******************************************/
/*             CODE SUPPORTED             */
/******************************************/
export enum CodeSupportedOption {
    html = 'html',
    js = 'js',
    css = 'css',
    scss = 'scss',
    sass = 'sass',
    less = 'less',
    stylus = 'stylus'
    /* Add others preprocessors */
}


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


/******************************************/
/*           NORMALIZED RESULT            */
/******************************************/
export interface INormalizedResult {
    result: Array<string>;
    entities: any;
}