/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { functionsUtil } from './../../../../core/utils/functionsUtil';

import { Basic } from './../../../../models/project/project.model';

import { GET_BASIC_PROJECTS_BY_USER_ID_QUERY, GetBasicProjectsByUserIdResponse } from './../../../../models/project/project.query';

import Icon from './../../Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsListSectionProps = {
    userId: number
};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsListSection
extends React.Component<ChildProps<ProjectsListSectionProps & StateProps, GetBasicProjectsByUserIdResponse>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectsListSectionProps & StateProps, GetBasicProjectsByUserIdResponse>) {
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
                <Link className="link-reset d-flex align-content-center ml-auto"
                      to="/dashboard/projects/new">
                    <Icon icon="plus"
                          iconClass="title__icon stroke-white strokeWidth-4"
                          width="18" height="18"/>
                </Link>
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

        /*       PROPERTIES       */
        /**************************/
        const {...data} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (
                <div className="ProjectsSection">
                <div className="subtitle px-3 py-2 d-flex align-items-center">
                    <span>
                        Loading...
                    </span>
                </div>
            </div>
            );
        }

        if (data.error) {
            return (<p>{data.error.message}</p>);
        }


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectsSection">
                <div className="subtitle px-3 py-2 d-flex align-items-center">
                    <span>
                        Projects
                    </span>
                    {this._getCreateProjectBtn()}
                </div>

                {/* Create Projects List */}
                {data.basicProjectsByUserId.map((basicProject: Basic) => (
                    <div key={basicProject.id} className="option px-3 py-1">
                        <Icon icon="chevronRight"
                            iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                            width="16" height="16"/>
                        <span className="fontSize-sm fontWeight-6 color-white">
                            {basicProject.name}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    
}


// Query options
const config = {
    options: (ownProps: ProjectsListSectionProps & StateProps) => {
        return { 
            variables: 
            { 
                userId: ownProps.userId
            } 
        };
    }
};

// Query
const getBasicProjectsByUserIdQuery = graphql<GetBasicProjectsByUserIdResponse, ProjectsListSectionProps>(
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, config
);


/*         EXPORT          */
/***************************/
export default compose(
    getBasicProjectsByUserIdQuery
)(ProjectsListSection);