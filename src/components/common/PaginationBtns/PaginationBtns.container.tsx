/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as appConfig from '../../../core/constants/app.constants';

import { IRootState } from '../../../reducer/reducer.config';
import { IPaginationState } from '../../../reducer/pagination.reducer';
import { ICursor } from '../../../models/global/pagination.interface';

import { prevPageAtomAction, nextPageAtomAction } from '../../../actions/pagination.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PaginationBtnsProps = {
    cursors: ICursor;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    pagination: IPaginationState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        pagination: {
            nextPageAtom: (pagination: any) => void;
            prevPageAtom: (pagination: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PaginationBtnsContainer 
extends React.Component<ChildProps<PaginationBtnsProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();

        // Bind methods
        this._handleNextClick = this._handleNextClick.bind(this);
        this._handlePrevClick = this._handlePrevClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Next Button Click
     * @method _handleNextClick
     * @example this._handleNextClick()
     * @private 
     * @returns {void}
     */
    private _handleNextClick (e: any) {
        // VARIABLES
        let queryArgs: IPaginationState = null;

        // Build the pagination params set
        queryArgs = {
            paginationAtoms: {
                first: appConfig.ATOM_SEARCH_LIMIT,
                after: this.props.cursors.after,
                last: null,
                before: null
            }
        };
        
        // Trigger Pagination Atoms Action
        this.props.actions.pagination.nextPageAtom(queryArgs);
    }


    /**
     * @desc Handle Prev Button Click
     * @method _handlePrevClick
     * @example this._handlePrevClick()
     * @private 
     * @returns {void}
     */
    private _handlePrevClick (e: any) {
        // VARIABLES
        let queryArgs: IPaginationState = null;

        // Build the pagination params set
        queryArgs = {
            paginationAtoms: {
                first: null,
                after: null,
                last: appConfig.ATOM_SEARCH_LIMIT,
                before: this.props.cursors.before
            }
        };
        
        // Trigger Pagination Atoms Action
        this.props.actions.pagination.prevPageAtom(queryArgs);
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const{...cursors} = this.props.cursors;
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="PaginationBtns">
                {cursors.hasPrevious && 
                <button onClick={this._handlePrevClick}
                        className="sp-btn sp-btn--lg sp-btn--secondary-ghost float-left">
                    Prev
                </button>}
                
                {cursors.hasNext && 
                <button onClick={this._handleNextClick}
                        className="sp-btn sp-btn--lg sp-btn--secondary-ghost float-right">
                    Next
                </button>}
            </div>
        );

    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        pagination: state.pagination
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            pagination: {
                nextPageAtom: (queryArgs: any) => dispatch(nextPageAtomAction(queryArgs)),
                prevPageAtom: (queryArgs: any) => dispatch(prevPageAtomAction(queryArgs))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const paginationBtnsConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    paginationBtnsConnect
)(PaginationBtnsContainer);