/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import SmallColorPickerContainer from './../../containers/ColorPicker/SmallColorPicker/SmallColorPicker.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/


/* Own Props */
type PreviewBoxProps = {
    height: string,
    isEmptyPreview?: boolean
};


/**
 * @desc Represent Preview Box
 * @function PreviewBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class PreviewBox extends React.Component<PreviewBoxProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: PreviewBoxProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            height = '25',
            isEmptyPreview = false,
        } = this.props;



        /*         MARKUP          */
        /***************************/
        return (
            <div className="PreviewSection sp-bg-white border-6 borderColor-white">

                {/* Float color picker */}
                <div className="float-color-picker">
                    <Popup
                        trigger={
                            <div>
                                <SmallColorPickerContainer />
                            </div>
                        }
                        position="top left"
                        size="tiny"
                        inverted={true}>
                            Contextual background
                    </Popup>
                </div>
                
                <div className="PreviewBox__content borderRadius-xs"
                    style={{paddingTop: `${height}%`}}>

                    {isEmptyPreview && 
                        <div className="PreviewBox__content__message d-flex align-items-center justify-content-center fontSize-xxl color-darkSmoke fontWeight-7">
                            <span>
                                Component preview
                            </span>
                        </div>
                    }

                    <div className="Iframe-wrapper">
                        {this.props.children}
                    </div>
                </div>

            </div>
        );
    }
    
}


/* Export */
export default PreviewBox;