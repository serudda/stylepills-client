/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../../../reducer/reducer.config';
import { CodeSupportedOption } from './../../../../../../core/interfaces/interfaces';

import {
    CurrentCode
} from './../../../../../../reducer/ui.reducer';

import { Basic as BasicColorModel } from './../../../../../../models/color/color.model';
import { RgbaColor as RgbaColorModel } from './../../../../../../models/rgbaColor/rgbaColor.model';
import { Lib as LibModel } from './../../../../../../models/lib/lib.model';
import LibService from './../../../../../../models/lib/lib.service';

import { changeColorAction } from './../../../../../../actions/ui.action';

import { getCurrentColor, getLibListDenormalized, getCurrentCode } from './../../../../../../selectors/ui.selector';

import PreviewBox from './../../../../../../app/components/PreviewBox/PreviewBox';
import Iframe from './../../../../../common/Iframe/Iframe.container';

// -----------------------------------


//        OWN PROPS & STATES      
// ===================================

/* Own Props */
type PreviewSectionContainerProps = {
    html: string;
    css: string;
};

/* Own States */
type LocalStates = {
    html: string,
    css: string
};


//    REDUX MAPPED PROPS & STATES
// ===================================

/* Mapped State to Props */
type StateProps = {
    color: BasicColorModel,
    currentCode: CurrentCode,
    libs: Array<LibModel>
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        ui: {
            changeColor: (color: BasicColorModel) => void;
        }
    };
};


//     ALL PROPS (EXTERNAL & OWN)
// ===================================   

type AllProps =    
    PreviewSectionContainerProps
&   StateProps
&   DispatchProps;


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreviewSectionContainer
extends React.Component<ChildProps<AllProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLOR_HEX: string = '#F9FAFC';
    private _DEFAULT_COLOR_RGBA: RgbaColorModel = {
        r: 249, g: 250, b: 252, a: 1
    };


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: AllProps) {
        super(props);

        // Init local state
        this.state = {
            html: props.html || '',
            css: props.css || ''
        };
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {
        // Init States on Store
        this._initCurrentColor();
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: AllProps) { 
        const { currentCode } = nextProps;
        const { html, css } = currentCode;

        if (html !== null || css !== null) {
            this.setState({
                html: currentCode[CodeSupportedOption.html].code,
                css: currentCode[CodeSupportedOption.css].code
            });
        }
        
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Init currentColor State in Store
     * @method _initCurrentColor
     * @example this._initCurrentColor()
     * @private 
     * @returns {void}
     */
    private _initCurrentColor() {
        const defaultColor: BasicColorModel = {
            hex: this._DEFAULT_COLOR_HEX,
            rgba: this._DEFAULT_COLOR_RGBA
        };

        this.props.actions.ui.changeColor(defaultColor);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring state & props 
        const { html, css } = this.state;
        const { color, libs} = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <PreviewBox height="30" 
                        isEmptyPreview={html === ''}> 
                <Iframe children={html} 
                        css={css} 
                        title={'new'}
                        background={color.hex}
                        stylesheets={LibService.getStylesheetsFromLibs(libs)} />
            </PreviewBox>
        );
    }
    
}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    return {
        color: getCurrentColor(state),
        currentCode: getCurrentCode(state),
        libs: getLibListDenormalized(state)
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
const previewSectionContainerConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    previewSectionContainerConnect
)(PreviewSectionContainer);