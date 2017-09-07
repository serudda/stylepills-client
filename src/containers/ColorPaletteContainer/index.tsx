// Dependencies

import * as React from 'react';
import ColorPalette from '../../common/ColorPalette';
import { getUiComponentAction } from '../../actions/uiComponentActions';
import { connect } from 'react-redux';

export interface IProps {
    uiComponents: any; // eslint-disable-next-line
    dispatch: any; // eslint-disable-next-line
}

// Subscribe component to redux store and merge the state into
// component's props.
function mapStateToProps ({ uiComponents }: any ): any {
    // LOG    
    console.log('(1.2) Connect ColorPaletteContainer with Redux on containers/ColorPaletteContainer/index.tsx');
    console.log('(1.3) Launch mapStateToProps on containers/ColorPaletteContainer/index.tsx', uiComponents);
    return {
        uiComponents: uiComponents.uiComponents
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
        // LOG 
        console.log('(1.5) Enter to componentDidMount on containers/ColorPaletteContainer/index.tsx');
        console.log('(1.6) Dispatch getUiComponentAction on containers/ColorPaletteContainer/index.tsx');
        this.props.dispatch(getUiComponentAction());
    }


    render() {

        // LOG
        console.log('(1.4) Render ColorPaletteContainer on containers/ColorPaletteContainer/index.tsx');
        // 2. Debo revisar el ciclo completo, asegurarme que funciona, y si es asi empezar a limpiar todos los 
        // archivos, documentar el flujo de como funciona React + Redux.
        // 3. Empezar a tipar todo lo que más se pueda, crear un archivo schema para cada uno de los tipos de 
        // que hay: reducer, component, container, store, saga, etc.
        
        const { uiComponents = [] } = this.props;

        return(
            <div className="color-palette-container">
                <h3>Color Palette</h3>
                <ul>
                    {uiComponents.map((component: any, i: any) => (
                        <ColorPalette id={component.id} color={component.color} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ColorPaletteContainer);