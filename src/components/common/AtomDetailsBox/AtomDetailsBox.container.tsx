/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../core/utils/functionsUtil';

import { Basic as BasicColorModel } from './../../../models/color/color.model';

import { IRootState } from './../../../reducer/reducer.config';

import { Atom as AtomModel } from '../../../models/atom/atom.model';
import { Lib as LibModel } from './../../../models/lib/lib.model';

import {
    changeLibsAction,
    changeColorAction
} from './../../../actions/ui.action';

import PreviewSectionContainer from './PreviewSection/PreviewSection.container';
import PanelSection from './PanelSection/PanelSection.container';

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
type DispatchProps = {
    actions: {
        ui: { 
            changeLibs: (libs: Array<LibModel>) => void;
            changeColor: (color: BasicColorModel) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class AtomDetailsBoxContainer
extends React.Component<ChildProps<AtomDetailsBoxProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLOR_HEX: string = '#F9FAFC';


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<AtomDetailsBoxProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('AtomDetailsBox container actived');
    }

    componentDidMount() {
        const { libs } = this.props.atom;
        const { contextualBg } = this.props.atom;
        
        const DEFAULT_COLOR_HEX = this._DEFAULT_COLOR_HEX;
        const DEFAULT_COLOR_RGBA = {
            r: 249, g: 250, b: 252, a: 1
        };

        const defaultColor: BasicColorModel = {
            hex: contextualBg || DEFAULT_COLOR_HEX,
            rgba: functionsUtil.convertHexToRgbaModel(contextualBg, 1) || DEFAULT_COLOR_RGBA
        };

        this.props.actions.ui.changeColor(defaultColor);

        this.props.actions.ui.changeLibs(libs);
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
            <div className="AtomDetailsBox boxShadow-raised borderRadius-md">
                
                {/* Preview Section */}
                <PreviewSectionContainer atomId={atom.id} 
                                        name={atom.name} 
                                        html={atom.html} 
                                        css={atom.css} />

                {/* Panel Section */}
                <PanelSection atom={atom}/>

            </div>
        );
    }

}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            ui: {
                changeLibs: (libs) => dispatch(changeLibsAction(libs)),
                changeColor: (color: BasicColorModel) => dispatch(changeColorAction(color))
            }
        }
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const atomDetailsBoxContainerConnect = connect(null, mapDispatchToProps);


/*         EXPORT          */
/***************************/
export default compose(
    atomDetailsBoxContainerConnect
)(AtomDetailsBoxContainer);