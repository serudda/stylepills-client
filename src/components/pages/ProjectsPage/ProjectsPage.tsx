/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ChildProps } from 'react-apollo';

import ProjectNew from './New/ProjectNew.container';
import ProjectList from './List/ProjectList.container';
import ProjectDetails from './Details/ProjectDetails.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsPageProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsPage 
extends React.Component<ChildProps<ProjectsPageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectsPageProps & StateProps, {}>) {
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
                <Route exact={true} path="/dashboard/projects/new" component={ProjectNew} />
                <Route exact={true} path="/dashboard/projects" component={ProjectList} />
                <Route exact={true} path="/dashboard/projects/:id" component={ProjectDetails} />
            </Switch>
        );
    }

}


/*         EXPORT          */
/***************************/
export default withRouter(ProjectsPage);