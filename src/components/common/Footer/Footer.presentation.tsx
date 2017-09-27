/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


/************************************/
/*            INTERFACES            */
/************************************/
interface IFooterProps {}


/***********************************************************************/
/*           STATELESS FUNCTIONAL COMPONENT (SFC) DEFINITION           */
/***********************************************************************/
const Footer: React.SFC<IFooterProps> = () => (

    <footer id="footer" className="Footer text-center fontSmoothing-reset sp-bg-darkSnow">
        <hr className="w-25 borderColor-extraDarkSmoke mt-5 mb-4"/>
        <p className="fontFamily-courierNew fontSize-md mb-5">
            Made with love and coffee in <a href="https://www.google.com/maps/place/Portland,OR" target="_blank" className="color-secondary">Portland</a>, OR.
        </p>
    </footer>
    
);

/* Export */
export default Footer;