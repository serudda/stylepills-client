/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from '../../../../core/utils/functionsUtil';

import { IRootState } from './../../../../reducer/reducer.config';
import { IAtomsProps } from '../../../../reducer/atom.reducer';

import { Basic as BasicColorModel } from './../../../../models/color/color.model';
import { Lib as LibModel, getStylesheetsFromLibs } from './../../../../models/lib/lib.model';

import { changeColorAction } from './../../../../actions/ui.action';

import PreviewBox from './../../../../app/components/PreviewBox/PreviewBox';
import Iframe from '../../Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreviewSectionContainerProps = {
    atomId: number,
    name: string,
    html: string,
    css: string,
    libs: Array<LibModel>,
    contextualBg: string
};

/* Own States */
type LocalStates = {
    html?: string,
    css?: string
};

/* Mapped State to Props */
type StateProps = {
    hex: string;
    atoms: Array<IAtomsProps>;
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


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewSectionContainerProps & StateProps & DispatchProps) {
        super(props);

        this.state = {
            html: props.html,
            css: props.css
        };

        // LOG
        functionsUtil.consoleLog('PreviewSection container actived');

        // Bind methods
        this.handleColorChange = this.handleColorChange.bind(this);
    }


    /********************************/
    /*       COMPONENTDIDMOUNT      */
    /********************************/
    componentDidMount() {

        const { contextualBg } = this.props;
        
        const DEFAULT_COLOR_HEX = this._DEFAULT_COLOR_HEX;
        const DEFAULT_COLOR_RGBA = {
            r: 249, g: 250, b: 252, a: 1
        };

        const defaultColor: BasicColorModel = {
            hex: contextualBg || DEFAULT_COLOR_HEX,
            rgba: DEFAULT_COLOR_RGBA
        };

        this._changeColor(defaultColor);
    }


    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: PreviewSectionContainerProps & StateProps) {   
        const { atoms } = nextProps;

        this.getAtomState(atoms);
    }


    // TODO: Mover a una parte global ya que esto lo voy a tener que hacer en varias partes
    getAtomState (array: Array<IAtomsProps>) {
        let atomState: IAtomsProps = null;

        array.forEach((atom) => {
            if (atom.atomId === this.props.atomId) { 
                atomState = atom;
            }
        });

        if (atomState) {
            let obj = {};
            atomState.atomCode.forEach((code) => {
                obj[code.codeType] = code.codeProps.code;
            });
            this.setState(obj);
        }
    }

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
        // TODO: No esta funcionando por que tengo un problema grave, y es que 
        // como solo almaceno el HEX del contextualBG, entonces no tengo un RGBA,
        // y es el RGBA el que necesito para el colorpicker. Analizar bien
        this.props.actions.ui.changeColor(color);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props 
        const { name, libs, contextualBg } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <PreviewBox height="30" onColorChange={this.handleColorChange}> 
                <Iframe children={this.state.html} 
                                css={this.state.css} 
                                title={name}
                                background={contextualBg}
                                stylesheets={getStylesheetsFromLibs(libs)} />
            </PreviewBox>
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

    const { atoms } = state.atomState.edited;
    
    

    return {
        hex,
        atoms
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