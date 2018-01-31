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
type AddLibsProps = {
    currentOption: string;
    onClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Add Libs option from Tab Menu component
 * @function AddLibs
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const AddLibs: React.SFC<AddLibsProps> = ({ currentOption, onClick }) => {

    // Add Libs Btn Classes
    const addLibsBtnClasses = classNames({
        'sp-iconTabMenu__btn': true, 
        'sp-iconTabMenu__btn--active': currentOption === 'libs'
    });

        // Libs Icon on Btn Classes
    const libsIconClasses = classNames({
        'strokeWidth-2': true, 
        'stroke-darkSecondary': currentOption === 'libs',
        'stroke-slate': currentOption !== 'libs'
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <button className={addLibsBtnClasses}>
            <div className="inner"
                onClick={onClick}>
                <Icon icon="list"
                    iconClass={libsIconClasses}
                    width="24" height="24"/>
            </div>
        </button>
    );
    
};


/* Export */
export default AddLibs;