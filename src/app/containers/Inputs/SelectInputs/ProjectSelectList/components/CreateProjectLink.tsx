/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Icon from './../../../../../components/Icon/Icon';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type CreateProjectLinkProps = {};


/**
 * @desc Represent Create Project Link
 * @function CreateProjectLink
 * @type STATELESS FUNCTIONAL COMPONENT (SFC)
 * @returns component view
 */
const CreateProjectLink: React.SFC<CreateProjectLinkProps> = () => {
    

    /*         MARKUP          */
    /***************************/
    return (
        <div className="d-flex align-items-center align-content-center align-self-stretch h-100">
            <span className="fontSize-md color-silver">
                You don't have a project yet
            </span>
            <Popup
                trigger={
                    <Link className="d-flex sp-btn sp-btn--sm sp-btn--secondary ml-auto p-1"
                            to="/dashboard/projects/new">
                        <Icon icon="plus"
                            iconClass="stroke-white strokeWidth-3"
                            width="20" height="20"/>
                    </Link>
                }
                position="top center"
                size="tiny"
                inverted={true}>
                Create a project
            </Popup>
        </div>
    );
    
};


/* Export */
export default CreateProjectLink;