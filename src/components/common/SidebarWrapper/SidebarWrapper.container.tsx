/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import { functionsUtil } from '../../../core/utils/functionsUtil';

import Icon from '../Icon/Icon';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SidebarWrapperProps = {};

/* Own States */
type LocalStates = {
    visible: boolean
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SidebarWrapper
extends React.Component<ChildProps<SidebarWrapperProps & StateProps, {}>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SidebarWrapperProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper container actived');

        // Init state
        this.state = {
            visible: true
        };

        // Bind methods
        this._handleToggleClick = this._handleToggleClick.bind(this);
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Toggle click
     * @method _handleToggleClick
     * @example this._handleToggleClick()
     * @private
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleToggleClick(e: any) {
        // Update the state
        this._toggleVisibility();
    }


    /**
     * @desc Toggle visibility
     * @method _toggleVisibility
     * @example this._toggleVisibility()
     * @private
     * @returns {void}
     */
    private _toggleVisibility() {
        // Update the state
        this.setState({ 
            visible: !this.state.visible
        });
    }


    /**
     * @desc Get Create Project Btn
     * @method _getCreateProjectBtn
     * @example this._getCreateProjectBtn()
     * @private
     * @returns {JSX.Element} <Popup />
     */
    private _getCreateProjectBtn(): JSX.Element {
        return (
            <Popup
            trigger={
                <span className="d-flex align-content-center ml-auto">
                    <Icon icon="plus"
                    iconClass="title__icon stroke-white strokeWidth-4"
                    width="18" height="18"/>
                </span>
            }
            position="top center"
            size="tiny"
            inverted={true}>
                Create a project
            </Popup>
        );
    }


    /**
     * @desc Get Close Btn
     * @method _getCloseBtn
     * @example this._getCloseBtn()
     * @private
     * @returns {JSX.Element} <Popup />
     */
    private _getCloseBtn(): JSX.Element {
        return (
            <Popup
            trigger={
                <span className="d-flex align-content-center ml-auto">
                    <Icon icon="close"
                    iconClass="title__icon stroke-white strokeWidth-4"
                    width="18" height="18"/>
                </span>
            }
            position="top center"
            size="tiny"
            inverted={true}>
                Close project
            </Popup>
        );
    }

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="SidebarWrapper">
                <div className="Sidebar">

                    {/* Sidebar Header */}
                    <div className="Sidebar__header px-3 mt-3">
                        {/* Logo */}
                        <a className="sp-logo sp-logo--sm sp-logo--white m-0 link-reset" href="/">
                            <Icon icon="logo" 
                                iconClass="mr-2"
                                width="20" height="20"/>
                            <span>Stylepill</span>
                        </a>
                    </div>

                    <div className="divider m-3" />

                    {/* Sidebar Content */}
                    <div className="Sidebar__content">

                        {/* Components Section */}
                        <div className="ComponentsSection d-none">
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

                        <div className="divider m-3 mt-4 d-none" />

                        {/* Projects Section */}
                        <div className="ProjectsSection d-none">
                            <div className="subtitle px-3 py-2 d-flex align-items-center">
                                <span>
                                    Projects (3)
                                </span>
                                {this._getCreateProjectBtn()}
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    Stylepill
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    Waysily
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    Steroidesign
                                </span>
                            </div>
                        </div>

                        {/* Project Details Section */}
                        <div className="ProjectDetailsSection">
                            <div className="title px-3 py-2 d-flex align-items-center">
                                <span>
                                    Stylepill
                                </span>
                                {this._getCloseBtn()}
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronDown"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    base
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="color"
                                    iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                                    width="14" height="14"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    color palette
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="font"
                                    iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                                    width="14" height="14"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    fonts
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="image"
                                    iconClass="stroke-white strokeWidth-2 ml-4 mr-2"
                                    width="14" height="14"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    logo
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    components
                                </span>
                            </div>
                            <div className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    organisms
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Footer */}
                    <div className="Sidebar__footer">
                        <div className="Sidebar__footer__btn d-flex align-items-center sp-bg-black p-4">
                            <Icon icon="plus"
                                    iconClass="stroke-white strokeWidth-5"
                                    width="20" height="20"/>
                            <span className="fontSize-md fontWeight-6 ml-2">
                                New component
                            </span>
                        </div>
                    </div>

                </div>
                <div className="MainContainer">
                    {this.props.children}
                </div>
            </div>
        );

    }

}


/*         EXPORT          */
/***************************/
export default SidebarWrapper;