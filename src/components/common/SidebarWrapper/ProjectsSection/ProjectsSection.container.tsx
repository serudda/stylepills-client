/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';
import { matchPath } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { functionsUtil } from './../../../../core/utils/functionsUtil';
import { IRootState } from './../../../../reducer/reducer.config';

import { Basic } from './../../../../models/project/project.model';

import BaseFolder from './BaseFolder/BaseFolder';
import Icon from './../../../../app/components/Icon/Icon';

// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectsSectionProps = {
    basicProjects: Array<Basic>
};

/* Own States */
type LocalStates = {
    currentProject: {
        id: number,
        name: string
    }
};

/* Mapped State to Props */
type StateProps = {
    pathname: string
};

/* Mapped Dispatches to Props */
type DispatchProps = {
    actions: {
        router: {
            goToProjectDetail: (projectId: number) => void;
        }
    };
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectsSection
extends React.Component<ChildProps<ProjectsSectionProps & StateProps & DispatchProps, {}>, LocalStates> {


    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectsSectionProps & StateProps & DispatchProps, {}>) {
        super(props);

        // LOG
        functionsUtil.consoleLog('SidebarWrapper -> ProjectsSection actived');

        this.state = {
            currentProject: {
                id: null,
                name: null
            }
        };

        // Bind methods
        this._handleClick = this._handleClick.bind(this);
        this._handleCloseClick = this._handleCloseClick.bind(this);

    }


    /********************************/
    /*     COMPONENT_WILL_MOUNT     */
    /********************************/
    componentDidMount() {      
        const { basicProjects, pathname } = this.props;
        const DASHBOARD_PROJECT_DETAILS_URI = '/dashboard/projects/:id';

        // Get project id from current url location: e.g. {id: <number>}
        const match: any = matchPath(pathname, {
            path: DASHBOARD_PROJECT_DETAILS_URI,
            exact: false,
            strict: false
        });

        if (match && !this.state.currentProject.id) {

            const { params } = match;
            const { id } = params;

            if (id) {
                let currentProject: any = {id: params.id, name: null};

                basicProjects.forEach(project => {
                    if (project.id === currentProject.id) {
                        currentProject.name = project.name;
                    }
                });

                // Update local state in order to show Project Details
                this.setState({
                    currentProject
                });                
            }

        }

    }


    /********************************/
    /*     COMPONENT_DID_UPDATE     */
    /********************************/
    componentDidUpdate() {      
        const { pathname } = this.props;

        let isProjectFolder = pathname.indexOf('/dashboard/projects') !== -1;

        if (!isProjectFolder && this.state.currentProject.id) {
            this.setState({
                currentProject: {
                    id: null,
                    name: null
                }
            });
        }
    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle click
     * @method _handleClick
     * @example this._handleClick()
     * @private
     * @param {number} projectId - Project Id
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleClick = (project: Basic) => (e: React.FormEvent<{}>) => {
        this.setState({
            currentProject: {
                id: project.id,
                name: project.name
            }
        });

        // TODO: Implementar cuando sea posible, por ahora se continuamos usando Link. NOTE: 1
        // this.props.actions.router.goToProjectDetail(projectId);
    }


    /**
     * @desc Handle Close click
     * @method _handleCloseClick
     * @example this._handleCloseClick()
     * @private
     * @param {React.FormEvent<{}>} e - Event
     * @returns {void}
     */
    private _handleCloseClick (e: React.FormEvent<{}>) {
        this.setState({
            currentProject: {
                id: null,
                name: null
            }
        });
    }


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
                <Link className="d-flex align-content-center ml-auto"
                    to={`/dashboard/components`} 
                    onClick={this._handleCloseClick}>
                    <Icon icon="close"
                    iconClass="title__icon stroke-white strokeWidth-4"
                    width="18" height="18"/>
                </Link>
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


         /*       PROPERTIES       */
        /**************************/

        // Destructuring props
        const { basicProjects } = this.props;


        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectsSection">

                {/* Projects List */}
                {!this.state.currentProject.id &&
                    <div className="ProjectsList">
                        <div className="subtitle px-3 py-2 d-flex align-items-center">
                            <span>
                                Projects
                            </span>
                            {this._getCreateProjectBtn()}
                        </div>

                        {basicProjects.map((project: Basic) => (
                            <Link key={project.id} 
                            to={`/dashboard/projects/${project.id}`} onClick={this._handleClick(project)}
                            className="option px-3 py-1">
                                <Icon icon="chevronRight"
                                    iconClass="stroke-white strokeWidth-3 ml-2 mr-1"
                                    width="16" height="16"/>
                                <span className="fontSize-sm fontWeight-6 color-white">
                                    {project.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                 }


                {/* Project Details */}
                {this.state.currentProject.id &&
                    <div className="ProjectDetails"> {/* TODO: Remover d-none cuando se vaya a implementar */}
                        <div className="title px-3 pt-2 pb-3 d-flex align-items-center">
                            <span>
                                {this.state.currentProject.name}
                            </span>
                            {this._getCloseBtn()}
                        </div>

                        <div className="d-none"> {/* TODO: Remover este div cuando se vaya a implementar */}

                            <BaseFolder projectId={this.state.currentProject.id} />

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
                        
                    </div>
                }

            </div >
        );
    }
    
}


/********************************/
/*     MAP DISPATCH TO PROPS    */
/********************************/
// TODO: Implementar cuando sea posible, por ahora se continuamos usando Link. NOTE: 1
function mapDispatchToProps(dispatch: Dispatch<IRootState>): DispatchProps {
    return {
        actions: {
            router: {
                goToProjectDetail: (projectId) => dispatch(routerActions.push(`/dashboard/projects/${projectId}`))
            }
        }
    };
}


/********************************/
/*      MAP STATE TO PROPS      */
/********************************/
function mapStateToProps(state: IRootState): StateProps {
    const { location } = state.router;
    const { pathname } = location;
    return {
        pathname
    };
}


/********************************/
/*         REDUX CONNECT        */
/********************************/
const projectsSectionConnect = connect(mapStateToProps, mapDispatchToProps); 


/*         EXPORT          */
/***************************/
export default compose(
    projectsSectionConnect
)(ProjectsSection);


/*

(1) - Por alguna razón al lanzar la Action: dispatch(push(`/dashboard/projects/${projectId}`)), si cambia la url
pero no se dispara la Action (No se ve en Redux DevTools console). Volvi a implementar Link, dejo una referencia
que deberiamos aplicar para cambiar las rutas a través de Actions:
reference: https://blog.marvelapp.com/managing-the-url-in-a-redux-app/

*/