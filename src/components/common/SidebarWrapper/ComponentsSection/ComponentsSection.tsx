/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsSectionProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentsSection
extends React.Component<ChildProps<ComponentsSectionProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ComponentsSectionProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ComponentsSection actived');

    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentsSection">
                <div className="subtitle px-3 py-2">
                    Components (100)
                </div>
                <div className="option px-3 py-1">
                    <Icon icon="layer"
                        iconClass="stroke-white strokeWidth-2 ml-2 mr-3"
                        width="14" height="14"/>
                    <span className="fontSize-sm fontWeight-6 color-white">
                        All
                    </span>
                </div>
            </div>
        );
    }
    
}


/*         EXPORT          */
/***************************/
export default ComponentsSection;