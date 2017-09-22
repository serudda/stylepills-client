/* TODO: Analizar que se va a hacer con esta section: Va a cambiar? 
    La vamos a mantener, rediseñar, etc. En el momento que se tome la
    decision, se debe reestructurar este componente.
*/

/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
interface INotFoundPageProps {}


/**
 * @desc Represent 404 Error Page
 * @function NotFoundPage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const NotFoundPage: React.SFC<INotFoundPageProps> = () => {
    return(
        <div>
            <h1>Page 404</h1>
        </div>
    );
};

/* Export */
export default NotFoundPage;