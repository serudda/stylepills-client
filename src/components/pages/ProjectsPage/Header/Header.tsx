/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import NavbarOptions from './../../../common/NavbarOptions/NavbarOptions.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type HeaderProps = {
    projectName: string;
    isPrivate: boolean;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Header 
extends React.Component<ChildProps<HeaderProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<HeaderProps & StateProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/
        const {
            projectName,
            isPrivate
        } = this.props; 
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <header className="Header">

                <div className="width-wrapper">

                    {/* Navbar */}
                    <div className="navbar navbar-light navbar-expand-lg borderColor-smoke borderBottomStyle-dashed borderBottom-1 mb-3 px-2 py-3 justify-content-between">

                        {/* Navbar options */}
                        <NavbarOptions />

                    </div>

                    {/* Filter section */}
                    <div className="FilterSection row align-items-center">

                        <div className="d-flex col-12 my-3 align-items-center pl-4">
                            
                            {/* Logo */}
                            <div className="sp-avatar sp-avatar--md borderRadius-circle mr-4">
                                <img width="70" height="70" src="https://s3.amazonaws.com/waysily-img/stylepill/projectLogo.svg" alt={projectName} />
                            </div>

                            {/* Title */}
                            <h1 className="m-0 color-slate fontSize-xxxl fontWeight-6">
                                {projectName}
                            </h1>
                            {isPrivate ? 
                                <span className="sp-tag sp-tag--primary sp-tag--xs fontWeight-7 fontSmoothing-reset ml-3">
                                    Private
                                </span>
                                :
                                <span className="sp-tag sp-tag--neutral sp-tag--xs fontWeight-7 fontSmoothing-reset ml-3">
                                    Public
                                </span>
                            }
                        </div>
                        
                    </div>

                </div>
                
            </header>
        );

    }

}


/*         EXPORT          */
/***************************/
export default Header;