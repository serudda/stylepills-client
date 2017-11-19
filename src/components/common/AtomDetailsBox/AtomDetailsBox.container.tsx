/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../reducer/reducer.config';

import { Atom as AtomModel } from '../../../models/atom/atom.model';

import Icon from '../Icon/Icon';
import Iframe from '../Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type AtomDetailsBoxProps = {
    atom: AtomModel
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomDetailsBox 
extends React.Component<ChildProps<AtomDetailsBoxProps & StateProps & DispatchProps, {}>, LocalStates> {


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

        // Destructuring props
        const { atom } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="AtomDetailsBox">
                
                {/* Preview Section */}
                <div className="PreviewSection boxShadow-raised sp-rounded-top-md sp-bg-white border-6 borderColor-white">
                    <div className="AtomDetailsBox__content borderRadius-xs">    
                        <Iframe html={atom.html} style={atom.css} background={atom.contextualBg} />
                    </div>
                </div>

                {/* Panel Section */}
                <div className="PanelSection">
                    <div className="row no-gutters pl-3 align-items-center boxShadow-raised sp-rounded-bottom-md sp-bg-white borderTop-1 borderColor-smoke overflow-hidden">
                        
                        <div className="col-auto mr-auto">

                            {/* Stats */}
                            <div className="sp-stats">
                                <div className="like sp-stats__item">
                                    <Icon icon="heart" 
                                        iconClass="stroke-silver strokeWidth-2 mr-1"
                                        width="16" height="16"/>
                                    <span className="fontSize-md fontWeight-9 color-silver">999</span>
                                </div>
                                <div className="comment sp-stats__item">
                                    <Icon icon="messageCircle"
                                        iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                                        width="16" height="16"/>
                                    <span className="fontSize-md fontWeight-9 color-silver">999</span>
                                </div>
                                <div className="store sp-stats__item">
                                    <Icon icon="package"
                                        iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                                        width="16" height="16"/>
                                    <span className="fontSize-md fontWeight-9 color-silver">999</span>
                                </div>
                                <div className="view sp-stats__item">
                                    <Icon icon="eye" 
                                        iconClass="stroke-silver strokeWidth-2 mr-1 ml-3"
                                        width="16" height="16"/>
                                    <span className="fontSize-md fontWeight-9 color-silver">999</span>
                                </div>
                            </div>

                        </div>

                        <div className="col-auto">

                            {/* Tab Menu */}
                            <div className="sp-iconTabMenu fontSmoothing-reset">
                                <button className="sp-iconTabMenu__button">
                                    <div className="inner">
                                        <Icon icon="heartFull"
                                            iconClass="strokeWidth-2"
                                            width="22" height="22"/>
                                    </div>
                                </button>
                                <button className="sp-iconTabMenu__button">
                                    <div className="inner">
                                        <Icon icon="share"
                                            iconClass="strokeWidth-2 stroke-slate"
                                            width="22" height="22"/>
                                    </div>
                                </button>
                                <button className="sp-iconTabMenu__button sp-iconTabMenu__button--active">
                                    <div className="inner">
                                        <Icon icon="messageCircle"
                                            iconClass="strokeWidth-2 stroke-darkSecondary"
                                            width="22" height="22"/>
                                    </div>
                                </button>
                                <button className="sp-iconTabMenu__button">
                                    <div className="inner">
                                        <Icon icon="download"
                                            iconClass="strokeWidth-2 stroke-slate"
                                            width="22" height="22"/>
                                    </div>
                                </button>
                                <button className="sp-iconTabMenu__button">
                                    <div className="inner">
                                        <Icon icon="package"
                                            iconClass="strokeWidth-2 stroke-slate"
                                            width="22" height="22"/>
                                    </div>
                                </button>
                            </div>
                        </div>
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
    return {};
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomDetailsBoxConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    atomDetailsBoxConnect
)(AtomDetailsBox);