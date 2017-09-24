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
        <div className="HomePage">
            {/* Logo and Burguer Icon */}
            <div className="jumbotron jumbotron--texture bg-slate">
                <div className="container position-relative">
                    <h1 className="color-white margin-0 marginBottom-3">
                        Build your UI components
                    </h1>
                    <p className="color-extraDarkSmoke fontSize-xxl">
                        Get beautiful open source UI components weekly, Join Stylepill weekly list! We'll send a new beautiful set of 3 components weekly to your email.
                    </p>
                </div>
            </div>
        </div>
    );
};

/* Export */
export default HomePage;