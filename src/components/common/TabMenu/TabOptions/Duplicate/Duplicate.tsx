/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';

import * as classNames from 'classnames';

import Icon from './../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type DuplicateProps = {
    type: string;
    isDuplicated: boolean;
    onDuplicateClick: (e: React.FormEvent<{}>) => any;
};


/**
 * @desc Represent Duplicate option from Tab Menu component
 * @function Duplicate
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const Duplicate: React.SFC<DuplicateProps> = ({ type, isDuplicated, onDuplicateClick }) => {

    // Duplicate Btn Classes
    const duplicateClasses = classNames({
        'sp-iconTabMenu__btn': true,
        'sp-iconTabMenu__btn--inner-btn': true,
        'sp-iconTabMenu__btn--disabled': isDuplicated
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <Popup trigger={
            <button className={duplicateClasses}
            onClick={onDuplicateClick}>
                <div className="inner">
                    <div className="inner__btn sp-btn sp-btn--md sp-btn--secondary">
                        <Icon icon="duplicate"
                            iconClass="strokeWidth-2 stroke-white"
                            width="22" height="22"/>
                    </div>
                </div>
            </button>}
            size="small"
            inverted={true}>
            {isDuplicated ?
                <span className="color-primary fontWeight-9">DUPLICATED!</span> :
                <span className="fontWeight-9">Duplicate {type}</span> }
        </Popup>
    );
    
};


/* Export */
export default Duplicate;