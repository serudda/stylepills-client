/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as classNames from 'classnames';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsSectionProps = {
    isActive: boolean
};

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
        
        // Destructuring props
        const { isActive } = this.props;

        // All Component Link Classes
        const exploreNavLinkClasses = classNames({
            'link-reset': true,
            'option': true,
            'px-3 py-1': true,
            'active': isActive
        });

        /*         MARKUP          */
        /***************************/
        return (
            <div className="ComponentsSection">
                <div className="subtitle px-3 py-2">
                    Components
                </div>
                <Link className={exploreNavLinkClasses} to="/dashboard/components">
                    <Icon icon="layer"
                        iconClass="stroke-white strokeWidth-2 ml-2 mr-3"
                        width="14" height="14"/>
                    <span className="fontSize-sm fontWeight-6 color-white">
                        All
                    </span>
                </Link>
            </div>
        );
    }
    
}


/*         EXPORT          */
/***************************/
export default ComponentsSection;