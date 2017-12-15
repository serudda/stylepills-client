/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsListSectionProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsListSection
extends React.Component<ChildProps<ProjectsListSectionProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectsListSectionProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ProjectsListSection actived');

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

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

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectsSection">
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
        );
    }
    
}


/*         EXPORT          */
/***************************/
export default ProjectsListSection;