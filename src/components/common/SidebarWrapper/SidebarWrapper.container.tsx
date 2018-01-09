/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Location } from 'history';

import { IRootState } from '../../../reducer/reducer.config';
import { functionsUtil } from '../../../core/utils/functionsUtil';

import { User as UserModel } from './../../../models/user/user.model';

import Icon from '../Icon/Icon';
import ComponentsSection from './ComponentsSection/ComponentsSection';
import ProjectsListSection from './ProjectsListSection/ProjectsListSection.container';
import ProjectDetailsSection from './ProjectDetailsSection/ProjectDetailsSection';


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
type StateProps = {
    location: Location,
    user: UserModel
};


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

    
    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        // Destructuring props
        const { location, user } = this.props;
         
        
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
                        <ComponentsSection isActive={location.pathname === '/dashboard/components'}/>

                        <div className="divider m-3 mt-4" />

                        {/* Projects List Section */}
                        <ProjectsListSection userId={user.id}/>

                        {/* Project Details Section */}
                        <ProjectDetailsSection />

                    </div>

                    {/* Sidebar Footer */}
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
export default compose(
    sidebarWrapperConnect
)(SidebarWrapper);