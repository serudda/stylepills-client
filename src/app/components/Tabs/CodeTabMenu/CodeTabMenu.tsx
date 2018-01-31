/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

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
type CodeTabMenuProps = {
    options: Array<Option>;
    tab: string;
    isReversed: boolean;
    onTabClick: (type: Option) => any;
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
            'sp-tabMenu__button--active': props.tab === Option[type]
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
                                onClick={props.onTabClick(Option[option])}>
                            <div className="inner">
                                {Option[option]}
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