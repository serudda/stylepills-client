/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { IRootState } from './../../../../reducer/reducer.config';
import { IAtomsProps } from '../../../../reducer/atom.reducer';

import Iframe from '../../Iframe/Iframe.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type PreviewSectionProps = {
    atomId: number,
    html: string,
    style: string,
    contextualBg: string
};

/* Own States */
type LocalStates = {
    html?: string,
    style?: string
};

/* Mapped State to Props */
type StateProps = {
    atoms: Array<IAtomsProps>;
};



/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class PreviewSection
extends React.Component<ChildProps<PreviewSectionProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewSectionProps & StateProps) {
        super(props);

        this.state = {
            html: props.html,
            style: props.style
        };

        // tslint:disable-next-line:no-console
        console.log('PreviewSection is active');
    }

    componentDidMount() {
        const { atoms } = this.props;

        this.getAtomState(atoms);
    }

    // TODO: Mover a una parte global ya que esto lo voy a tener que hacer en varias partes
    getAtomState (array: Array<IAtomsProps>) {
        let atomState: IAtomsProps = null;

        array.forEach((atom) => {
            if (atom.id === this.props.atomId) { 
                atomState = atom;
            }
        });

        if (atomState) {
            atomState.atomCode.forEach((code) => {
                this.setState({
                    [code.codeType]: code.codeProps
                });
            });
        }

        // tslint:disable-next-line:no-console
        console.log('this.state: ', this.state);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { contextualBg } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection boxShadow-raised sp-rounded-top-md sp-bg-white border-6 borderColor-white">
                <div className="PreviewSection__content borderRadius-xs">    
                    <Iframe html={this.state.html} style={this.state.style} background={contextualBg} />
                </div>
            </div>
        );
    }

}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    
    const { atoms } = state.atomState.edited;

    // tslint:disable-next-line:no-console
    console.log('Atoms Changed: ', atoms);

    return {
        atoms
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const previewSectionConnect = connect(mapStateToProps);


/*         EXPORT          */
/***************************/
export default compose(
    previewSectionConnect
)(PreviewSection);