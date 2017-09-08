/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import ColorPalette from './ColorPalette.presentation';
import { getUiComponentAction } from '../../../models/uiComponent/uiComponent.action';
import { connect, Dispatch } from 'react-redux';


/************************************/
/*            INTERFACES            */
/************************************/

/* Own Props */
interface IOwnProps {}

/* Mapped State to Props */
interface IStateProps {
    uiComponents: Array<any>;
}

/* Mapped Dispatches to Props */
interface IDispatchProps {
    getUiComponents: () => void;
}


/*            MAPSTATETOPROPS            */
/*****************************************/
function mapStateToProps (state:any): IStateProps {
    return {
        uiComponents: state.uiComponents.items
    };
}


/*            MAPDISPATCHTOPROPS            */
/********************************************/
function mapDispatchToProps (dispatch: Dispatch<any>): IDispatchProps {
    return {
        getUiComponents: () => dispatch(getUiComponentAction())
    };
}


/****************************************/
/*           CLASS DEFINITION           */
/****************************************/
class ColorPaletteContainer extends React.Component<IOwnProps & IStateProps & IDispatchProps, {}> {

    
    componentDidMount() {        
        //this.props.getUiComponents();
    }


    /*         RENDER         */
    /**************************/
    render() {

        const { uiComponents = [] } = this.props;

        return(
            <div className="color-palette-container">
                <h3>Color Palette</h3>
                <ul>
                    {uiComponents.map((component: any, i: any) => (
                        <ColorPalette id={component.id} color={component.color} />
                    ))}
                </ul>
                <button onClick={this.props.getUiComponents} type="button">Press me</button>
            </div>
        );

    }
}

/* Export */
export default connect(mapStateToProps, mapDispatchToProps)(ColorPaletteContainer);