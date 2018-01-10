/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type TabMenuProps = {
    tab: string;
    onTabClick: (type: string) => any;
};


/**
 * @desc Represent Tab Menu from Source Code Panel
 * @function TabMenu
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const TabMenu: React.SFC<TabMenuProps> = ({ tab, onTabClick }) => {

    // Html Tab Btn Classes
    const htmlTabBtnClasses = classNames({
        'sp-tabMenu__button': true, 
        'sp-tabMenu__button--active': tab === 'html'
    });

    // Css Tab Btn Classes
    const cssTabBtnClasses = classNames({
        'sp-tabMenu__button': true, 
        'sp-tabMenu__button--active': tab === 'css'
    });
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="TabMenu row no-gutters w-100">
            
            <div className="col">

                <div className="sp-tabMenu sp-tabMenu--is-reversed fontSmoothing-reset">
                    <button className={htmlTabBtnClasses}
                            onClick={onTabClick('html')}>
                        <div className="inner">
                            HTML
                        </div>
                    </button>
                    <button className={cssTabBtnClasses}
                            onClick={onTabClick('css')}>
                        <div className="inner">
                            CSS
                        </div>
                    </button>
                </div>

            </div>

        </div>
    );
    
};


/* Export */
export default TabMenu;