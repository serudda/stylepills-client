/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ColorPalette from './ColorPalette.presentation';
import { getUiComponentAction } from '../../../models/uiComponent/uiComponent.action';
import { connect, Dispatch } from 'react-redux';
import * as model from '../../../models/uiComponent/uiComponent.model';
import { IRootState } from '../../../reducer/reducer.config';


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
interface IOwnProps {}

/* Mapped State to Props */
interface IStateProps {
    uiComponents: Array<model.UiComponent>;
}

/* Mapped Dispatches to Props */
interface IDispatchProps {
    _getUiComponents: () => void;
}


/*            MAPSTATETOPROPS            */
/*****************************************/
/* Nota: viene 'state.uiComponents' por que al combinar los reducers (combineReducers)
   este le asignar el nombre que hayamos especificado en reducer.config.tsx, en este
   caso 'uiComponents' */
function mapStateToProps (state: IRootState): IStateProps {
    return {
        uiComponents: state.uiComponents.items
    };
}


/*            MAPDISPATCHTOPROPS            */
/********************************************/
function mapDispatchToProps (dispatch: Dispatch<IRootState>): IDispatchProps {
    return {
        _getUiComponents: () => dispatch(getUiComponentAction())
    };
}


/**
 * @desc Represents Color Palette container component
 * @class ColorPaletteContainer
 * @extends {React.Component}
 */
class ColorPaletteContainer extends React.Component<IOwnProps & IStateProps & IDispatchProps, {}> {

    
    /**
     * @desc Get UI components after all children Elements 
     * and our Component instances are mounted onto the Browser
     * @method componentDidMount
     * @memberof ColorPaletteContainer
     */
    componentDidMount() {        
        this.props._getUiComponents();
    }


    /*         RENDER         */
    /**************************/
    render() {

        const { uiComponents = [] } = this.props;

        return(
            <div className="color-palette-container">
                <h3>Color Palette</h3>
                <ul>
                    {uiComponents.map((component: model.UiComponent) => (
                        <ColorPalette key={component.id} options={component} />
                    ))}
                </ul>
                {/*<button onClick={this.props.getUiComponents} type="button">Press me</button> */}
            </div>
        );

    }
}

/* Export */
export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteContainer);