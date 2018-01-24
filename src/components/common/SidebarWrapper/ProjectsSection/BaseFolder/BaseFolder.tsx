/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Accordion } from 'semantic-ui-react';
import * as classNames from 'classnames';

import { functionsUtil } from '../../../../../core/utils/functionsUtil';

import Icon from './../../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type BaseFolderProps = {
    projectId: number
};

/* Own States */
type LocalStates = {
    activeIndex: number
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class BaseFolder
extends React.Component<ChildProps<BaseFolderProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<BaseFolderProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ProjectDetailsSection -> BaseFolder actived');

        // Init state
        this.state = {
            activeIndex: null
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle click
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleClick (e: any, titleProps: any) {
       const { index } = titleProps;
       const { activeIndex } = this.state;
       const newIndex = activeIndex === index ? -1 : index;
       
       // Update active option
       this.setState({
           activeIndex: newIndex
       });
        
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props & state
        const { projectId } = this.props;
        const { activeIndex } = this.state;

        // Accordion Title Icon Classes
        const titleIconClasses = classNames({
            'chevronRight': activeIndex !== 0,
            'chevronDown': activeIndex === 0
        });


        /*         MARKUP          */
        /***************************/
        return (
            <Accordion className="BaseFolder" fluid={true}>
                
                <Accordion.Title className="p-0 px-3" active={activeIndex === 0} index={0} onClick={this._handleClick}>
                    <Icon icon={titleIconClasses}
                        iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                        width="16" height="16"/>
                    <span className="fontSize-sm fontWeight-6 color-white">
                        base
                    </span>
                </Accordion.Title>

                <Accordion.Content className="p-0" active={activeIndex === 0}>
                    <Link className="option px-3 py-1"
                        to={`/dashboard/projects/${projectId}/base/color-palette`}>
                        <Icon icon="color"
                            iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-6 color-white">
                            color palette
                        </span>
                    </Link>
                    <div className="option px-3 py-1 option--disabled">
                        <Icon icon="font"
                            iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-6 color-white">
                            fonts
                            <span className="color-secondary ml-2">soon!</span>
                        </span>
                    </div>
                    <div className="option px-3 py-1 option--disabled">
                        <Icon icon="image"
                            iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                            width="14" height="14"/>
                        <span className="fontSize-sm fontWeight-6 color-white">
                            logo
                            <span className="color-secondary ml-2">soon!</span>
                        </span>
                    </div>
                </Accordion.Content>

            </Accordion>
        );
    }  
    
}


/*         EXPORT          */
/***************************/
export default BaseFolder;