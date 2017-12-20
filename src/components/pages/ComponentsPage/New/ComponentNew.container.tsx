/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentNewProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentNew
extends React.Component<ChildProps<ComponentNewProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ComponentNewProps & StateProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentNew">
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <div className="icon icon--md icon--working mt-4 mb-3" />
                        <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                            <div>Coming soon!!</div>
                            <div>We're working hard to finish this as soon as possible.</div>
                        </div>
                    </li>
                </ul>
            </div>

        );

    }

}


/*         EXPORT          */
/***************************/
export default ComponentNew;