/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import { Basic as BasicColorModel } from './../../../models/color/color.model';

import SmallColorPickerContainer from './../../containers/ColorPicker/SmallColorPicker/SmallColorPicker.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/


/* Own Props */
type PreviewBoxProps = {
    height: string,
    isEmptyPreview?: boolean,
    defaultHexColor?: string, 
    onColorChange: (color: BasicColorModel) => void;
};


/**
 * @desc Represent Preview Box
 * @function PreviewBox
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class PreviewBox extends React.Component<PreviewBoxProps, {}> {

    /********************************/
    /*         STATIC PROPS         */
    /********************************/
    private _DEFAULT_COLOR_HEX: string = '#F9FAFC';
    private _DEFAULT_COLORS_LIST: Array<string> = [
        '#273444', 
        '#3C4858', 
        '#8492A6', 
        '#E0E6ED', 
        '#EFF2F7',
        '#976B55',
        '#7BDCB5', 
        '#0693E3', 
        '#FFF78A', 
        '#EC7D7D'
    ];
    

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
            defaultHexColor = this._DEFAULT_COLOR_HEX,
            onColorChange
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
                                <SmallColorPickerContainer onChange={onColorChange} 
                                                            defaultHexColor={defaultHexColor}
                                                            defaultColors={this._DEFAULT_COLORS_LIST}/>
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