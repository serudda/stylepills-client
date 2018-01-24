/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from '../../../../core/utils/functionsUtil';

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
    name: string,
    html: string,
    css: string,
    contextualBg: string
};

/* Own States */
type LocalStates = {
    html?: string,
    css?: string
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
            css: props.css
        };

        // LOG
        functionsUtil.consoleLog('PreviewSection container actived');
    }

    /**********************************/
    /*  COMPONENT WILL RECEIVE PROPS  */
    /**********************************/
    componentWillReceiveProps(nextProps: PreviewSectionProps & StateProps) {   
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
        const { name, contextualBg } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection boxShadow-raised sp-rounded-top-md sp-bg-white border-6 borderColor-white">
                <div className="PreviewSection__content borderRadius-xs">    
                    <div className="Iframe-wrapper">
                        <Iframe children={this.state.html} 
                                css={this.state.css} 
                                title={name}
                                background={contextualBg}
                                stylesheets={['https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css']} />
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
    
    const { atoms } = state.atomState.edited;

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