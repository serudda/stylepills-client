/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import Button, {
    TypeOption as BtnTypeOption,
    SizeOption as BtnSizeOption
} from './../GenericBtn/GenericBtn';

import {
    CompileToTypeOptions
} from './../../../../models/preprocessor/preprocessor.model';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CompileBtnProps = {
    compileTo?: CompileToTypeOptions;
    label: string;
    onClick: (e: React.FormEvent<{}>) => any
};


/**
 * @desc Represent Compile button
 * @function CompileBtn
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */

class CompileBtn extends React.Component<CompileBtnProps, {}> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: CompileBtnProps) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { 
            compileTo = CompileToTypeOptions.css,
            label = `View ${compileTo}`,
            onClick
        } = this.props;

        
        /*         MARKUP          */
        /***************************/
        return (
            <Popup
                trigger={
                    <Button type={BtnTypeOption.neutral}
                            size={BtnSizeOption.md}
                            label={label}
                            onClick={onClick}
                            className="text-capitalize"/>}
                position="top right"
                size="small">
                    <span> Compile <strong className="text-uppercase">{compileTo}</strong></span>
            </Popup>
        );

    }
    
}


/* Export */
export default CompileBtn;