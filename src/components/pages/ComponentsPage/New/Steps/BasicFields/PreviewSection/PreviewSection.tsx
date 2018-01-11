/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../../reducer/reducer.config';

import { Basic as BasicColorModel } from './../../../../../../../models/color/color.model';

import { changeColorAction } from '../../../../../../../actions/ui.action';

import SmallBoxContainer from './../../../../../../common/ColorPicker/SmallBox/SmallBox.container';
import Iframe from './../../../../../../common/Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreviewSectionProps = {
    html: string;
    css: string;
    contextualBg: string;
};

/* Own States */
type LocalStates = {
    html: string,
    css: string
};

/* Mapped State to Props */
type StateProps = {};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeColor: (color: BasicColorModel) => void;
        }
    };
};

/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreviewSection
extends React.Component<ChildProps<PreviewSectionProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewSectionProps & StateProps & DispatchProps) {
        super(props);

        // Init local state
        this.state = {
            html: props.html || '',
            css: props.css || ''
        };

        // Bind methods
        this.handleColorChange = this.handleColorChange.bind(this);
    }


    /********************************/
    /*        PUBLIC METHODS        */
    /********************************/


    /**
     * @desc Handle Color Change
     * @method handleColorChange
     * @example this.handleColorChange()
     * @public
     * @returns {void}
     */
    handleColorChange(color: BasicColorModel) {
        this.props.actions.ui.changeColor(color);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring state & props 
        const { html, css } = this.state;
        const { contextualBg } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection sp-bg-white border-6 borderColor-white">

                <div className="float-color-picker">
                    <SmallBoxContainer onChange={this.handleColorChange} 
                                        defaultHexColor="#F9FAFC"/>
                </div>
                
                <div className="PreviewSection__content">

                    <div className="d-flex align-items-center justify-content-center fontSize-xxl color-darkSmoke fontWeight-7 cover-link">
                        <span>
                            Component preview
                        </span>
                    </div>

                    <div className="Iframe-wrapper">
                        <Iframe children={html} 
                                css={css}
                                title={'new'}
                                background={contextualBg}
                                stylesheets={['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css']} />
                    </div>

                </div>
            </div>
        );
    }
    
}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        search: state.search
    };
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeColor: (color: BasicColorModel) => dispatch(changeColorAction(color))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const previewSectionConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    previewSectionConnect
)(PreviewSection);