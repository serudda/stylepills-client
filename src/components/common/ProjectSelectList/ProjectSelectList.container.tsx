/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { GET_BASIC_PROJECTS_BY_USER_ID_QUERY, GetBasicProjectsByUserIdResponse  } from './../../../models/project/project.query';

import Icon from './../../../app/components/Icon/Icon';
import SelectList from './../../../app/components/Inputs/GenericSelectInput/GenericSelectInput';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

/* Own Props */
type ProjectSelectListProps = {
    userId: number,
    onChange: (name: string, value: string) => void
};

/* Own States */
type LocalStates = {
    value: string
};

/* Mapped State to Props */
type StateProps = {};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class ProjectSelectListContainer 
extends React.Component<ChildProps<ProjectSelectListProps & StateProps, GetBasicProjectsByUserIdResponse>, LocalStates> {
    
    
    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor(props: ChildProps<ProjectSelectListProps & StateProps, GetBasicProjectsByUserIdResponse>) {
        super(props);

        // Init state
        this.state = {
            value: ''
        };

        // Bind methods
        this._handleChange = this._handleChange.bind(this);

    }


    /********************************/
    /*       PRIVATE METHODS        */
    /********************************/

    /**
     * @desc Handle Select List Change
     * @method _handleChange
     * @example this._handleChange()
     * @private 
     * @param {AtomModel} atom - atom data
     * @param {any} e - Event
     * @returns {void}
     */
    private _handleChange (e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        // VARIABLES
        let value = e.target.value;
        let name = e.target.name;

        // Update the state
        this.setState((previousState) => {
            return { ...previousState, value };
        }, () => {
            this.props.onChange(name, value);
        });

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
                <div className="ProjectSelectList">
                    <div className="sp-select-container d-flex flex-row">
                        <select className="sp-select sp-select--md sp-select--input w-100"
                                name="projectId">
                            <option value="0" disabled={true}>Loading</option>
                        </select>
                        <Icon icon="chevronDown"
                            iconClass="icon stroke-secondary strokeWidth-3 ml-1"
                            width="15" height="15"/>
                    </div>
                </div>
            );
        }

        /* TODO: Esta validacion esta muy ligada a Dashboard, asi que este componente no lo podria usar fuera de 
            Dashboard. Refactorizar para hacerlo más global */
        if (data.basicProjectsByUserId.length === 0) {
            return (
                <div className="ProjectSelectList d-flex align-items-center align-content-center align-self-stretch h-100">

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
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <div className="ProjectSelectList">
                <SelectList value={this.state.value}
                            name="projectId"
                            isBlock={true}
                            defaultOption="Don't associate with a project"
                            options={data.basicProjectsByUserId}
                            onChange={this._handleChange}/>
            </div>
        );

    }

}


/********************************/
/*            QUERY             */
/********************************/

// Query options
const config = {
    options: (ownProps: ProjectSelectListProps & StateProps) => {
        return { 
            variables: 
            { 
                userId: ownProps.userId
            } 
        };
    }
};

// Query
const getBasicProjectsByUserIdQuery = graphql<GetBasicProjectsByUserIdResponse, ProjectSelectListProps>(
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, config
);



/*         EXPORT          */
/***************************/
export default compose(
    getBasicProjectsByUserIdQuery
)(ProjectSelectListContainer);