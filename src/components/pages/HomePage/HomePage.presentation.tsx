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
interface IHomePageProps {}


/**
 * @desc Represent Home Page
 * @function HomePage
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns page view
 */
const HomePage: React.SFC<IHomePageProps> = () => {
    return(
        <div>
            <h1>Welcome to my Home Page</h1>
        </div>
    );
};

/* Export */
export default HomePage;