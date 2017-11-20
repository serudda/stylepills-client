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
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/display/autorefresh';

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

        const hmtlOptions = {
            scrollbarStyle: 'overlay',
            lineNumbers: true,
            readOnly: 'on',
            mode: 'xml',
            theme: 'material',
            autoRefresh: true
        };


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
                <div className="PanelSection boxShadow-raised sp-rounded-bottom-md overflow-hidden">

                    {/* Stats and Tab Menu Row */}
                    <div className="row no-gutters pl-3 align-items-center sp-bg-black borderTop-1 borderColor-smoke">
                        
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
                            <div className="sp-iconTabMenu sp-iconTabMenu--is-reversed fontSmoothing-reset">
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
                                <button className="sp-iconTabMenu__button">
                                    <div className="inner">
                                        <Icon icon="messageCircle"
                                            iconClass="strokeWidth-2 stroke-slate"
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
                                <button className="sp-iconTabMenu__button sp-iconTabMenu__button--active">
                                    <div className="inner">
                                        <Icon icon="code"
                                            iconClass="strokeWidth-2 stroke-darkPrimary"
                                            width="28" height="16"/>
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

                    {/* Source Code Section */}
                    <div className="row no-gutters sp-bg-black borderTop-1 border-dark overflow-hidden">

                        {/* Source Code Tab Menu */}
                        <div className="row no-gutters w-100" style={{backgroundColor: '#141619', borderTop: '1px solid #000000'}}>
                            <div className="col">

                                <div className="sp-tabMenu sp-tabMenu--is-reversed fontSmoothing-reset">
                                    <button className="sp-tabMenu__button sp-tabMenu__button--active">
                                        <div className="inner">
                                            HTML
                                        </div>
                                    </button>
                                    <button className="sp-tabMenu__button">
                                        <div className="inner">
                                            CSS
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Source Code Panel */}
                        <div className="row no-gutters w-100 sp-bg-mirage">
                            <div className="col position-relative">
                                <div className="copyBtnContainer zIndex-footer">
                                    <button className="sp-btn sp-btn--secondary sp-btn--md">
                                        Copy
                                    </button>
                                </div>
                                <div className="SourceCode position-relative">
                                    <CodeMirror value={atom.html} options={hmtlOptions}/>
                                </div>
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