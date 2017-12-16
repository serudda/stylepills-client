/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import Header from './../Header/Header';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentListProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentList
extends React.Component<ChildProps<ComponentListProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ComponentListProps & StateProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        /*         MARKUP          */
        /***************************/
        return (
            <div>

                {/* Header */}
                <Header />

                <div className="ComponentList">
                    Hello component list
                </div>

            </div>
        );

    }

}


/*         EXPORT          */
/***************************/
export default ComponentList;