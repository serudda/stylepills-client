/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';

import { 
    GET_BASIC_PROJECTS_BY_USER_ID_QUERY, 
    GetBasicProjectsByUserIdResponse  
} from './../../../../../../models/project/project.query';

import SelectList from './../../../../../components/Inputs/GenericSelectInput/GenericSelectInput';
import CreateProjectLink from './../components/CreateProjectLink';


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
        

        /* Show 'Create Project' if user doesn't have projects yet */
        if (data.projectsByUserId.length === 0) {
            return (
              <CreateProjectLink />  
            );
        }
            
        
        /*         MARKUP          */
        /***************************/
        return (
            <SelectList value={this.state.value}
                        name="projectId"
                        isBlock={true}
                        defaultOption="Don't associate with a project"
                        options={data.projectsByUserId ? data.projectsByUserId : null}
                        loading={data.loading}
                        error={data.error}
                        onChange={this._handleChange}/>
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