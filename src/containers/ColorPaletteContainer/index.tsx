// Dependencies

import * as React from 'react';
import ColorPalette from '../../common/ColorPalette';
import { getUiComponentAction } from '../../actions/uiComponentActions';
import { connect } from 'react-redux';

export interface IProps {
    uiComponents: any;
    dispatch: any
}

// Subscribe component to redux store and merge the state into
// component's props.
function mapStateToProps ({ uiComponents } : any ) : any {
    return {
        uiComponents
    };
}


class ColorPaletteContainer extends React.Component<IProps, object> {

    /*mapDispatchToProps(dispatch: Dispatch<any>): any {
        return {
            getUiComponents: () => dispatch(getUiComponentAction())
        };
    }*/

    // Dispatches 'getUiComponentAction' inmediately after initial rendering.
    // Note that we are using the dispatch method from the store to execute this task,
    // courtesy of 'react-redux'
    componentDidMount() {
        this.props.dispatch(getUiComponentAction());
    }


    render() {
        //FIXME: Esta llegando doble Array, y es por que en uiComponentReducer, al
        // hacer la destructuracion: [...state, action.uiComponents] al ser action.uiComponents un array, estoy
        // metiendo un array dentro de otro Array.
        // 2. Debo revisar el ciclo completo, asegurarme que funciona, y si es asi empezar a limpiar todos los 
        // archivos, documentar el flujo de como funciona React + Redux.
        // 3. Empezar a tipar todo lo que más se pueda, crear un archivo schema para cada uno de los tipos de 
        // que hay: reducer, component, container, store, saga, etc.
        
        const { uiComponents } = this.props;
        console.log('uiComponents', JSON.stringify(uiComponents));

        return(
            <div className="color-palette-container">
                <h3>Color Palette</h3>
                <ul>
                    {uiComponents.map((component: any, i: any) => (
                        <ColorPalette id={component.id} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ColorPaletteContainer);