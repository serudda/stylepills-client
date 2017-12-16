/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ChildProps } from 'react-apollo';

import ComponentNew from './new/ComponentNew.container';
import ComponentList from './list/ComponentList.container';
import ComponentDetails from './details/ComponentDetails.container';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ComponentsPageProps = {};

/* Own States */
type LocalStates = {};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ComponentsPage 
extends React.Component<ChildProps<ComponentsPageProps & StateProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ComponentsPageProps & StateProps, {}>) {
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
                <Route exact={true} path="/dashboard/components/new" component={ComponentNew} />
                <Route exact={true} path="/dashboard/components" component={ComponentList} />
                <Route exact={true} path="/dashboard/components/:id" component={ComponentDetails} />
            </Switch>
        );
    }

}


/*         EXPORT          */
/***************************/
export default withRouter(ComponentsPage);