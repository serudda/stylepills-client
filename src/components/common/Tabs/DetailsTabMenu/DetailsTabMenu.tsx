/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';

import * as classNames from 'classnames';

import Duplicate from './TabOptions/Duplicate/Duplicate';
import ShowCode from './TabOptions/ShowCode/ShowCode';
import ShowComments from './TabOptions/ShowComments/ShowComments';
import Like from './TabOptions/Like/Like';
import Download from './TabOptions/Download/Download';
import Share from './TabOptions/Share/Share';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type DetailsTabMenuProps = {
    options: Array<Options>;
    currentOption?: string;
    isReversed: boolean;
    isDuplicated?: boolean;
    onDuplicateClick?: (e: React.FormEvent<{}>) => any;
    onShowCodeClick?: (e: React.FormEvent<{}>) => any;
    onShowCommentsClick?: (e: React.FormEvent<{}>) => any;
    onLikeClick?: (e: React.FormEvent<{}>) => any;
    onDownloadClick?: (e: React.FormEvent<{}>) => any;
    onShareClick?: (e: React.FormEvent<{}>) => any;
};

/* Details Tab Menu Options */
interface DetailsTabMenuOptions {
    duplicate: () => JSX.Element;
    showCode: () => JSX.Element;
    showComments: () => JSX.Element;
    like: () => JSX.Element;
    download: () => JSX.Element;
    share: () => JSX.Element;
}

/* Possible options */
export enum Options {
    duplicate = 'duplicate',
    showCode = 'showCode',
    showComments = 'showComments',
    like = 'like',
    download = 'download',
    share = 'share'
}


/**
 * @desc Represent Tab Menu for detailing Entity's properties (Duplicate, Show Code, Show Comments)
 * @function DetailsTabMenu
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const DetailsTabMenu: React.SFC<DetailsTabMenuProps> = ({ ...props }) => {

    // Tab Menu Classes
    const tabMenuClasses = classNames({
        'TabMenu': true, 
        'sp-iconTabMenu': true, 
        'fontSmoothing-reset': true,
        'sp-iconTabMenu--is-reversed': props.isReversed
    });

    // Tab Menu Options
    const tabMenuOptions: DetailsTabMenuOptions = {
        duplicate: () => {
            return (
                <Duplicate type="component"
                            isDuplicated={props.isDuplicated} 
                            onClick={props.onDuplicateClick}/>
            );
        },
        showCode: () => {
            return (
                <ShowCode currentOption={props.currentOption} 
                            onClick={props.onShowCodeClick}/>
            );
        },
        showComments: () => {
            return (
                <ShowComments currentOption={props.currentOption} 
                                onClick={props.onShowCommentsClick}/>
            );
        },
        like: () => {
            return (
                <Like onClick={props.onLikeClick}/>
            );
        },
        download: () => {
            return (
                <Download onClick={props.onDownloadClick}/>
            );
        },
        share: () => {
            return (
                <Share onClick={props.onShareClick}/>
            );
        }
    };
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className={tabMenuClasses}>
            {/* Atom Box */}
            {props.options.map((option: string, index: number) => (
                <div key={index}>
                    {tabMenuOptions[option]()}
                </div>
            ))}
        </div>
    );
    
};


/* Export */
export default DetailsTabMenu;