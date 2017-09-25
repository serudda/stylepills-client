import { UiComponent } from '../uiComponent/uiComponent.model';
import { Social } from '../social/social.models';

/************************************************/
/*                 USER MODELS                  */
/************************************************/

/**
 * @desc Specifies the User type (model) to identify
 * its properties, methods, etc.
 * @type User
 */

export type User = {
    id: number | null;
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
    about: string;
    email: string;
    website: string;
    social: Social;
    uiComponents: Array<UiComponent>;
};

