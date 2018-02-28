/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import { CodeSupportedOption } from './../../../../core/interfaces/interfaces';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

// export type Option = CodeSupported;

/* Own Props */
type CodeTabMenuProps = {
    options: Array<CodeSupportedOption>;
    tab: string;
    isReversed: boolean;
    onTabClick: (type: CodeSupportedOption) => any;
};


/**
 * @desc Represent Code Tab Menu
 * @function CodeTabMenu
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const CodeTabMenu: React.SFC<CodeTabMenuProps> = ({ ...props }) => {

    // Code Tab Menu Classes
    const codeTabMenuClasses = classNames({
        'CodeTabMenu': true,
        'row': true,
        'no-gutters': true,
        'w-100': true,
        'CodeTabMenu--is-reversed': props.isReversed
    });

    // Tab Menu Classes
    const tabMenuClasses = classNames({
        'sp-tabMenu': true,
        'fontSmoothing-reset': true,
        'sp-tabMenu--is-reversed': props.isReversed
    });

    // Tab Btn Classes
    const btnClasses = (type: string) => {
        return classNames({
            'sp-tabMenu__button': true, 
            'sp-tabMenu__button--active': props.tab === CodeSupportedOption[type]
        });    
    };
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className={codeTabMenuClasses}>
            
            <div className="col">

                <div className={tabMenuClasses}>
                    {/* Build tab menu base on user options */}
                    {props.options.map((option: string, index: number) => (
                        <button key={index}
                                className={btnClasses(option)}
                                onClick={props.onTabClick(CodeSupportedOption[option])}>
                            <div className="inner">
                                {CodeSupportedOption[option]}
                            </div>
                        </button>
                    ))}
                </div>

            </div>

        </div>
    );
    
};


/* Export */
export default CodeTabMenu;