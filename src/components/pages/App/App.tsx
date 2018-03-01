/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_USER_BY_ID_QUERY, GetByIdResponse } from '../../../models/user/user.query';

import { IRootState } from '../../../reducer/reducer.config';

import { User } from '../../../models/user/user.model';

import { getAllPreprocessorsAction } from './../../../actions/preprocessor.action';

import Main from '../Main/Main';
import ModalManager from './../../../app/containers/Modals/ModalManager/ModalManager.container';

import 'semantic-ui-css/semantic.min.css';
import './App.css'; 


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AppProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {
    isAuthenticated: boolean;
    user: User;
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            getAllPreprocessors: () => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class App 
extends React.Component<ChildProps<AppProps & StateProps & DispatchProps, GetByIdResponse>, LocalStates> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AppProps & StateProps & DispatchProps, GetByIdResponse>) {
        super(props);
    }


    /********************************/
    /*    COMPONENT_WILL_MOUNT      */
    /********************************/
    componentWillMount() {

        // Init States on Store NOTE: 1
        this._initPreprocessorsList();

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Init preprocessors list State in Store
     * @method _initPreprocessorsList
     * @example this._initPreprocessorsList()
     * @private 
     * @returns {void}
     */
    private _initPreprocessorsList() {
        this.props.actions.ui.getAllPreprocessors();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*         MARKUP          */
        /***************************/
        return (
            <div className="AppContent sp-bg-darkSnow">
                <ModalManager />
                <Main />
            </div>
        );
    }
}


// Query config object
const config = {
    skip: (ownProps: AppProps & StateProps) => {
        return !ownProps.isAuthenticated;
    },
    options:  (ownProps: AppProps & StateProps) => {
        // TODO: PARCHE: Es una solucion antes de migrar react-apollo a v2
        // https://github.com/apollographql/react-apollo/blob/master/Changelog.md
        // https://github.com/apollographql/react-apollo/pull/1181
        let id = null;

        if (ownProps.user) {
            id = ownProps.user.id;
        }

        return {
            variables:
            { 
               id
           }
        };
    }
};


/********************************/
/*            QUERY             */
/********************************/
const getUserByIdQuery = graphql<GetByIdResponse, AppProps>(
    GET_USER_BY_ID_QUERY, config
);


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { isAuthenticated, user } = state.auth; 
    return {
        isAuthenticated,
        user
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                getAllPreprocessors: () => dispatch(getAllPreprocessorsAction())
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const appConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default withRouter(compose<any>(
    appConnect,
    getUserByIdQuery
)(App));


/*

(1): Usamos componentWillMount en vez de componentDidMount por que necesitamos tener cargada la lista de
preprocesadores primero antes de que los demás componentes hijos se carguen.

*/