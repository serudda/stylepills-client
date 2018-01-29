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

/* Possible Atoms List Wrapper type options */
export enum WrapperTypeOptions {
    general = 'general',
    user = 'user',
    project = 'project'
}

/* Own Props */
type AtomsListWrapperProps = {
    type: WrapperTypeOptions;
    userFirstName?: string;
    userLastName?: string;
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
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Build Loading screen
     * @method _buildLoading
     * @example this._buildLoading()
     * @private
     * @returns {JSX.Element}
     */
    private _buildLoading(): JSX.Element {

        // Destructuring props
        const { type } = this.props;
        let loading = null;

        switch (type) {
            case WrapperTypeOptions.general:

                loading = ( 
                    <div className="fontSize-xxl fontFamily-poppins color-silver fontSmoothing-reset flex-center mt-5">
                        Loading...
                    </div> 
                );

                break;
            
            case WrapperTypeOptions.user:

                loading = ( 
                    <div className="fontSize-xxl fontFamily-poppins color-silver fontSmoothing-reset flex-center mt-5">
                        Loading...
                    </div> 
                );
                
                break;
            
            case WrapperTypeOptions.project:

                loading = ( 
                    <div className="color-slate fontSize-xxl fontFamily-poppins fontSmoothing-reset flex-center mt-5">
                        Loading...
                    </div>
                );
                
                break;
        
            default:

                loading = ( 
                    <div className="fontSize-xxl fontFamily-poppins color-silver fontSmoothing-reset flex-center mt-5">
                        Loading...
                    </div> 
                );

                break;
        }

        return loading;
        
    }


    /**
     * @desc Build No Data Message
     * @method _buildNoData
     * @example this._buildNoData()
     * @private
     * @returns {JSX.Element}
     */
    private _buildNoData(): JSX.Element {

        // Destructuring props
        const { type, userFirstName, userLastName } = this.props;
        let noData = null;

        switch (type) {
            case WrapperTypeOptions.general:

                noData = ( 
                    <ul className="sp-messageBlock m-0 mx-4 mt-4">
                        <li className="sp-messageBlock__container sp-messageBlock__container--md">
                            <div className="icon icon--md icon--noResult mt-4 mb-3" />
                            <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                                We couldn’t find any component that match.
                            </div>
                        </li>
                    </ul>
                );

                break;
            
            case WrapperTypeOptions.user:

                noData = ( 
                    <ul className="sp-messageBlock m-0 mx-4 mt-4">
                        <li className="sp-messageBlock__container sp-messageBlock__container--lg">
                            <div className="icon icon--sm icon--empty mt-4 mb-3" />
                            <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                                {userFirstName} {userLastName} doesn't have any public component yet.
                            </div>
                        </li>
                    </ul>
                );
                
                break;
            
            case WrapperTypeOptions.project:

                noData = ( 
                    <ul className="sp-messageBlock m-0 mx-4 mt-4">
                        <li className="sp-messageBlock__container sp-messageBlock__container--lg">
                            <div className="icon icon--sm icon--empty mt-4 mb-3" />
                            <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                                This project doesn't have any component yet.
                            </div>
                        </li>
                    </ul>
                );
                
                break;
        
            default:

                noData = ( 
                    <ul className="sp-messageBlock m-0 mx-4 mt-4">
                        <li className="sp-messageBlock__container sp-messageBlock__container--md">
                            <div className="icon icon--md icon--noResult mt-4 mb-3" />
                            <div className="text text--sm fontFamily-openSans fontWeight-7 color-extraDarkSmoke mb-4">
                                We couldn’t find any component that match.
                            </div>
                        </li>
                    </ul>
                );

                break;
        }

        return noData;
        
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
            return this._buildLoading();
        }

        if (error) {
            return (<p>{error.message}</p>);
        }

        if (results.length === 0) {
            return this._buildNoData();
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