/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import * as appConfig from './../../../core/constants/app.constants';
import { functionsUtil } from '../../../core/utils/functionsUtil';

import { IRootState } from './../../../reducer/reducer.config';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import Iframe from '../Iframe/Iframe.container';

import { showModalAction } from './../../../actions/ui.action';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomBoxProps = {
    atom: AtomModel
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: { 
            showModal: (modalType: string, modalProps: any) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomBox 
extends React.Component<ChildProps<AtomBoxProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomBoxProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('AtomBox container actived');

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc HandleClick
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {AtomModel} atom - atom data
     * @param {React.FormEvent<{}>} e - Click Event
     * @returns {void}
     */
    private _handleClick = (atom: AtomModel) => (e: React.FormEvent<{}>) => {
        e.preventDefault();
        this._showModal(atom);
    }


    /**
     * @desc Show Modal 
     * @method _showModal
     * @example this._showModal()
     * @private
     * @param {AtomModel} atom - atom data
     * @returns {void}
     */
    private _showModal(atom: AtomModel) {
        this.props.actions.ui.showModal(appConfig.ATOM_DETAILS_MODAL_TYPE, {atom});
    }


    /**
     * @desc Connect frame with this component
     * method sample
     */
    onLoad(): void {
        // LOG
        functionsUtil.consoleLog('IFrame connected with AtomBox component');
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { atom } = this.props;

        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomBox boxShadow-raised borderRadius-md sp-bg-white border-6 borderColor-white mb-2">
                <div className="AtomBox__content borderRadius-xs">
                    <div onClick={this._handleClick(atom)} className="cover-link"/>
                    <div className="Iframe-wrapper">
                        <Iframe onLoad={this.onLoad} 
                                children={atom.html} 
                                css={atom.css} 
                                title={atom.name}
                                background={atom.contextualBg}
                                stylesheets={['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css']} />
                    </div>
                </div>
            </div>
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                showModal: (modalType, modalProps) => dispatch(showModalAction(modalType, modalProps))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomBoxConnect = connect(null, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose( 
    atomBoxConnect
)(AtomBox);