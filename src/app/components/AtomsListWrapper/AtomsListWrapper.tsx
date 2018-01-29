/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import AtomsList from './../AtomsList/AtomsList';
import PaginationBtnsContainer from './../../../components/common/PaginationBtns/PaginationBtns.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomsListWrapperProps = {
    loading: boolean;
    error: any;
    results: Array<AtomModel>;
    cursors: any;
};


/**
 * @desc Represent Atoms List Wrapper
 * @function AtomsListWrapper
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class AtomsListWrapper extends React.Component<AtomsListWrapperProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AtomsListWrapperProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const {results, loading, error, cursors} = this.props;


        /*       VALIDATIONS       */
        /***************************/
        if (loading) {
            return (
                <div className="fontSize-xxl fontFamily-poppins color-silver fontSmoothing-reset flex-center mt-5">
                    Loading...
                </div>
            );
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (results.length === 0) {
            return (
                <ul className="sp-messageBlock m-0 mx-4 mt-4">
                    <li className="sp-messageBlock__container sp-messageBlock__container--md">
                        <div className="icon icon--md icon--noResult mt-4 mb-3" />
                        <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                            We couldn’t find any component that match.
                        </div>
                    </li>
                </ul>
            );
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="py-5">
 
                <AtomsList atoms={results} showInfo={true}/>

                <div className="row pt-5 pb-5 margin-0 no-gutters">
                    <div className="col">
                        <div className="d-sm-flex flex-wrap width-wrapper justify-content-around">
                            
                            {/* Pagination Buttons */}
                            <PaginationBtnsContainer cursors={cursors}/>

                        </div>
                    </div>
                </div>

            </div>
        );

    }
    
}


/* Export */
export default AtomsListWrapper;