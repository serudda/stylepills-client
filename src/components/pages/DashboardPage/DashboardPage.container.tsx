/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { ChildProps } from 'react-apollo';

import SidebarWrapper from '../../common/SidebarWrapper/SidebarWrapper.container';
import ComponentsPage from '../ComponentsPage/ComponentsPage';
import ProjectsPageContainer from './../../../app/pages/ProjectsPage/ProjectsPage.container';
import NotFoundPage from './../NotFoundPage/NotFoundPage';
import { Redirect } from 'react-router';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type DashboardPageContainerProps = {};

type WithRouterDashboardPageProps = DashboardPageContainerProps & RouteComponentProps<any>;


/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class DashboardPageContainer 
extends React.Component<ChildProps<WithRouterDashboardPageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<WithRouterDashboardPageProps & StateProps, {}>) {
        super(props);
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*         MARKUP          */
        /***************************/
        return (
            <div className="DashboardPage sp-bg-darkSnow h-100">

                {/* SidebarWrapper */}
                <SidebarWrapper>
                
                    <Switch>
                        {/* Default route: /dashboard/components */}
                        <Redirect exact={true} from="/dashboard" to="/dashboard/components" />
                        <Route path="/dashboard/projects" component={ProjectsPageContainer} />
                        <Route path="/dashboard/components" component={ComponentsPage} />
                        <Route component={NotFoundPage} />
                    </Switch>

                </SidebarWrapper>

            </div>
        );
    }

}


/*         EXPORT          */
/***************************/
export default withRouter(DashboardPageContainer);