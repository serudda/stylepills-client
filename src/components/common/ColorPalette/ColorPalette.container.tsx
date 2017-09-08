// Dependencies
import * as React from 'react';
import ColorPalette from './ColorPalette.presentation';
import { getUiComponentAction } from '../../../models/uiComponent/uiComponent.action';
import { connect } from 'react-redux';

export interface IProps {
    uiComponents: any;
    dispatch: any;
}

// Subscribe component to redux store and merge the state into
// component's props.
function mapStateToProps (state:any): any {
    // LOG    
    console.log('(1.2) Connect ColorPaletteContainer with Redux on containers/ColorPaletteContainer/index.tsx');
    console.log('(1.3) Launch mapStateToProps on containers/ColorPaletteContainer/index.tsx', state.uiComponents.items);
    return {
        uiComponents: state.uiComponents.items
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