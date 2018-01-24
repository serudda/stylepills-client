/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Location } from 'history';

import { IRootState } from '../../../reducer/reducer.config';
import { functionsUtil } from '../../../core/utils/functionsUtil';

import { User as UserModel } from './../../../models/user/user.model';

import { GET_BASIC_PROJECTS_BY_USER_ID_QUERY, GetBasicProjectsByUserIdResponse } from './../../../models/project/project.query';

import Icon from '../Icon/Icon';
import ComponentsSection from './ComponentsSection/ComponentsSection';
import ProjectsSection from './ProjectsSection/ProjectsSection.container';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type SidebarWrapperProps = {
    match: {
        params: {
            id: number
        }
    }
};

/* Own States */
type LocalStates = {
    visible: boolean
};

/* Mapped State to Props */
type StateProps = {
    location: Location,
    user: UserModel
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class SidebarWrapper
extends React.Component<ChildProps<SidebarWrapperProps & StateProps, GetBasicProjectsByUserIdResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<SidebarWrapperProps & StateProps, GetBasicProjectsByUserIdResponse>) {
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

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {


        /*       PROPERTIES       */
        /**************************/

        // Destructuring props
        const { location } = this.props;
        const {...data} = this.props.data;


        /*       VALIDATIONS       */
        /***************************/
        if (data.loading) {
            return (
                // TODO: El loading deberia ser como el de Slack (los rectangulos y cuadritos)
                <div className="SidebarWrapper">
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
                            <span className="sp-tag sp-tag--primary sp-tag--xxs fontSmoothing-reset ml-2">
                                Alpha
                            </span>
                        </a>
                    </div>

                    <div className="divider m-3" />

                    {/* Sidebar Content */}
                    <div className="Sidebar__content">

                        {/* Components Section */}
                        <ComponentsSection isActive={location.pathname === '/dashboard/components'} />

                        <div className="divider m-3 mt-4" />
                        
                        {/* Projects List Section */}
                        <ProjectsSection basicProjects={data.basicProjectsByUserId} />

                    </div>

                    {/* Sidebar Footer TODO: Cuando el scroll esta down, y presiono este boton, no hace el scrollTop */}
                    <div className="Sidebar__footer">
                        <Link className="Sidebar__footer__btn link-reset d-flex align-items-center sp-bg-black p-4"
                            to="/dashboard/components/new">
                            <Icon icon="plus"
                                iconClass="stroke-white strokeWidth-5"
                                width="20" height="20"/>
                            <span className="fontSize-md fontWeight-6 ml-2">
                                New component
                            </span>
                        </Link>
                    </div>

                </div>
                <div className="MainContainer">
                    {this.props.children}
                </div>
            </div>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/

// Query options
const config = {
    options: (ownProps: SidebarWrapperProps & StateProps) => {
        return { 
            variables: 
            { 
                userId: ownProps.user.id
            } 
        };
    }
};

// Query
const getBasicProjectsByUserIdQuery = graphql<GetBasicProjectsByUserIdResponse, SidebarWrapperProps>(
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, config
);



/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { location } = state.router;
    const { user } = state.auth;
    return {
        location,
        user
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const sidebarWrapperConnect = connect(mapStateToProps); 


/*         EXPORT          */
/***************************/
export default compose<any>(
    sidebarWrapperConnect,
    getBasicProjectsByUserIdQuery
)(SidebarWrapper);