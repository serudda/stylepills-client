/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import Icon from './../../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ShowCodeProps = {
    currentOption: string;
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Show Code option from Tab Menu component
 * @function ShowCode
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const ShowCode: React.SFC<ShowCodeProps> = ({ currentOption, onClick }) => {

    // Code Btn Classes
    const codeBtnClasses = classNames({
        'sp-iconTabMenu__btn': true, 
        'sp-iconTabMenu__btn--active': currentOption === 'code'
    });

    // Code Icon on Btn Classes
    const codeIconClasses = classNames({
        'strokeWidth-2': true, 
        'stroke-darkPrimary': currentOption === 'code',
        'stroke-slate': currentOption !== 'code'
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <button className={codeBtnClasses}
                onClick={onClick}>
            <div className="inner">
                <Icon icon="code"
                    iconClass={codeIconClasses}
                    width="25" height="16"/>
            </div>
        </button>
    );
    
};


/* Export */
export default ShowCode;