/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from '../../../reducer/reducer.config';
import { IUiState } from '../../../reducer/ui.reducer';

import { showModalAction, closeModalAction } from '../../../actions/ui.action';
import { logInWithGoogleAction } from '../../../actions/auth.action';


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
        auth: {
            logInWithGoogle: () => void;
        },
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

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private 
     * @returns {void}
     */
    private _handleClick (e: any) {
        e.preventDefault();
        this._logInWithGoogle();
    }


    /**
     * @desc Log In with Google
     * @method _logInWithGoogle
     * @example this._logInWithGoogle()
     * @private 
     * @returns {void}
     */
    private _logInWithGoogle() {
        this.props.actions.auth.logInWithGoogle();
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
                        <a onClick={this._handleClick} href="" className="nav-link color-slate fontSize-sm">
                            Sign Up
                        </a>
                    </li>
                    <li className="nav-item mx-2">
                        <a onClick={this._handleClick} href="" className="nav-link color-slate fontSize-sm">
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
            auth: {
                logInWithGoogle: () => dispatch(logInWithGoogleAction())
            },
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