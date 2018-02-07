/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import {
    Switch, 
    Route, 
    withRouter, 
    RouteComponentProps 
} from 'react-router-dom';
import { ChildProps } from 'react-apollo';

import ProjectNewContainer from './New/ProjectNew.container';
import ProjectListContainer from './List/ProjectList.container';
import ProjectDetailsContainer from './Details/ProjectDetails.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsPageContainerProps = {};

type WithRouterProjectsPageProps = ProjectsPageContainerProps & RouteComponentProps<any>;

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsPageContainer
extends React.Component<ChildProps<WithRouterProjectsPageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<WithRouterProjectsPageProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <Switch>
                <Route exact={true} path="/dashboard/projects/new" component={ProjectNewContainer} />
                <Route exact={true} path="/dashboard/projects" component={ProjectListContainer} />
                <Route exact={true} path="/dashboard/projects/:id" component={ProjectDetailsContainer} />
            </Switch>
        );
    }

}


/*         EXPORT          */
/***************************/
export default withRouter(ProjectsPageContainer);