/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import Icon from './../../Icon/Icon';
import BaseFolder from './BaseFolder/BaseFolder';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectDetailsSectionProps = {
    projectId: number;
    projectName: string;
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectDetailsSection
extends React.Component<ChildProps<ProjectDetailsSectionProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectDetailsSectionProps & StateProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ProjectDetailsSection actived');

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

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

        // Destructuring props
        const { projectId, projectName } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectDetailsSection">
                <div className="title px-3 py-2 d-flex align-items-center">
                    <span>
                        {projectName}
                    </span>
                    {this._getCloseBtn()}
                </div>

                <BaseFolder projectId={projectId} />

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
        );
    }
    
}


/*         EXPORT          */
/***************************/
export default ProjectDetailsSection;