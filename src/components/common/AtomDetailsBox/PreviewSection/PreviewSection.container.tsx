/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

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
    css: string
};

/* Own States */
type LocalStates = {
    html: string,
    css: string
};

/* Mapped State to Props */
type StateProps = {
    hex: string;
    atoms: Array<IAtomsProps>;
    libs: Array<LibModel>;
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
        this.props.actions.ui.changeColor(color);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props 
        const { name, libs, hex } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <PreviewBox height="30"
                        onColorChange={this.handleColorChange}> 
                <Iframe children={this.state.html} 
                                css={this.state.css} 
                                title={name}
                                background={hex}
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

    const { libs } = state.ui.libsPanel;

    return {
        hex,
        atoms,
        libs
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