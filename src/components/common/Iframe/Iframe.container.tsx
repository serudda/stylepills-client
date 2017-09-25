/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { connect /* , Dispatch */ } from 'react-redux';

import { IRootState } from '../../../reducer/reducer.config';


/************************************/
/*            INTERFACES            */
/************************************/
/* Own Props */
interface IOwnProps {}


/*****************************************/
/*            MAPSTATETOPROPS            */
/*****************************************/
// TODO: Estudiar mas el uso de Apollo con Redux, ya que estoy empujando una mala
// implementación, de algo que no se si vaya a usar como es el mapStateProps
function mapStateToProps (state: IRootState): IOwnProps {
    return {
        fetched: state.apollo
    };
}


/**
 * @desc Represents Iframe Component
 * @class IframeContainer
 * @extends {React.Component}
 * @returns component page view (Stateful component)
 */
class IframeContainer extends React.Component<IOwnProps, {}> {

    buildFrame() {
        return;
    }

    componentDidMount() {
        this.buildFrame();
    }

    componentDidUpdate() {
        this.buildFrame();
    }


    /*         RENDER         */
    /**************************/
    render() {
    

        /*         MARKUP          */
        /***************************/
        return (
            <div>
                {/* tslint:disable-next-line:jsx-self-close jsx-no-string-ref */}
                <iframe ref="componentIframe" 
                        frameBorder="0"
                        sandbox="allow-forms allow-popups allow-scripts allow-same-origin">
                </iframe>
            </div>
        );


    }
}



/* Export */
export default connect(mapStateToProps)(IframeContainer);