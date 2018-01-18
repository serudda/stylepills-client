/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import { IRootState } from './../../../../../../../reducer/reducer.config';
import { functionsUtil } from './../../../../../../../core/utils/functionsUtil';

import { Basic as BasicColorModel } from './../../../../../../../models/color/color.model';

import { changeColorAction, ICurrentCode } from '../../../../../../../actions/ui.action';

import SmallBoxContainer from './../../../../../../common/ColorPicker/SmallBox/SmallBox.container';
import Iframe from './../../../../../../common/Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

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

/* Mapped State to Props */
type StateProps = {
    hex: string;
    currentCode: Array<ICurrentCode>;
};

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
class PreviewSectionContainer
extends React.Component<ChildProps<PreviewSectionContainerProps & StateProps & DispatchProps, {}>, LocalStates> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLOR_HEX: string = '#F9FAFC';
    private _DEFAULT_COLORS_LIST: Array<string> = [
        '#273444', 
        '#3C4858', 
        '#8492A6', 
        '#E0E6ED', 
        '#EFF2F7',
        '#976B55',
        '#7BDCB5', 
        '#0693E3', 
        '#FFF78A', 
        '#EC7D7D'
    ];


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewSectionContainerProps & StateProps & DispatchProps) {
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
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {
        
        const DEFAULT_COLOR_HEX = this._DEFAULT_COLOR_HEX;
        const DEFAULT_COLOR_RGBA = {
            r: 249, g: 250, b: 252, a: 1
        };

        const defaultColor: BasicColorModel = {
            hex: DEFAULT_COLOR_HEX,
            rgba: DEFAULT_COLOR_RGBA

        };

        this._changeColor(defaultColor);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: PreviewSectionContainerProps & StateProps) {   
        const { currentCode } = nextProps;

        let obj = functionsUtil.sourceCodeArrayToObj(currentCode);

        this.setState(obj);
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
        this._changeColor(color);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/


    /**
     * @desc Change Color of Color Picker
     * @method _changeColor
     * @example this._changeColor()
     * @private 
     * @returns {void}
     */
    private _changeColor(color: BasicColorModel) {
        this.props.actions.ui.changeColor(color);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring state & props 
        const { html, css } = this.state;
        const { hex } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection sp-bg-white border-6 borderColor-white">

                <div className="float-color-picker">

                    <Popup
                        trigger={
                            <div>
                                <SmallBoxContainer onChange={this.handleColorChange} 
                                        defaultHexColor={this._DEFAULT_COLOR_HEX}
                                        defaultColors={this._DEFAULT_COLORS_LIST}/>
                            </div>
                        }
                        position="top left"
                        size="tiny"
                        inverted={true}>
                            Contextual background
                    </Popup>

                </div>
                
                <div className="PreviewSection__content">

                    {html === '' && 
                        <div className="d-flex align-items-center justify-content-center fontSize-xxl color-darkSmoke fontWeight-7 cover-link">
                            <span>
                                Component preview
                            </span>
                        </div>
                    }

                    <div className="Iframe-wrapper">
                        <Iframe children={html} 
                                css={css}
                                title={'new'}
                                background={hex}
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

    // Destructuring state 
    const { ui } = state;
    const { colorPicker } = ui;
    const { currentColor } = colorPicker;
    const { hex } = currentColor;

    const { currentCode } = state.ui.sourceCodePanel;

    return {
        hex,
        currentCode
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