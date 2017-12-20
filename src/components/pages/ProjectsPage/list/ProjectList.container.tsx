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
type ProjectListProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectList
extends React.Component<ChildProps<ProjectListProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectListProps & StateProps, {}>) {
        super(props);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectList">
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
export default ProjectList;