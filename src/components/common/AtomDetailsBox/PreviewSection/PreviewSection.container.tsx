/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';
import { IAtomsProps } from '../../../../reducer/atom.reducer';

import { Basic as BasicColorModel } from './../../../../models/color/color.model';
import { Lib as LibModel } from './../../../../models/lib/lib.model';

import LibService from './../../../../models/lib/lib.service';

import { changeColorAction } from './../../../../actions/ui.action';
import { getCurrentColor, getLibListFormatted } from './../../../../selectors/ui.selector';

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
    color: BasicColorModel,
    atoms: Array<IAtomsProps>,
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


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props 
        const { name, libs, color } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <PreviewBox height="30"> 
                <Iframe children={this.state.html} 
                                css={this.state.css} 
                                title={name}
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

    // Destructuring state 
    const { atoms } = state.atomState.edited;

    return {
        color: getCurrentColor(state),
        atoms,
        libs: getLibListFormatted(state)
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