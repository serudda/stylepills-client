/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import Button, {
    TypeOption as BtnTypeOption,
    SizeOption as BtnSizeOption
} from './../GenericBtn/GenericBtn';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Possible options */
export enum Option {
    html = 'html',
    css = 'css',
    js = 'js'
}

/* Own Props */
type CompileBtnProps = {
    type?: Option;
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
            type = Option.css,
            label = `View ${type}`,
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
                    <span> Compile <strong className="text-uppercase">{type}</strong></span>
            </Popup>
        );

    }
    
}


/* Export */
export default CompileBtn;