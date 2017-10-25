/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { IUiState } from '../../../reducer/ui.reducer';

import { showModalAction, closeModalAction } from '../../../actions/ui.action';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type NavbarOptionsProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    ui: IUiState;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            showModal: () => void;
            closeModal: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class NavbarOptions 
extends React.Component<ChildProps<NavbarOptionsProps & StateProps & DispatchProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="NavbarOptions collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2 active">
                        <a className="nav-link color-slate fontSize-sm" href="">
                            Explore
                        </a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link color-slate fontSize-sm" href="">
                            Sign Up
                        </a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link color-slate fontSize-sm" href="">
                            Log In
                        </a>
                    </li>
                </ul>
            </div>
        );

    }

}



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        ui:  state.ui
    };
}

/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                showModal: () => dispatch(showModalAction()),
                closeModal: () => dispatch(closeModalAction()),
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const navbarOptionsConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    navbarOptionsConnect
)(NavbarOptions);