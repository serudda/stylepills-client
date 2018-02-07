/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import * as classNames from 'classnames';

import { 
    Option as DetailsTabMenuOptions
} from './../../DetailsTabMenu';

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
        'sp-iconTabMenu__btn--active': currentOption === DetailsTabMenuOptions.addLibs
    });

        // Libs Icon on Btn Classes
    const libsIconClasses = classNames({
        'strokeWidth-2': true, 
        'stroke-darkSecondary': currentOption === DetailsTabMenuOptions.addLibs,
        'stroke-slate': currentOption !== DetailsTabMenuOptions.addLibs
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <Popup trigger={
            <button className={addLibsBtnClasses}>
                <div className="inner"
                    onClick={onClick}>
                    <Icon icon="list"
                        iconClass={libsIconClasses}
                        width="24" height="24"/>
                </div>
            </button>}
            size="small"
            inverted={true}>
                <span className="fontWeight-9">Add libraries</span>
        </Popup>
    );
    
};


/* Export */
export default AddLibs;